function Attr(name) {
  transclusion.Node.call(this, transclusion.Node.NODE_ATTR, name);
}

Attr.prototype = Object.create(transclusion.Node.prototype);
Attr.prototype.constructor = Attr;

transclusion.nodes.Attr = Attr;

Attr.prototype.evaluate = function () {
  return this.document.getCompiler().compileNodes(this.childNodes);
};
