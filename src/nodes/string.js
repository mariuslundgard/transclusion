function Str(data) {
  transclusion.Node.call(this, transclusion.Node.NODE_STRING, '#string');
  this.data = data;
}

Str.prototype = Object.create(transclusion.Node.prototype);
Str.prototype.constructor = Str;

// exports
transclusion.nodes.Str = Str;

Str.prototype.dump = function () {
  var ret = transclusion.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};
