(function(core, Token, Tokenizer, Node, util) {

  var TreeConstructor = function (parser) {
    this.initialize(parser);
  };

  TreeConstructor.INITIAL     = 'initial';
  TreeConstructor.BEFORE_HTML = 'before html';
  TreeConstructor.BEFORE_HEAD = 'before head';
  TreeConstructor.IN_HEAD     = 'in head';
  TreeConstructor.AFTER_HEAD  = 'after head';
  TreeConstructor.IN_BODY     = 'in body';
  TreeConstructor.AFTER_BODY  = 'after body';
  TreeConstructor.AFTER_HTML  = 'after html';
  TreeConstructor.ATTR        = 'attr';
  TreeConstructor.PLAINTEXT   = 'plaintext';

  // TreeConstructor.parser = null;
  // TreeConstructor.prototype.node = null;
  // TreeConstructor.prototype.nodeStack = null;
  // TreeConstructor.prototype.mode = null;

  TreeConstructor.prototype.initialize = function (parser) {
    this.parser    = parser;
    this.node      = parser.document;
    this.nodeStack = [ this.node ];
    this.mode      = TreeConstructor.INITIAL;
    this.modeStack = [];
  };

  TreeConstructor.prototype.pushNode = function (node) {
    this.node = node;
    this.nodeStack.push(node);
    return node;
  };

  TreeConstructor.prototype.popNode = function () {
    this.nodeStack.pop();
    return (this.node = this.nodeStack[ this.nodeStack.length - 1 ]);
  };

  TreeConstructor.prototype.pushMode = function (mode) {
    this.modeStack.push(this.mode);
    return (this.mode = mode);
  };

  TreeConstructor.prototype.popMode = function () {
    return this.mode = this.modeStack.pop();
  };

  TreeConstructor.prototype.insertText = function (data) {

    if (this.node.lastChild && Node.TEXT === this.node.lastChild.type) {
      this.node.lastChild.appendData(data);
      return this.node.lastChild;
    }

    return this.node.appendChild(
      this.parser.document.createText(data)
    );
  };

  TreeConstructor.prototype.insertComment = function (data) {
    return this.node.appendChild(
      this.parser.document.createComment(data)
    );
  };

  TreeConstructor.prototype.insertElement = function (name, startPointer) {
    // console.log('Inserting ', name, 'into', this.node.name);
    var newNode = this.parser.document.createElement(name);
    this.node.appendChild(newNode);

    // Set `document.documentElement`
    if ('html' === name) {
      this.parser.document.documentElement = newNode;
    }

    // Set `document.head`
    if ('head' === name) {
      this.parser.document.head = newNode;
    }

    // Set `document.body`
    if ('body' === name) {
      this.parser.document.body = newNode;
    }

    newNode.startPointer = startPointer;

    return this.pushNode(newNode);
  };

  TreeConstructor.prototype.insertAttr = function (name) {
    var newNode = this.parser.document.createAttr(name);
    this.node.appendAttr(newNode);
    return this.pushNode(newNode);
  };

  TreeConstructor.prototype.process = function (token) {

    console.log(
      'Token:', token.type.toUpperCase().replace(' ', '_').replace(' ', '_').replace(' ', '_').replace(' ', '_'), 
      'State:', (this.parser.tokenizer.state ? this.parser.tokenizer.state.toUpperCase().replace(' ', '_').replace(' ', '_').replace(' ', '_').replace(' ', '_') : ''),
      'Mode:', (this.parser.treeConstructor.mode ? this.parser.treeConstructor.mode.toUpperCase().replace(' ', '_').replace(' ', '_').replace(' ', '_').replace(' ', '_') : '')
    );

    // console.log('TOKEN', token, 'MODE', this.mode);
    // alert('received token');
    // return;

    if (undefined == this.mode) {
      throw new Error('TreeConstructor needs a mode');
    }

    
    switch (this.mode) {

      case TreeConstructor.INITIAL:
        this.mode = TreeConstructor.BEFORE_HTML;
        this.process(token);
        break;

      case TreeConstructor.BEFORE_HTML:
        switch (true) {

          case Token.TEXT === token.type && util.whitespace(token.data):
            this.insertText(token.data);
            break; // Ignore

          case Token.START_TAG_CLOSE === token.type:
            this.mode = TreeConstructor.BEFORE_HEAD;
            console.log('>');
            break;

          case Token.START_TAG === token.type && 'html' === token.name:
            this.insertElement('html', token.start);
            console.log('<' + this.node.name);
            break;

          case Token.ATTR_KEY === token.type:
            if (this.node.mayHaveAttribute(token.name)) {
              console.log(token.name+'=');
              this.insertAttr(token.name);
              this.pushMode(TreeConstructor.ATTR);
            } else {
              throw new Error('The '+this.node.name+' element may not have the `'+token.name+'` attribute');
            }
            break;
          
          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            this.insertElement('html', token.start);
            this.mode = TreeConstructor.BEFORE_HEAD;
            this.process(token);
            break;
        }
        break;

      case TreeConstructor.BEFORE_HEAD:
        switch (true) {

          case Token.TEXT === token.type && util.whitespace(token.data):
            this.insertText(token.data);
            break;

          // case Token.ATTR_KEY === token.type:
          //   this.insertAttr(token.name);
          //   this.pushMode(TreeConstructor.ATTR);
          //   break;

          case Token.START_TAG_CLOSE === token.type:
            this.mode = TreeConstructor.IN_HEAD;
            console.log('>');
            break;

          case Token.START_TAG === token.type && 'head' === token.name:
            this.insertElement('head', token.start);
            console.log('<' + this.node.name);
            break;

          case Token.ATTR_KEY === token.type:
            console.log(token.name+'=');
            this.insertAttr(token.name);
            this.pushMode(TreeConstructor.ATTR);
            break;
          
          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            this.insertElement('head', token.start);
            this.mode = TreeConstructor.IN_HEAD;
            this.process(token);
            break;
        }
        break;

      case TreeConstructor.IN_HEAD:
        switch (true) {

          case Token.TEXT === token.type && util.whitespace(token.data):
            this.insertText(token.data);
            break;

          case Token.START_TAG === token.type && this.node.mayContain(token.name):
            this.insertElement(token.name, token.start);
            console.log('<' + this.node.name);
            break;

          case Token.END_TAG === token.type && 'head' === this.node.name:
            console.log('</'+this.node.name+'>');
            this.node.endPointer = token.end;
            this.popNode();
            this.mode = TreeConstructor.AFTER_HEAD;
            break;

          case Token.END_TAG === token.type:
            console.log('</'+this.node.name+'>');
            this.node.endPointer = token.end;
            this.popNode();
            break;

          case Token.START_TAG_CLOSE === token.type:
            console.log('>');
            if (this.node.mayContainTextOnly()) {
              this.parser.tokenizer.state = Tokenizer.PLAINTEXT;
              this.pushMode(TreeConstructor.PLAINTEXT);
            }
            break;

          case Token.ATTR_KEY === token.type:
            console.log(token.name+'=');
            this.insertAttr(token.name);
            this.pushMode(TreeConstructor.ATTR);
            break;
          
          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            this.popNode();
            this.mode = TreeConstructor.AFTER_HEAD;
            this.process(token);
            break;
        }
        break;

      case TreeConstructor.AFTER_HEAD:
        switch (true) {

          case Token.TEXT === token.type && util.whitespace(token.data):
            this.insertText(token.data);
            break;

          case Token.START_TAG_CLOSE === token.type:
            this.mode = TreeConstructor.IN_BODY;
            console.log('>');
            break;

          case Token.START_TAG === token.type && 'body' === token.name:
            this.insertElement('body', token.start);
            console.log('<' + this.node.name);
            break;

          case Token.ATTR_KEY === token.type:
            console.log(token.name+'=');
            this.insertAttr(token.name);
            this.pushMode(TreeConstructor.ATTR);
            break;

          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            this.insertElement('body', token.start);
            console.log('<' + this.node.name + '>');
            this.mode = TreeConstructor.IN_BODY;
            this.process(token);
            break;
        }
        break;

      case TreeConstructor.IN_BODY:
        switch (true) {

          case Token.TEXT === token.type:
            this.insertText(token.data);
            break;

          case Token.START_TAG === token.type:
            if (this.node.mayContain(token.name)) {
              this.insertElement(token.name, token.start);
              console.log('<' + this.node.name);
            } else {
              this.parser.error('The &lt;'+this.node.name+'&gt; element cannot contain &lt;'+token.name+'&gt; elements');
            }
            break;

          // case Token.START_TAG === token.type && this.node.mayContain(token.name):
          //   this.insertElement(token.name);
          //   console.log('<' + this.node.name);
          //   break;

          case Token.START_TAG_CLOSE === token.type:
            console.log('>');
            this.node.innerStartPointer = token.innerStartPointer;
            if (this.node.isVoidElement()) {
              // alert(1);
              this.popNode();
            }
            break; // Ignore

          case Token.END_TAG === token.type && 'body' === token.name:
            console.log('</'+this.node.name+'>');
            this.node.innerEndPointer = token.innerEndPointer;
            this.node.endPointer = token.end;
            this.popNode();
            this.mode = TreeConstructor.AFTER_BODY;
            break;

          case Token.END_TAG === token.type && 'html' === token.name:
            console.log('</'+this.node.name+'>');
            this.node.innerEndPointer = token.innerEndPointer;
            this.node.endPointer = token.end;
            this.popNode();
            this.mode = TreeConstructor.AFTER_BODY;
            this.process(token);
            break;

          case Token.END_TAG === token.type:
            console.log('</'+this.node.name+'>');
            this.node.innerEndPointer = token.innerEndPointer;
            this.node.endPointer = token.end;
            this.popNode();
            break;

          // case Token.ATTR_KEY === token.type:
          //   this.insertAttr(token.name);
          //   break;

          case Token.ATTR_KEY === token.type:
            console.log(token.name+'=');
            this.insertAttr(token.name);
            this.pushMode(TreeConstructor.ATTR);
            break;
          
          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            this.popNode();
            this.mode = TreeConstructor.AFTER_BODY;
            this.process(token);
            break;
        }
        break;

      case TreeConstructor.AFTER_BODY:
        switch (true) {

          case Token.TEXT === token.type && util.whitespace(token.data):
            this.insertText(token.data);
            break;

          case Token.TEXT === token.type:
            this.mode = TreeConstructor.AFTER_HTML;
            this.process(token);
            break;

          case Token.END_TAG === token.type:
            console.log('</'+this.node.name+'>');
            this.node.endPointer = token.end;
            this.popNode();
            break;

          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            console.log('</'+this.node.name+'>');
            this.popNode();
            this.mode = TreeConstructor.AFTER_HTML;
            this.process(token);
            break;
        }
        break;

      case TreeConstructor.AFTER_HTML:
        switch (true) {

          case Token.TEXT === token.type && util.whitespace(token.data):
            break; // Ignore

          case Token.EOF === token.type:
            console.log('CONSTRUCTION COMPLETE');
            break;

          case Token.COMMENT === token.type:
            this.insertComment(token.data);
            break;

          default:
            this.parser.error('Unexpected token after html: '+token.type.toUpperCase().replace(' ', '_'));
            break;
        }
        break;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      case TreeConstructor.ATTR:
        switch (true) {

          case Token.TEXT === token.type:
            console.log('"'+token.data+'"');
            this.insertText(token.data);
            break;

          case Token.END_ATTR === token.type:
            this.popMode();
            this.popNode();
            break;

          default:
            this.parser.error('Unexpected token in attribute: '+token.type.toUpperCase().replace(' ', '_'));
            break;
        }
        break;

      case TreeConstructor.PLAINTEXT:
        switch (true) {

          case Token.TEXT === token.type:
            this.insertText(token.data);
            break;

          case Token.END_TAG === token.type:
            this.popMode();
            this.process(token);
            break;

          default:
            this.parser.error('Unexpected token in plaintext: '+token.type.toUpperCase().replace(' ', '_'));
            break;
        }
        break;

      default:
        this.parser.error('Unexpected tree constructor mode: '+this.mode);
        break;
    }
  };

  core.TreeConstructor = TreeConstructor;

}(
  window.structure,
  window.structure.Token,
  window.structure.Tokenizer,
  window.structure.Node,
  window.structure.util
));
