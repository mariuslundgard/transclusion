(function (core, util) {

  var Attr = function (name) {
    this.initialize.call(this, core.Node.ATTRIBUTE, name);
  };

  Attr.prototype = util.copy(core.Node.prototype);
  Attr.prototype.constructor = Attr;

  Attr.prototype.evaluate = function () {
    return this.document.compiler.compileNodes(this.childNodes);
  };

  core.Attr = Attr;
}(
  window.structure,
  window.structure.util
));
