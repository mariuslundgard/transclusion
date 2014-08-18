(function (exports) {
  function TreeConstructor(prs) {
    if (! prs) {
      throw new Error('Missing `parser` for TreeConstructor');
    }
    this.parser = prs;
    this.reset();
  }

  // exports
  var mode = {},
      struct = exports.structure || (exports.structure = {}),
      Token = struct.Token,
      Node = struct.Node,
      CharTester = struct.CharTester;

  // exports
  struct.TreeConstructor = TreeConstructor;

  // constants
  // TreeConstructor.MODE_EOF          = 'MODE_EOF';
  TreeConstructor.MODE_INITIAL      = 'MODE_INITIAL';
  TreeConstructor.MODE_BEFORE_HTML  = 'MODE_BEFORE_HTML';
  TreeConstructor.MODE_BEFORE_HEAD  = 'MODE_BEFORE_HEAD';
  TreeConstructor.MODE_IN_HEAD      = 'MODE_IN_HEAD';
  TreeConstructor.MODE_AFTER_HEAD   = 'MODE_AFTER_HEAD';
  TreeConstructor.MODE_IN_BODY      = 'MODE_IN_BODY';
  TreeConstructor.MODE_AFTER_BODY   = 'MODE_AFTER_BODY';
  TreeConstructor.MODE_AFTER_HTML   = 'MODE_AFTER_HTML';
  TreeConstructor.MODE_IN_START_TAG = 'MODE_IN_START_TAG';
  TreeConstructor.MODE_IN_TEXT      = 'MODE_IN_TEXT';

  TreeConstructor.prototype = {
    reset: function () {
      this.mode = TreeConstructor.MODE_INITIAL;
      this.nodeStack = [];
      this.modeStack = [];
      this.pushNode(this.parser.document);
    },

    handleToken: function (tok) {

      if (undefined === this.mode) {
        throw new Error('The tree constructor\'s mode cannot be undefined');
      }

      if (! tok) {
        throw new Error('Token must be provided');
      }

      if (typeof tok !== 'object') {
        throw new Error('Token must be an object');
      }

      if (undefined === tok.type) {
        throw new Error('Token type cannot be undefined');
      }

      if (this.parser.document.debug) {
        console.log(this.mode + '.handleToken(', tok, ')');
      }

      if (undefined === mode[this.mode]) {
        throw new Error('Unknown tree constructor mode: ' + this.mode);
      }

      mode[this.mode](this, tok);
    },

    pushMode: function (mode) {
      if (undefined === mode) {
        throw new Error('cannot push undefined mode');
      }
      this.modeStack.push(this.mode);
      this.mode = mode;
      // console.log('push mode', this.modeStack);

      // throw new Error(this.mode);
    },

    popMode: function () {
      if (! this.modeStack.length) {
        throw new Error('The mode stack is already empty');
      }
      // console.log('popMode', this.modeStack);
      // this.mode = this.modeStack.pop();
      this.mode = this.modeStack.pop();

      if (undefined === this.mode) {
        throw new Error('cannot pop undefined mode');
      }
    },

    pushNode: function (node) {
      this.nodeStack.push(node);
      this.node = node;
      // console.log('PUSH NODE', node.dump());
    },

    popNode: function () {
      if (! this.nodeStack.length) {
        throw new Error('The node stack is already empty');
      }
      var node = this.nodeStack.pop();
      this.node = this.nodeStack[this.nodeStack.length-1];
      return node;
    },

    insertElement: function (name) {
      var node = this.parser.document.createElement(name);
      this.node.appendChild(node);
      this.pushNode(node);
      return node;
    },

    insertChar: function (data) {
      var node = this.parser.document.createText(data);
      if (this.node.lastChild && Node.NODE_TEXT === this.node.lastChild.type) {
        this.node.lastChild.appendData(data);
      } else {
        this.node.appendChild(node);
      }
      if (! CharTester.isWhiteSpace(data)) {
        this.node.lastChild.whiteSpace = false;
      }
      return node;
    },

    assertTitleElementExists: function () {
      if (! this.parser.document.titleElement) {
        this.insertElement('title');
        this.popNode();
      }
    }
  };







  //////////////////////////////////////////////////////////////////////////////
  // Initial mode

  mode[TreeConstructor.MODE_INITIAL] = function (scope, tok) {
    switch (true) {
      case Token.COMMENT === tok.type || Token.CHAR && CharTester.isWhiteSpace(tok.data):
        break; // ignore

      case Token.DOCTYPE === tok.type:
        scope.parser.report(
          'debug',
          'Insert <!DOCTYPE ' + tok.name + '> (MODE_INITIAL)'
        );
        scope.insertDoctype(tok.name);
        scope.mode = TreeConstructor.MODE_BEFORE_HTML;
        break;

      default:
        scope.parser.report(
          'debug',
          'Force insert <!DOCTYPE html> (MODE_INITIAL)'
        );
        scope.mode = TreeConstructor.MODE_BEFORE_HTML;
        scope.handleToken(tok);
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Before html mode

  mode[TreeConstructor.MODE_BEFORE_HTML] = function (scope, tok) {
    switch (true) {
      case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
        scope.insertChar(tok.data);
        break;

      case Token.START_TAG === tok.type:
        if ('html' === tok.name) {
          scope.parser.report('debug', 'Inserting <html> (MODE_BEFORE_HTML)');
          scope.insertElement('html');
          scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
        } else {
          scope.parser.report(
            'debug', 
            'Inserting <html> before attempting to insert <' + tok.name + '> '
            + '(MODE_BEFORE_HTML)'
          );
          scope.insertElement('html');
          scope.mode = TreeConstructor.MODE_BEFORE_HEAD;
          scope.handleToken(tok);
        }
        break;

      case Token.START_TAG_CLOSE === tok.type:
        scope.mode = TreeConstructor.MODE_BEFORE_HEAD;
        scope.node.setInnerStartOffset(tok.offset);
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      default:
        scope.parser.report(
          'debug', 
          'Inserting <html> before proceeding to handle token: ' + tok.type + ' (MODE_BEFORE_HTML)'
        );
        scope.insertElement('html');
        scope.mode = TreeConstructor.MODE_BEFORE_HEAD;
        scope.handleToken(tok);
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Before head mode

  mode[TreeConstructor.MODE_BEFORE_HEAD] = function (scope, tok) {
    var node;
    switch (true) {
      case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
        scope.insertChar(tok.data);
        break;

      case Token.START_TAG === tok.type:
        if ('head' === tok.name) {
          scope.parser.report(
            'debug',
            'Inserting <head> (MODE_BEFORE_HEAD)'
          );
          scope.insertElement('head');
          scope.node.setOuterStartOffset(tok.offset);
          scope.mode = TreeConstructor.MODE_IN_HEAD;
          scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
        } else {
          scope.parser.report(
            'debug',
            'Inserting <head> before attempting to insert <' + tok.name + '> (MODE_BEFORE_HEAD)'
          );
          scope.insertElement('head');
          scope.mode = TreeConstructor.MODE_IN_HEAD;
          scope.handleToken(tok);
        }
        break;

      case Token.START_TAG_CLOSE === tok.type:
        // scope.parser.report(
        //   'debug',
        //   'Inserting <head> before attempting to insert <' + tok.name + '> (MODE_BEFORE_HEAD)'
        // );
        scope.node.setInnerStartOffset(tok.offset);
        // scope.insertElement('head');
        // scope.popNode();
        scope.mode = TreeConstructor.MODE_IN_HEAD;
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      default:
        scope.parser.report(
          'debug',
          'Inserting <head> before proceeding to handle token: ' + tok.type + ' (MODE_BEFORE_HEAD)'
        );
        scope.insertElement('head');
        scope.mode = TreeConstructor.MODE_IN_HEAD;
        scope.handleToken(tok);
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // In head mode

  mode[TreeConstructor.MODE_IN_HEAD] = function (scope, tok) {
    switch (true) {
      case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
        scope.insertChar(tok.data);
        break; // ignore

      case Token.END_TAG === tok.type:
        if ('head' === tok.name) {
          scope.parser.report(
            'debug',
            'Inserting </head> (MODE_IN_HEAD)'
          );
          scope.mode = TreeConstructor.MODE_AFTER_HEAD;
          scope.node.setInnerEndOffset(tok.innerOffset);
          scope.node.setOuterEndOffset(tok.outerOffset);
          scope.popNode();
        } else {
          scope.parser.report(
            'exception',
            'Unexpected end tag: </' + tok.name + '>'
          );
        }
        break;

      case Token.START_TAG === tok.type:
        // console.log(tok.name);
        if (scope.node.mayContain(tok.name)) {
          scope.insertElement(tok.name);
          scope.node.setOuterStartOffset(tok.offset);
          scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
        } else {
          scope.parser.report(
            'debug',
            'Inserting </head> before attempting to insert <' + tok.name + '> (MODE_IN_HEAD)'
          );
          while ('head' !== scope.node.name) {
            scope.popNode();
          }
          scope.popNode();
          scope.mode = TreeConstructor.MODE_AFTER_HEAD;
          scope.handleToken(tok);
        }
        break;

      case Token.START_TAG_CLOSE === tok.type:
        scope.parser.report(
          'debug',
          'End start tag: <' + scope.node.name + '> (MODE_IN_HEAD)'
        );
        scope.node.setInnerStartOffset(tok.offset);
        if (-1 < ['title', 'script', 'style'].indexOf(scope.node.name)) {
          scope.pushMode(TreeConstructor.MODE_IN_TEXT);
          scope.parser.tokenizer.state = struct.Tokenizer.STATE_RAWTEXT;
        } else {
          if (scope.node.isVoidElement()) {
            scope.popNode();
          }
        }
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      default:
        scope.parser.report(
          'debug',
          'Inserting </head> before continuing to process token: ' + tok.type + ' (MODE_IN_HEAD)'
        );
        while ('head' !== scope.node.name) {
          scope.popNode();
        }
        scope.assertTitleElementExists();
        scope.popNode();
        scope.mode = TreeConstructor.MODE_AFTER_HEAD;
        scope.handleToken(tok);
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // After head mode

  mode[TreeConstructor.MODE_AFTER_HEAD] = function (scope, tok) {
    // var node;
    switch (true) {
      case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
        scope.insertChar(tok.data);
        break;

      case Token.START_TAG === tok.type:
        if ('body' === tok.name) {
          scope.parser.report(
            'debug',
            'Inserting <body> (MODE_AFTER_HEAD)'
          );
          scope.insertElement('body');
          scope.node.setOuterStartOffset(tok.offset);
          scope.mode = TreeConstructor.MODE_IN_BODY;
          scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
        } else {
          scope.parser.report(
            'debug',
            'Inserting <body> before attempting to insert <' + tok.name + '> (MODE_AFTER_HEAD)'
          );
          scope.insertElement('body');
          scope.mode = TreeConstructor.MODE_IN_BODY;
          scope.handleToken(tok);
        }
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      default:
        scope.parser.report(
          'debug',
          'Inserting <body> before proceeding to handle token: ' + tok.type + ' (MODE_AFTER_HEAD)'
        );
        scope.insertElement('body');
        scope.mode = TreeConstructor.MODE_IN_BODY;
        scope.handleToken(tok);
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // In body mode

  mode[TreeConstructor.MODE_IN_BODY] = function (scope, tok) {
    switch (true) {
      case Token.CHAR === tok.type:
        scope.insertChar(tok.data);
        break;

      case Token.START_TAG === tok.type:
        if (scope.node.mayContain(tok.name)) {
          scope.parser.report(
            'debug',
            'Inserting <'+tok.name+'> (MODE_AFTER_HEAD)'
          );
          scope.insertElement(tok.name);
          scope.node.setOuterStartOffset(tok.offset);
          scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
        } else {
          scope.parser.report(
            'exception',
            'Unexpected start tag in ' + scope.node.name + ': ' + tok.name + ' (MODE_IN_BODY)'
          );
        }
        break;

      case Token.START_TAG_CLOSE === tok.type:
        if (scope.node.isVoidElement() || tok.selfClosing) {
          scope.node.setOuterStartOffset(tok.offset);
          scope.parser.report('debug', 'Self-closing <' + scope.node.name + '>');
          scope.popNode();
        }
        scope.node.setInnerEndOffset(tok.offset);
        break;

      case Token.END_TAG === tok.type:
        switch (tok.name) {
          case 'body':
          case 'html':
            while ('body' !== scope.node.name) {
              scope.parser.report(
                'debug',
                'Inserting </' + scope.node.name + '> (MODE_IN_BODY)'
              );
              scope.node.setInnerEndOffset(tok.innerOffset);
              scope.node.setOuterEndOffset(tok.outerOffset);
              scope.popNode();
            }
            scope.parser.report(
              'debug',
              'Inserting </body> (MODE_IN_BODY)'
            );
            scope.node.setInnerEndOffset(tok.innerOffset);
            scope.node.setOuterEndOffset(tok.outerOffset);
            scope.popNode();
            scope.mode = TreeConstructor.MODE_AFTER_BODY;
            if ('html' === tok.name) {
              scope.handleToken(tok);
            }
            break;

          default:
            if (tok.name === scope.node.name) {
              scope.node.setInnerEndOffset(tok.innerOffset);
              scope.node.setOuterEndOffset(tok.outerOffset);
              scope.popNode();
            } else {
              scope.parser.report(
                'exception',
                'Unexpected end tag </' + tok.name + '> in <' + scope.node.name + '> (MODE_IN_BODY)'
              );
            }
            break;
        }
        break;

      case Token.EOF === tok.type:
        scope.parser.report('debug', 'Inserting </body> at end of file (MODE_IN_BODY)');
        while ('body' !== scope.node.name) {
          scope.popNode();
        }
        scope.mode = TreeConstructor.MODE_AFTER_BODY;
        scope.handleToken(tok);
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      case Token.EXPR_OPEN === tok.type:
        scope.insertExpr();
        scope.pushMode(TreeConstructor.MODE_IN_EXPR);
        break;

      default:
        scope.parser.report(
          'exception',
          'Unexpected token in body: ' + tok.type
        );
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // After body mode

  mode[TreeConstructor.MODE_AFTER_BODY] = function (scope, tok) {
    switch (true) {
      case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
        scope.insertChar(tok.data);
        break;

      case Token.EOF === tok.type:
        scope.parser.report('debug', 'Inserting </html> at end of file (MODE_AFTER_BODY)');
        while ('html' !== scope.node.name) {
          scope.popNode();
        }
        scope.mode = TreeConstructor.MODE_AFTER_HTML;
        scope.handleToken(tok);
        break;

      case Token.END_TAG === tok.type:
        if ('html' === tok.name) {
          while ('html' !== scope.node.name) {
            scope.node.setInnerEndOffset(tok.innerOffset);
            scope.node.setOuterEndOffset(tok.outerOffset);
            scope.popNode();
          }
          scope.node.setInnerEndOffset(tok.innerOffset);
          scope.node.setOuterEndOffset(tok.outerOffset);
          scope.popNode();
          scope.mode = TreeConstructor.MODE_AFTER_HTML;
        } else {
          scope.parser.report('exception', 'Unexpected end tag </' + tok.name + '> (MODE_AFTER_BODY)');
        }
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      case Token.START_TAG === tok.type:
        scope.parser.report('error', 'Unexpected start tag <' + tok.name + '> after body (MODE_AFTER_BODY)');
        scope.mode = TreeConstructor.MODE_IN_BODY;
        scope.pushNode(scope.parser.document.bodyElement); // reinsert the body element to the stack of open element
        scope.handleToken(tok);
        break;

      default:
        scope.parser.report('exception', 'Unexpected token after body: ' + tok.type);
        scope.mode = TreeConstructor.MODE_IN_BODY;
        scope.pushNode(scope.parser.document.bodyElement); // reinsert the body element to the stack of open element
        scope.handleToken(tok);
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // In start tag mode

  mode[TreeConstructor.MODE_IN_START_TAG] = function (scope, tok) {
    switch (true) {

      case Token.START_TAG_CLOSE === tok.type:
        scope.popMode();
        if (Node.NODE_ATTR === scope.node.type) {
          scope.popNode();
        }
        scope.handleToken(tok);
        break;

      // case Token.START_ARR === tok.type:
      //   scope.insertArray();
      //   scope.pushMode(TreeConstructor.MODE_ARR);
      //   break;

      // case Token.START_OBJ === tok.type:
      //   scope.insertObject();
      //   scope.pushMode(TreeConstructor.MODE_OBJ);
      //   break;

      // case Token.ATTR_KEY === tok.type:
      //   while (Node.NODE_ATTR === scope.node.type) {
      //     scope.popNode();
      //   }
      //   scope.insertAttr(tok.name);
      //   break;

      // case Token.START_ATTR_VALUE === tok.type:
      //   scope.pushMode(TreeConstructor.MODE_ATTR_VALUE);
      //   break;

      default:
        scope.parser.report(
          'exception',
          'Unexpected token in start tag mode: ' + tok.type
        );
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // After html mode

  mode[TreeConstructor.MODE_AFTER_HTML] = function (scope, tok) {
    switch (true) {
      case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
        scope.insertChar(tok.data);
        break;

      case Token.COMMENT === tok.type:
        scope.insertComment(tok.data);
        break;

      case Token.EOF === tok.type:
        // DONE!
        // stop parsing
        break;

      // case Token.END_TAG === tok.type:
      //   if ('html' === tok.name) {
      //     while ('html' !== scope.node.name) {
      //       scope.node.setInnerEndOffset(tok.innerOffset);
      //       scope.node.setOuterEndOffset(tok.outerOffset);
      //       scope.popNode();
      //     }
      //     scope.node.setInnerEndOffset(tok.innerOffset);
      //     scope.node.setOuterEndOffset(tok.outerOffset);
      //     scope.popNode();
      //     scope.mode = TreeConstructor.MODE_AFTER_HTML;
      //   } else {
      //     scope.parser.report('exception', 'Unexpected end tag </' + tok.name + '> (MODE_AFTER_BODY)');
      //   }
      //   break;

      // case Token.START_TAG === tok.type:
      //   scope.parser.report('error', 'Unexpected start tag <' + tok.name + '> after body (MODE_AFTER_BODY)');
      //   scope.mode = TreeConstructor.MODE_IN_BODY;
      //   scope.pushNode(scope.parser.document.bodyElement); // reinsert the body element to the stack of open element
      //   scope.handleToken(tok);
      //   break;

      default:
        scope.parser.report('exception', 'Unexpected token after html: ' + tok.type);
        break;
    }
  };
  
  //////////////////////////////////////////////////////////////////////////////
  // In text mode

  mode[TreeConstructor.MODE_IN_TEXT] = function (scope, tok) {
    switch (true) {
      case Token.CHAR === tok.type:
        scope.insertChar(tok.data);
        break;

      case Token.EOF === tok.type:
        scope.parser.report('error', 'Unexpected end of file in text mode (MODE_IN_TEXT)');
        if ('script' === scope.node) {
          scope.node.alreadyStarted = true;
        }
        scope.popNode();
        scope.popMode();
        scope.handleToken(tok);
        break;

      case Token.END_TAG === tok.type:
        if ('script' === tok.name) {
          // TODO
          throw new Error('NOT IMPLEMENTED');
        } else {
          scope.popNode();
          scope.popMode();
        }
        break;
    }
  };
  
  ////////////////////////////////
})(this);
