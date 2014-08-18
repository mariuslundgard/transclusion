(function (exports) {
  if (! exports.structure.Node) {
    throw new Error('The structure.nodes.Text class depends on the structure.Node class');
  }

  var struct = exports.structure;
  struct.nodes || (struct.nodes = {});

  function Text(data) {
    struct.Node.call(this, struct.Node.NODE_TEXT, '#text');
    this.data = data || '';
    this.whiteSpace = true;
  }

  Text.prototype = Object.create(struct.Node.prototype);
  Text.prototype.constructor = Text;

  struct.nodes.Text = Text;

  Text.prototype.appendData = function (data) {
    this.data += data;
  };
})(this);
