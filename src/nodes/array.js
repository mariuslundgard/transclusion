function Arr() {
  structure.Node.call(this, structure.Node.NODE_ARRAY, '#array');
}

Arr.prototype = Object.create(structure.Node.prototype);
Arr.prototype.constructor = Arr;

// exports
structure.nodes.Arr = Arr;

Arr.prototype.dump = function () {
  // return this.childNodes;
  var ret = structure.Node.prototype.dump.call(this);
  return ret;
};
