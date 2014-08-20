function Comment(data) {
  structure.Node.call(this, structure.Node.NODE_COMMENT, '#comment');
  this.data = data || '';
}

Comment.prototype = Object.create(structure.Node.prototype);
Comment.prototype.constructor = Comment;

structure.nodes.Comment = Comment;

Comment.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};
