function Node(type, name) {
  this.type = type;
  this.name = name;
  this.document = null;

  // child nodes
  this.firstChild = null;
  this.lastChild = null;
  this.childNodes = [];
  this.attrs = [];
  this.metaAttrs = [];
  this.index = 0;

  // pointers
  this.parentNode = null;
  this.childCount = 0;

  // offsets
  this.outerStartOffset = null;
  this.outerEndOffset = null;
  this.innerStartOffset = null;
  this.innerEndOffset = null;

  if (! this.name) {
    throw new Error('Missing `name`');
  }

  if (! this.type) {
    throw new Error('Missing `type`');
  }
}

// exports
structure.Node = Node;
structure.nodes = {};

// constants
Node.NODE_ELEMENT = 1;
Node.NODE_DOCUMENT = 2;
Node.NODE_TEXT = 3;
Node.NODE_ATTR = 4;
Node.NODE_EXPR = 5;
Node.NODE_COMMENT = 6;
Node.NODE_ARRAY = 7;
Node.NODE_STRING = 8;
Node.NODE_EXPR = 9;
Node.NODE_VAR = 10;
Node.NODE_OPERATOR = 11;
Node.NODE_NUMBER = 12;

Node.prototype = {
  setDocument: function (doc) {
    this.document = doc;
  },

  appendChild: function (node) {
    node.parentNode = this;
    if (Node.NODE_TEXT) {
      if (! node.whiteSpace) {
        node.index = this.childCount;
        this.childCount++;
      }
    } else {
      node.index = this.childCount;
      this.childCount++;
    }

    this.childNodes.push(node);

    if (! this.firstChild) {
      this.firstChild = node;
    }

    this.lastChild = node;

    return node;
  },

  getAttribute: function (attrName) {
    var i, len;
    for (i = 0, len = this.attrs.length; i < len; i++) {
      if (attrName === this.attrs[i].name) {
        return this.attrs[i];
      }
    }
    return null;
  },

  getMetaAttribute: function (attrName) {
    var i, len;
    for (i = 0, len = this.metaAttrs.length; i < len; i++) {
      if (attrName === this.metaAttrs[i].name) {
        return this.metaAttrs[i];
      }
    }
    return null;
  },

  appendAttr: function (node) {
    node.parentNode = this;
    node.index = this.attrs.length;
    this.attrs.push(node);
    return node;
  },

  appendMetaAttr: function (node) {
    node.parentNode = this;
    node.index = this.metaAttrs.length;
    this.metaAttrs.push(node);
    return node;
  },

  setOuterStartOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setOuterStartOffset` cannot be undefined');
    }
    this.outerStartOffset = Number(offset);
  },

  setOuterEndOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setOuterEndOffset` cannot be undefined');
    }
    this.outerEndOffset = Number(offset);
  },

  setInnerStartOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setInnerStartOffset` cannot be undefined');
    }
    this.innerStartOffset = Number(offset);
  },

  setInnerEndOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setInnerEndOffset` cannot be undefined');
    }
    this.innerEndOffset = Number(offset);
  },

  dump: function () {
    var ret = {}, i, len;

    ret.index = this.index;
    ret.name = this.name;
    ret.type = this.type;

    if (this.childNodes.length) {
      ret.childNodes = [];
      for (i = 0, len = this.childNodes.length; i < len; i++) {
        ret.childNodes.push(this.childNodes[i].dump());
      }
    }

    return ret;
  }
};
