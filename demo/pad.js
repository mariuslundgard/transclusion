(function (exports) {
  exports.update = function (res) {
    document.body.innerHTML = res.bodyHTML;
    document.body.contentEditable = 'true';
  };
})(this);
