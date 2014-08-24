function Str(data) {
  structure.Node.call(this, structure.Node.NODE_STRING, '#string');
  this.data = data;
}

Str.prototype = Object.create(structure.Node.prototype);
Str.prototype.constructor = Str;

// exports
structure.nodes.Str = Str;

Str.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};
