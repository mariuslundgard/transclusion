function Element(name) {
  transclusion.Node.call(this, transclusion.Node.NODE_ELEMENT, name);
  this.directiveSet = null;
  this.id = null;
  this.previousSibling = null;
  this.nextSibling = null;
}

Element.prototype = Object.create(transclusion.Node.prototype);
Element.prototype.constructor = Element;

transclusion.nodes.Element = Element;

Element.prototype.appendChild = function (node) {
  if (this.lastChild) {
    node.previousSibling = this.lastChild;
    this.nextSibling = node;
  }
  node.nextSibling = null;
  transclusion.Node.prototype.appendChild.call(this, node);
  return node;
};

Element.prototype.mayContain = function (name) {
  return this.getDirectiveSet().mayContain(name);
};

Element.prototype.mayContainAttribute = function (name) {
  return this.getDirectiveSet().mayContainAttribute(name);
};

Element.prototype.mayContainMetaAttribute = function (name) {
  return this.getDirectiveSet().mayContainMetaAttribute(name);
};

Element.prototype.isVoidElement = function () {
  return this.getDirectiveSet().isVoidElement();
};

Element.prototype.getDirectiveSet = function () {
  if (null === this.directiveSet) {
    this.directiveSet = new transclusion.ElementDirectiveSet(this.name);
  }
  return this.directiveSet;
};

Element.prototype.dump = function () {
  var i, len, ret = transclusion.Node.prototype.dump.call(this);

  if (this.attrs.length) {
    ret.attrs = {};
    for (i = 0, len = this.attrs.length; i < len; i++) {
      ret.attrs[this.attrs[i].name] = this.attrs[i].dump();
    }
  }

  if (this.metaAttrs.length) {
    ret.metaAttrs = {};
    for (i = 0, len = this.metaAttrs.length; i < len; i++) {
      ret.metaAttrs[this.metaAttrs[i].name] = this.metaAttrs[i].dump();
    }
  }

  ret.outerStartOffset = this.outerStartOffset;
  ret.innerStartOffset = this.innerStartOffset;
  ret.innerEndOffset = this.innerEndOffset;
  ret.outerEndOffset = this.outerEndOffset;
  ret.path = this.getUniquePath();
  return ret;
};

Element.prototype.getUniquePath = function () {
  if ('html' === this.name) {
    return 'html';
  }

  var path;
  var node = this;
  while (node.parentNode && 'html' !== node.parentNode.name) {
      var name = node.name;
      var parent = node.parentNode;
      var siblings = parent.getChildrenByName(name);
      if (name !== 'body' && name !== 'head' && siblings.length > 1) {
        name += ':nth-child(' + (node.index+1) + ')';
      }
      path = name + (path ? '>' + path : '');
      node = parent;
  }
  return path;
};

Element.prototype.getChildrenByName = function(name) {
  var children = [];
  for (var i = 0; i < this.childNodes.length; i++ ){
    if (name === this.childNodes[i].name) {
      children.push(this.childNodes[i]);
    }
  }
  return children;
};
