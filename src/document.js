(function (_, core, Node, Text, Comment, Element, Attr, Directive) {
  
  var Document = function (input) {
    this.input = undefined !== input ? input : '';

    this.initialize(Node.DOCUMENT, '#document');

    this.documentElement = null;
    
    this.directives = {};
    this.loadedDirectives = {};
    
    this.head = null;
    this.body = null;

    this.parser = null;
    this.compiler = null;

    this.isParsed = false;
  };

  _.extend(Document.prototype, Node.prototype, {

    setInput: function(input) {
      this.reset();
      this.input = input;
    },

    reset: function () {
      this.childNodes = [];

      this.lastChild = null;
      this.firstChild = null;

      this.body = null;
      this.head = null;

      this.isParsed = false;
    },

    parse: function () {

      if (!this.parser) {
        this.parser = new core.Parser({
          document: this,
          sendEOF: false
        });
      }

      if (!this.isParsed) {
        this.parser.parse(this.input)
        this.isParsed = true;
      }
      
      return this;
    },

    getCompiler: function() {
      if (!this.compiler) {
        this.compiler = new core.Compiler();
      }

      return this.compiler;
    },

    compile: function () {
      return this.getCompiler().compile(this.parse());
    },

    createElement: function (name) {
      var node = new Element(name);
      node.setDocument(this);
      return node;
    },

    createText: function (data) {
      var node = new Text(data);
      node.setDocument(this);
      return node;
    },

    createComment: function (data) {
      var node = new Comment(data);
      node.setDocument(this);
      return node;
    },

    createAttr: function (name) {
      var node = new Attr(name);
      node.setDocument(this);
      return node;
    },

    getDirective: function(name) {

      if (this.directives[name] && this.loadedDirectives[name]) {
        return this.directives[name];
      }

      if (this.directives[name]) {
        this.directives[name].merge(
          Directive.load(this, name)
        );
      } else {
        this.directives[name] = Directive.load(this, name);
      }

      this.loadedDirectives[name] = true;

      return this.directives[name];
    },

    addDirective: function (name, ruleSet) {
      var directive = new Directive(this, name, ruleSet);
      if (this.getDirective(name)) {
        directive.merge(this.directives[name]);
        this.directives[name] = directive;
      } else {
        this.directives[name] = directive;
      }
    },

    getElementAtIndexPointer: function (pointer) {
      return _getElementsAtPosition(pointer, this.childNodes, [ null ]).pop();
      // return _getDeepestNodeAtPosition(pointer, this.childNodes);
    }
  });

  // function _getDeepestElementAtPosition (pos, nodes) {
  //   return _getElementsAtPosition(pos, nodes, [ null ]).pop();
  // }

  function _getElementsAtPosition (pos, nodes, r) {
    var i, node, end;

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];

      // console.log(node);
      end = (null !== node.endPointer)
        ? node.endPointer
        : node.document.input.length;

      if (node.startPointer <= pos && pos <= end) {
        if (Node.ELEMENT === node.type) {
          // console.log('Look for: ' + pos + ' / node: ' + node.name + ' start: ' + node.startPointer + ' end: ' + node.endPointer);

          r.push(node);
          r = _getElementsAtPosition(pos, node.childNodes, r);
        }
      }
    }

    return r;
  }

  core.Document = Document;
}(
  window._,
  window.structure,
  window.structure.Node,
  window.structure.Text,
  window.structure.Comment,
  window.structure.Element,
  window.structure.Attr,
  window.structure.Directive
));
