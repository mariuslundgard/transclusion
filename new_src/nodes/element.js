(function (exports) {
  if (! exports.structure.Node) {
    throw new Error('The structure.nodes.Element class depends on the structure.Node class');
  }

  var struct = exports.structure;
  struct.nodes || (struct.nodes = {});

  function Element(name) {
    struct.Node.call(this, struct.Node.NODE_ELEMENT, name);
    this.directiveSet = null;
  }

  Element.prototype = Object.create(struct.Node.prototype);
  Element.prototype.constructor = Element;

  struct.nodes.Element = Element;

  Element.prototype.mayContain = function (name) {
    return this.getDirectiveSet().mayContain(name);
  };

  Element.prototype.mayContainAttribute = function (name) {
    return this.getDirectiveSet().mayContainAttribute(name);
  };

  Element.prototype.isVoidElement = function () {
    // return false;
    return this.getDirectiveSet().isVoidElement();
  };

  Element.prototype.getDirectiveSet = function () {
    if (null === this.directiveSet) {
      this.directiveSet = new struct.ElementDirectiveSet(this.name);
    }
    return this.directiveSet;
  };
})(this);
