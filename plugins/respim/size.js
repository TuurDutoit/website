var Size = function(num) {
  if(!num) {
    this.mode = "relative";
    this.num = 1;
  }
  else if(typeof num === "number") {
    this.mode = "relative";
    this.num = num;
  }
  else {
    if(num.slice(-2) === "px") {
      this.mode = "absolute";
      this.num = parseInt(num.slice(0, -2), 10);
    }
    else if(num.slice(-1) === "%") {
      this.mode = "relative";
      this.num = parseInt(num.slice(0, -1), 10) / 100;
    }
    else {
      this.mode = "relative";
      this.num = parseInt(num, 10);
    }
  }

  this.defined = !!num;
  this.relative = this.mode === "relative";
  this.absolute = this.mode === "absolute";
}

Size.REL = "relative";
Size.ABS = "absolute";



Size.prototype.get = function(original) {
  if(this.absolute) {
    return this.num;
  }
  else {
    return this.num * original;
  }
}

Size.prototype.ratio = function(original) {
  return this.get(original) / original;
}


module.exports = Size;
