(function (exports) {
  function Node(type, name) {
    this.type = type;
    this.name = name;
    this.document = null;
    this.childNodes = [];
    this.firstChild = null
    this.lastChild = null;
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
  exports.structure || (exports.structure = {});
  exports.structure.Node = Node;

  // constants
  Node.NODE_ELEMENT = 1;
  Node.NODE_DOCUMENT = 2;
  Node.NODE_TEXT = 3;
  Node.NODE_ATTR = 4;
  Node.NODE_EXPR = 5;

  Node.prototype = {
    setDocument: function (doc) {
      this.document = doc;
    },

    appendChild: function (node) {
      node.index = this.childNodes.length;
      this.childNodes.push(node);
      if (! this.firstChild) {
        this.firstChild = node;
      }
      this.lastChild = node;
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
})(this);
