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

      case structure.Node.NODE_ARRAY:
        ret += 'Array(' + node.childNodes.length + ')';
        break;

      case structure.Node.NODE_EXPR:
        if (node.childNodes.length) {
          ret += this.compileExpr(node);
        }
        break;

      case structure.Node.NODE_VAR:
        ret += 'this.document.context.' + node.name;
        break;

      case structure.Node.NODE_OPERATOR:
        ret += ' ';
        ret += node.sign;
        ret += ' ';
        break;

      case structure.Node.NODE_NUMBER:
        ret += node.value;
        break;

      case structure.Node.NODE_STRING:
        ret += '\'' + node.data.replace(/(\')/gm, '\\\'') + '\'';
        break;

      default:
        throw new Error('Unsupported node type in compiler: ' + node.type);
    }
    return ret;
  },

  compileExpr: function (node) {
    var ret = '';

    if (structure.NODE_EXPR === node.parentNode.type) {
      // ret += '(';
    }

    ret += this.compileNodes(node.childNodes);

    if (structure.NODE_EXPR === node.parentNode.type) {
      // ret += ')';
    }

    console.log(ret);

    return eval(ret);
  }
};
