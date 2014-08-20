function Compiler(doc) {
  if (! doc) {
    throw new Error('Missing `document` for Compiler');
  }
  this.document = doc;
}

// exports
structure.Compiler = Compiler;

Compiler.prototype = {
  compile: function () {
    return this.compileNodes(this.document.childNodes);
  },

  compileNodes: function (nodes) {
    var i, len, ret = '';
    for (i = 0, len = nodes.length; i < len; i++) {
      ret += this.compileNode(nodes[i]);
    }
    return ret;
  },

  compileNode: function (node) {
    var ret = '';
    switch (node.type) {
      case structure.Node.NODE_ELEMENT:
        ret += '<';
        ret += node.name;
        ret += this.compileNodes(node.attrs);
        ret += '>';
        if (! node.isVoidElement()) {
          ret += this.compileNodes(node.childNodes);
          ret += '</';
          ret += node.name;
          ret += '>';
        }
        break;

      case structure.Node.NODE_TEXT:
        ret += node.data;
        break;

      case structure.Node.NODE_COMMENT:
        ret += '<!--';
        ret += node.data;
        ret += '-->';
        break;

      case structure.Node.NODE_ATTR:
        ret += ' ';
        ret += node.name;
        ret += '="';
        ret += this.compileNodes(node.childNodes);
        ret += '"';
        break;

      default:
        throw new Error('Unsupported node type in compiler: ' + node.type);
    }
    return ret;
  }
};
