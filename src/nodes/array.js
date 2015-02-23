function Arr() {
  transclusion.Node.call(this, transclusion.Node.NODE_ARRAY, '#array');
}

Arr.prototype = Object.create(transclusion.Node.prototype);
Arr.prototype.constructor = Arr;

transclusion.nodes.Arr = Arr;

Arr.prototype.dump = function () {
  var ret = transclusion.Node.prototype.dump.call(this);
  return ret;
};
