function Text(data) {
  transclusion.Node.call(this, transclusion.Node.NODE_TEXT, '#text');
  this.data = data || '';
  this.whiteSpace = true;
}

Text.prototype = Object.create(transclusion.Node.prototype);
Text.prototype.constructor = Text;

// exports
transclusion.nodes.Text = Text;

Text.prototype.appendData = function (data) {
  this.data += data;
};

Text.prototype.dump = function () {
  var ret = transclusion.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};
