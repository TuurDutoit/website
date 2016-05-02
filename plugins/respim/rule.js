var Path = require("path");
var minimatch = require("minimatch");
var SizeSet = require("./size-set");

var parse = function(path) {
  var parsed = Path.parse(path);
  parsed.type = parsed.ext.slice(1);
  return parsed;
}

var dest = function(pattern, path) {
  var parsed = parse(path);
  return pattern.replace("%n", parsed.name).replace("%e", parsed.ext).replace("%t", parsed.type);
}


var Rule = function(rule, altName) {
  this.glob = typeof rule.src === "object" ? (rule.src.length === 1 ? rule.src[0] : "{"+rule.src.join(",")+"}") : rule.src;
  this.dest = rule.dest;
  this.rename = rule.rename;
  this.size = new SizeSet(rule);
  this.sizeMode = rule.sizeMode || "contain";
  this.name = rule.name || altName;
}

Rule.prototype.match = function(path) {
  return minimatch(path, this.glob);
}

Rule.prototype.getSize = function(original) {
  return this.size.get(original);
}

Rule.prototype.getDest = function(path) {
  return dest(this.dest, path);
}

Rule.prototype.getRename = function(path) {
  return dest(this.rename, path);
}

Rule.prototype.getVirtRename = function(path) {
  return path + ".image-renamed-" + this.name;
}

Rule.prototype.getVirtDest = function(path) {
  return path + ".image-resized-" + this.name;
}


module.exports = Rule;
