function Comment(data) {
  transclusion.Node.call(this, transclusion.Node.NODE_COMMENT, '#comment');
  this.data = data || '';
}

Comment.prototype = Object.create(transclusion.Node.prototype);
Comment.prototype.constructor = Comment;

transclusion.nodes.Comment = Comment;

Comment.prototype.dump = function () {
  var ret = transclusion.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};
