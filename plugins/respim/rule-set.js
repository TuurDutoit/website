var minimatch = require("minimatch");
var Rule = require("./rule");


var RuleSet = function(rules) {
  if(rules instanceof Array) {
    this.rules = rules.map(function(rule, index) {
      return new Rule(rule, index);
    });
  }
  else {
    var names = Object.keys(rules);
    this.rules = names.map(function(name) {
      return new Rule(rules[name], name);
    });
  }


  this.__genGlob();
}

RuleSet.prototype.__genGlob = function() {
  if(this.rules.length === 1) {
    this.glob = this.rules[0].glob;
  }
  else {
    var globs = this.rules.map(function(rule) {
      return rule.glob;
    });

    this.glob = "{" + globs.join(",") + "}";
  }
}

RuleSet.prototype.match = function(path) {
  return minimatch(path, this.glob);
}

RuleSet.prototype.findMatches = function(path) {
  var matches = [];

  this.rules.forEach(function(rule) {
    if(rule.match(path)) {
      matches.push(rule);
    }
  });

  return matches;
}


module.exports = RuleSet;
