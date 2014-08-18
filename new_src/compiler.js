(function (exports) {

  var struct = exports.structure || (exports.structure = {});

  function Compiler(doc) {
    if (! doc) {
      throw new Error('Missing `document` for Compiler');
    }
    this.document = doc;
  }

  // exports
  struct.Compiler = Compiler;

  //////////////////////////////////////////////////////////////////////////////
  // Compiler methods:

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
      // console.log('COMPILE NODE:', node.type, struct.Node.NODE_ELEMENT);
      var ret = '';
      switch (node.type) {
        case struct.Node.NODE_ELEMENT:
        // console.log('ss');
          ret += '<';
          ret += node.name;
          ret += '>';
          ret += this.compileNodes(node.childNodes);
          ret += '</';
          ret += node.name;
          ret += '>';
          break;

        case struct.Node.NODE_TEXT:
          ret += node.data;
          break;

        default:
          throw new Error('Unsupported node type in compiler: ' + node.type);
      }
      return ret;
    }
  };

})(this);
