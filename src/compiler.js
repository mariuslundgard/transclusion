(function(core, Node) {

  var Compiler = function (options) {
    this.initialize(this, options);
  };

  Compiler.prototype.initialize = function (options) {
    options || (options = {});
  };
  
  Compiler.prototype.compile = function (document) {
    return compileNodes([ '<!DOCTYPE html>\n' ], document.childNodes).join('');
  };

  Compiler.prototype.compileNode = function (node) {
    // return compileNodes([], [node]).join('');
    return this.compileNodes([node]);
  };

  Compiler.prototype.compileNodes = function (nodeList) {
    return compileNodes([], nodeList).join('');
  };

  function compileNodes(cache, nodeList) {

    if (!nodeList) {
      return [];
    }

    for (var i = 0; i < nodeList.length; i++) {
        cache = compileNode(cache, nodeList[i]);
    }

    return cache;
  }

  function compileNode(cache, node) {
    switch (node.type) {

      case Node.TEXT:
        cache.push(node.data);
        break;

      case Node.ELEMENT:

        if (node.getDirective().compile) {
          cache = node.getDirective().compile(cache, node);
        } else {
          cache.push('<', node.name);
          cache = compileNodes(cache, node.attrs);
          cache.push('>');

          if (!node.isVoidElement()) {
            cache = compileNodes(cache, node.childNodes);
            cache.push('</', node.name, '>');
          }
        }
        break;

      case Node.ATTR:
        cache.push(' ', node.name, '=\"');
        cache = compileNodes(cache, node.childNodes);
        cache.push('\"');
        break;

      case Node.COMMENT:
        cache.push('<!--', node.data, '-->');
        break;

      default:
        throw new Error('Compile error: unknown node type: '+node.type);
    }

    return cache;
  }

  core.Compiler = Compiler;
}(
  window.structure,
  window.structure.Node
));
