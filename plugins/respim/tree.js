var os = require("os");
var Path = require("path");

var splitPath = function(path) {
  return path.split(Path.sep);
}

var Tree = function(tree) {
  this.tree = tree || {};
}

Tree.prototype._set = function(dirs, val) {
  var curr = this.tree;

  for(var i = 0, len = dirs.length - 1; i < len; i++) {
    var dir = dirs[i];
    if(!curr[dir]) {
      curr[dir] = {};
    }

    curr = curr[dir];
  }

  curr[dirs[i]] = val;

  return this;
}

Tree.prototype.get = function(dirs) {
  var curr = this.tree;

  for(var i = 0, len = dirs.length - 1; i < len; i++) {
    var dir = dirs[i];
    if(!curr[dir]) {
      return;
    }

    curr = curr[dir];
  }

  return curr[dirs[i]];
}

Tree.prototype.set = function(path, val) {
  var dirs = splitPath(path);
  this._set(dirs, val);
  return this;
}

Tree.prototype.get = function(path) {
  var dirs = splitPath(path);
  return this._get(dirs);
}



module.exports = Tree;
