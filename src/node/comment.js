(function (_, core, util) {

  var Comment = function (data) {
    this.initialize.call(this, core.Node.COMMENT, '#comment');
    this.data = data;
  };

  // _.extend(Comment.prototype, core.Node.prototype, {

  //   appendData: function () {
      
  //   }
  // });

  Comment.prototype = util.copy(core.Node.prototype);
  Comment.prototype.constructor = Comment;

  Comment.prototype.appendData = function(data) {
    this.data += data;
  };

  core.Comment = Comment;
}(
  window._,
  window.structure,
  window.structure.util
));
