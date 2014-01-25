window.application = (function (global) {

  var $ = global.jQuery,
      Node = global.structure.Node;

  // Create the structure.js document
  var doc = new global.structure.Document();

  // Add directives
  _addTransclusionDirective(doc);
  _addForDirective(doc);

  // Create the PouchDB-database
  var db = new PouchDB('debugger');

  var app = {

    initialize: function() {

      // UI
      this.textarea    = $('.editor textarea');
      this.visual      = $('.visual');
      this.tree        = $('.tree');
      this.debugCache  = $('.debug .cache');
      this.debugErrors = $('.debug .errors');
      this.debugStatus = $('.debug .status');
      this.breakPoint  = $('.breakpoint');

      // Transform new input
      this.textarea.bind('input', this.inputHandler.bind(this));
      this.textarea.bind('focus mouseup keyup keydown input', this.editorFocusHandler.bind(this));

      // Store a reference to this object
      var context = this;

      // Load source from db
      this.fetchDocumentInput(function (err, source) {
        if (!source) {
          source = '<p>Default source</p>';
          context.storeDocumentInput(source);
        }

        context.textarea.val(source);;
        context.setDocumentInput(source);
      });

      // Click tree nodes
      this.tree.on('click', function (e) {
        var target = $(e.target);
        var node = target.closest('.node');

        // Delete nodes
        if (target.hasClass('delete-btn')) {
          e.preventDefault();
          var before = doc.input.substr(0, node.data('start'));
          var after = doc.input.substr(node.data('end'), doc.input.length);
          context.textarea.val(before + after);
          return context.setDocumentInput(before + after);
        }

        // Select nodes
        if (node.data('selector')) {
          context.setSelectedNodeInVisual($('.visual' + node.data('selector').substr(4)));
        }
      });

      // Select node in visual mode
      this.visual.on('click', function (e) {
        var target = $(e.target);

        if (target.closest('.visual').size()) {
          context.setSelectedNodeInVisual(target);
        }
      });

      this.selectedNode = null;

      return this;
    },

    editorFocusHandler: function (e) {

      var docEl,
          selEl;

      if (docEl = doc.getElementAtIndexPointer(_getCaret(e.currentTarget))) {
        selEl = this.visual.find(docEl.getUniqueSelector().substr(4));
        this.setSelectedNodeInVisual(selEl);
      }
      // console.log(e);
      // console.log(_getCaret(e.currentTarget));
      
    },

    setSelectedNodeInVisual: function (node) {
      var c = node.closest('[data-tr-component]');

      if (c.size()) {
        node = c;
      }

      if (this.selectedNode) {
        this.selectedNode.removeClass('selected');
      }

      node.addClass('selected');

      this.selectedNode = node;
    },

    setSelectedNodeInTree: function (node) {
      // if (this.selectedNode) {
      //   this.selectedNode.removeClass('selected');
      // }

      // node.addClass('selected');

      // this.selectedNode = node;
    },

    inputHandler: function (e) {
      var input = this.textarea.val();

      this.setDocumentInput(input);
      this.storeDocumentInput(input);
    },

    setDocumentInput: function(source) {
      doc.setInput(source);
      this.updateOutput();
    },

    storeDocumentInput: function (source) {
      db.get('source', function(err, resp) {
        db.put({
          _id: 'source',
          _rev: resp._rev,
          source: source,
        }, function(err, response) { });
      });
    },

    fetchDocumentInput: function (fn) {
      db.get('source', function (err, doc) {
        if (!err) {
          fn(null, doc.source);
          return;
        }

        fn(err, null);
      });
    },

    updateOutput: function () {
      try {

        // Compile document and update UI
        this.updateDebugCache(
          doc.compile()
        );

        //
        this.updateVisual();
        this.updateTree();

        // Hide the error panel
        this.hideError();
      }

      catch (err) {

        // Show the error panel
        this.showError(err);
      }

      // Update the parser status for both successful/unsuccessful compilations
      this.updateParserStatus();
    },

    updateTree: function () {      
      this.tree.children().remove();
      _renderTreeNodes(this.tree, doc.body.childNodes);
    },

    updateDebugCache: function (html) {
      this.debugCache
        .text('')
        .show()
        .html(
          html
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
        );
    },

    updateVisual: function () {
      this.visual.text('');
      if (doc.body) {
        this.visual.html(
          doc.compiler.compileNodes(
            doc.body.childNodes
          )
        );
      } else {
        this.visual.text('');
      }
    },

    hideError: function () {
      $('body').removeClass('error');

      this.debugErrors.hide();
      this.breakPoint.hide();
    },

    showError: function (err) {
      $('body').addClass('error');

      var trace,
          traceOutput = '',
          stackTrace = _parseErrorStack(err.stack),
          i,
          $error;

      for (i=0;i<stackTrace.length;i++) {
        trace = stackTrace[i];
        traceOutput += '<span class="function code">';
        traceOutput += (trace.function ? trace.function + '()' : '&nbsp;') + '</span> ';
        traceOutput += '<span class="file"><a href="' + trace.sourceURL + '">' + _shortenPath(trace.sourceURL) + '</a></span> ';
        if (trace.line) traceOutput += '<span class="line">' + trace.line + '</span>:';
        if (trace.column) traceOutput += '<span class="column">' + trace.column + '</span>';
        traceOutput += '<br>';
      }

      $error = $('<div><div><h2 class="error-title">' + err.message + '</h2>'
         + '<p><a href="' + err.sourceURL + '">' + _shortenPath(err.sourceURL) + '</a> ' + err.line + '</p></div><div><h3>Stack</h3>' + traceOutput + '</div></div>');

      this.breakPoint.show().css({
        top: ((doc.parser.stream.line * 18) - 1) + 'px'
      });

      this.breakPoint.find('span').css({
        left: ((doc.parser.stream.column * 7)) + 'px'
      });

      this.debugCache.hide();
      this.debugErrors.show().html($error);
    },

    updateParserStatus: function () {
      this.debugStatus.html(
          "TreeConstructor: " + (doc.parser.treeConstructor.mode ? doc.parser.treeConstructor.mode.toUpperCase().replace(' ', '_') : '<span style="color: #f00">n/a</span>')
        + "<br>Tokenizer: "   + (doc.parser.tokenizer.state ? doc.parser.tokenizer.state.toUpperCase().replace(' ', '_') : '<span style="color: #f00">n/a</span>')
        + "<br>Line: "        + doc.parser.stream.line
        + "<br>Column: "      + doc.parser.stream.column
      );
    }
  };

  function _renderTreeNodes (root, nodes) {
    var i;
    for (i = 0; i < nodes.length; i++) {
      _renderTreeNode(root, nodes[i]);
    }
  }

  function _renderTreeNode (root, node) {
    var nodeEl,
        i;

    switch (node.type) {

      case Node.DOCUMENT:
        nodeEl = $('<div class="document wrapper"></div>');
        root.append(nodeEl);

        for (i = 0; i < node.childNodes.length; i++) {
          _renderTreeNodes(nodeEl, node.childNodes[i]);
        }
        break;

      case Node.ELEMENT:
        nodeEl = $('<div class="element node" data-selector="'+node.getUniqueSelector()+'" data-start="' + node.startPointer + '" data-end="' + node.endPointer + '"><span class="syntax">&lt;</span>' + node.name + '<span class="syntax">&gt;</span> <a href="#" class="delete-btn">delete</a></div>');
        root.append(nodeEl);

        for (i = 0; i < node.childNodes.length; i++) {
          _renderTreeNodes(nodeEl, node.childNodes[i]);
        }
        break;

      case Node.TEXT:
        if (!node.whiteSpace) {
          nodeEl = $('<div class="text node">' + node.data + ' <a href="#" class="delete-btn">delete</a></div>');
          root.append(nodeEl);
        }
        break;

      case Node.COMMENT:
        if (!node.whiteSpace) {
          nodeEl = $('<div class="comment node">' + node.data + ' <a href="#" class="delete-btn">delete</a></div>');
          root.append(nodeEl);
        }
        break;

      default:
        throw new Error('Unknown node type: ' + node.type);
        break;
    }
  }

  function _parseErrorStack (stack) {
    var result = [],
        i, 
        entry, 
        parts, 
        obj, 
        entries = stack.split("\n");

    for (i = 0; i < entries.length; i++) {
      entry = entries[i];
      parts = entry.split('@');
      obj = {
        'function': null,
        file: null,
        line: null,
        column: null
      };

      if (1 < parts.length) {
        obj.function = parts[0];
        entry = parts[1];
      } else {
        entry = parts[0];
      }

      if (entry.substr(0, 4) === 'http') {
        parts = entry.split(':');
        obj.sourceURL = parts[0] + ':' + parts[1];
        obj.line = parts[2];
        obj.column = parts[3];
      } else {
        obj.sourceURL = entry;
      }

      result.push(obj);
    }

    return result;
  }

  function _shortenPath (path) {
    var i,
        pos,
        paths = [
          'http://asdf.local/structure.js.dev/',
          'http://ajax.googleapis.com/ajax/libs/',
        ];

    for (i=0; i<paths.length; i++) {
      if (0 == String(path).indexOf(paths[i])) {
        return String(path).substr(paths[i].length);
      }
    }

    return path;
  }

  function _addTransclusionDirective (doc) {
    doc.addDirective('transclude', {
      compileName: '[data-tr-component=\'transclude\']',
      allowedParents: [ 'body' ],
      allowedChildren: { '#flow' : {}, '#phrasing': {}, '#palpable': {} },
      compile: function (c, node) {
        c.push('<div data-tr-component="transclude" contenteditable="false">');
        c.push(doc.compiler.compileNodes(node.childNodes));
        c.push('</div>');
        return c;
      }
    });
  }

  function _addForDirective (doc) {
    doc.addDirective('for', {
      compileName: '[data-tr-component=\'for\']',
      allowedParents: [ 'body' ],
      allowedChildren: { '#flow' : {}, '#phrasing': {}, '#palpable': {} },
      allowedAttrs: { 'var': {}, 'in': {} },
      compile: function (c, node) {
        c.push('<div data-tr-component="for" contenteditable="false"');
        c.push(' data-tr-var="', node.getAttribute('var'), '"');
        c.push(' data-tr-in="', node.getAttribute('in'), '"');
        c.push('>');
        c.push(doc.compiler.compileNodes(node.childNodes));
        c.push('</div>');
        return c;
      }
    });
  }

  function _getCaret(el) { 
    if (el.selectionStart) { 
      return el.selectionStart; 
    } else if (document.selection) { 
      el.focus(); 

      var r = document.selection.createRange(); 
      if (r == null) { 
        return 0; 
      } 

      var re = el.createTextRange(), 
          rc = re.duplicate(); 
      re.moveToBookmark(r.getBookmark()); 
      rc.setEndPoint('EndToStart', re); 

      return rc.text.length; 
    }  
    return 0; 
  }

  return app.initialize();

})(window);
