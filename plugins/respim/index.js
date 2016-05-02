var util = require("util");
var Path = require("path");
var fs = require("fs");
var gm = require("gm");
var sizeOf = require("image-size");
var RuleSet = require("./rule-set");
var Tree = require("./tree");


module.exports = function(env, callback) {

  var rules = new RuleSet(env.config.respim.rules);


  var RenamedImage = function(rule, original) {
    env.ContentPlugin.call(this);

    this.rule = rule;
    this.original = original;
    this.filepath = original.filepath;
  }

  util.inherits(RenamedImage, env.ContentPlugin);

  RenamedImage.prototype.getFilename = function() {
    return Path.join(Path.dirname(this.filepath.relative), this.getDest());
  }

  RenamedImage.prototype.getView = function() {
    return function(env, locals, contents, templates, cb) {
      cb(null, fs.createReadStream(this.filepath.full));
    }
  }

  RenamedImage.prototype.getVirtName = function() {
    return this.rule.getVirtRename(this.filepath.relative);
  }

  RenamedImage.prototype.getDest = function() {
    return this.rule.getRename(this.filepath.relative);
  }

  RenamedImage.prototype.setSize = function(original) {
    this.displaySize = original;
    this.size = original;
  }




  var ResizedImage = function(rule, original) {
    env.ContentPlugin.call(this);

    this.rule = rule;
    this.original = original;
    this.filepath = original.filepath;
  }

  util.inherits(ResizedImage, env.ContentPlugin);

  ResizedImage.prototype.getFilename = function() {
    return Path.join(Path.dirname(this.filepath.relative), this.getDest());
  }

  ResizedImage.prototype.getView = function() {
    return function(env, locals, contents, templates, cb) {
      var stream = gm(this.filepath.full).resizeExact(this.size.width, this.size.height).stream();
      cb(null, stream);
    }
  }

  ResizedImage.prototype.getVirtName = function() {
    return this.rule.getVirtDest(this.filepath.relative);
  }

  ResizedImage.prototype.getDest = function() {
    return this.rule.getDest(this.filepath.relative);
  }

  ResizedImage.prototype.setSize = function(original) {
    this.displaySize = original;
    this.size = this.rule.getSize(original);
  }




  var OriginalImage = function(filepath) {
    env.ContentPlugin.call(this);

    this.filepath = filepath;
    this.rules = rules.findMatches(this.filepath.relative);
    this.__genVirt();
  }

  util.inherits(OriginalImage, env.ContentPlugin);

  OriginalImage.prototype.isOriginalImage = true;

  OriginalImage.prototype.getFilename = function() {
    return this.filepath.relative;
  }

  OriginalImage.prototype.getView = function() {
    var self = this;
    return function(env, locals, contents, templates, cb) {
      if(env.config.respim.hideOriginal) {
        return cb(null, null);
      }
      else {
        return cb(null, fs.createReadStream(self.filepath.full));
      }
    }
  }

  OriginalImage.prototype.__genVirt = function() {
    var original = this;

    this.renamed = this.rules.filter(function(rule) {
      return !!rule.rename;
    }).map(function(rule) {
      return new RenamedImage(rule, original);
    });

    this.resized = this.rules.map(function(rule) {
      return new ResizedImage(rule, original);
    });
  }

  OriginalImage.prototype.calculateSizes = function(cb) {
    var self = this;
    sizeOf(this.filepath.full, function(err, dimensions) {
      if(err) {
        return cb(err, null);
      }

      self.size = dimensions;
      self.displaySize = dimensions;
      self.renamed.forEach(function(renamed) {
        renamed.setSize(dimensions);
      });
      self.resized.forEach(function(resized) {
        resized.setSize(dimensions);
      });

      cb(null, self);
    });
  }

  OriginalImage.fromFile = function(filepath, cb) {
    new OriginalImage(filepath).calculateSizes(cb);
  }


  var generator = function(contentTree, cb) {
    var contents = env.ContentTree.flatten(contentTree);
    var tree = new Tree();

    contents.forEach(function(image) {
      if(image.isOriginalImage) {
        image.renamed.forEach(function(renamed) {
          tree.set(renamed.getVirtName(), renamed);
        });
        image.resized.forEach(function(resized) {
          tree.set(resized.getVirtName(), resized);
        });
      }
    });

    cb(null, tree.tree);
  }


  env.registerContentPlugin("images", rules.glob, OriginalImage);
  env.registerGenerator("images", generator);


  callback();
}
