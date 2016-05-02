var Size = require("./size");

var SizeSet = function(obj) {
  if(obj.size) {
    this.width = this.height = new Size(obj.size);
  }
  else {
    this.width = new Size(obj.width);
    this.height = new Size(obj.height);
  }

  this.sizeMode = obj.sizeMode || "contain";
  this.relative = this.width.relative && this.height.relative;
  this.absolute = this.width.absolute && this.height.absolute;
  this.mode = this.relative ? "relative" : this.absolute ? "absolute" : "mixed";
  this.defined = (this.width.defined ? 1 : 0) + (this.height.defined ? 1 : 0);
  this.definedSize = this.defined === 1 && this.width.defined ? "width" : "height";
  this.undefinedSize = this.definedSize === "width" ? "height" : "width";
}

SizeSet.REL = "relative";
SizeSet.ABS = "absolute";
SizeSet.MIX = "mixed";


SizeSet.prototype.get = function(original) {
  switch(this.defined) {
    case 2:
      if(this.sizeMode === "exact") {
        return {
          width: this.width.get(original.width),
          height: this.height.get(original.height)
        };
      }
      else {
        var rw = this.width.ratio(original.width);
        var rh = this.height.ratio(original.height);
        var ratio = this.sizeMode === "contain" ? Math.min(rw, rh) : Math.max(rw, rh);

        return {
          width: original.width * ratio,
          height: original.height * ratio
        };
      }

    case 1:
      var defined = this.definedSize;
      var undef = this.undefinedSize;
      var orig = original[defined];
      var ratio = this[defined].ratio(orig);

      var sizes = {};
      sizes[defined] = orig * ratio;
      sizes[undef] = this.sizeMode === "exact" ? original[undef] : original[undef] * ratio;

      return sizes;

    default:
      return original;
  }
}


module.exports = SizeSet;
