function Text(data) {
  structure.Node.call(this, structure.Node.NODE_TEXT, '#text');
  this.data = data || '';
  this.whiteSpace = true;
}

Text.prototype = Object.create(structure.Node.prototype);
Text.prototype.constructor = Text;

// exports
structure.nodes.Text = Text;

Text.prototype.appendData = function (data) {
  this.data += data;
};

Text.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};
