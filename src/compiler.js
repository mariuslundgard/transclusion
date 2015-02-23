function Compiler(doc) {
  if (! doc) {
    throw new Error('Missing `document` for Compiler');
  }
  this.document = doc;
}

// exports
transclusion.Compiler = Compiler;

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
      case transclusion.Node.NODE_ELEMENT:
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

      case transclusion.Node.NODE_TEXT:
        ret += node.data;
        break;

      case transclusion.Node.NODE_COMMENT:
        ret += '<!--';
        ret += node.data;
        ret += '-->';
        break;

      case transclusion.Node.NODE_ATTR:
        ret += ' ';
        ret += node.name;
        ret += '="';
        ret += this.compileNodes(node.childNodes);
        ret += '"';
        break;

      case transclusion.Node.NODE_ARRAY:
        ret += 'Array(' + node.childNodes.length + ')';
        break;

      case transclusion.Node.NODE_EXPR:
        if (node.childNodes.length) {
          ret += this.compileExpr(node);
        }
        break;

      case transclusion.Node.NODE_VAR:
        ret += 'this.document.context.' + node.name;
        break;

      case transclusion.Node.NODE_OPERATOR:
        ret += ' ';
        ret += node.sign;
        ret += ' ';
        break;

      case transclusion.Node.NODE_NUMBER:
        ret += node.value;
        break;

      case transclusion.Node.NODE_STRING:
        ret += '\'' + node.data.replace(/(\')/gm, '\\\'') + '\'';
        break;

      default:
        throw new Error('Unsupported node type in compiler: ' + node.type);
    }
    return ret;
  },

  compileExpr: function (node) {
    var ret = '';

    if (transclusion.NODE_EXPR === node.parentNode.type) {
      // ret += '(';
    }

    ret += this.compileNodes(node.childNodes);

    if (transclusion.NODE_EXPR === node.parentNode.type) {
      // ret += ')';
    }

    console.log(ret);

    return eval(ret);
  }
};
