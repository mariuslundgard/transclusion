/*!
 * Structure.js v0.1.0alpha (http://mariuslundgard.com/structure.js/)
 * Copyright 2014 Marius Lundgård
 * Licensed under @LICENSE_URL
 */

(function(root) {


  var Structure = {};

  Structure.version = '0.1.0alpha';


  Structure.Node = function (type, name) {
    this.initialize(type, name);
  };

  Structure.Node.DOCUMENT = 0;
  Structure.Node.TEXT     = 1;
  Structure.Node.ELEMENT  = 2;
  // Structure.Node.DOCUMENT = 0;

  Structure.Node.prototype.initialize = function (type, name) {
    this.type = type;
    this.name = name;
  };

  Structure.Node.prototype.appendChild = function (node) {
    this.childNodes.push(node);
  };


  Structure.Compiler = function (options) {
    this.initialize(this, options);
  };

  Structure.Compiler.prototype.initialize = function (options) {
    options || (options = {});
  };
  
  Structure.Compiler.prototype.compile = function (document) {
    return compileNodes([ '&lt;!DOCTYPE html&gt;\n' ], document.childNodes).join('');
  };

  function compileNodes(cache, nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
        cache = compileNode(cache, nodeList[i]);
    }
    return cache;
  }

  function compileNode(cache, node)
  {
    switch (node.type) {

      case Structure.Node.TEXT:
        if ('<' === node.data) {
          cache.push('&lt;');
        } else if ('>' === node.data) {
          cache.push('&gt;');
        } else {
          cache.push(node.data);
        }
        break;

      case Structure.Node.ELEMENT:
        cache.push('&lt;', node.name);
        cache = compileNodes(cache, node.attrs);
        cache.push('&gt;');
        cache = compileNodes(cache, node.childNodes);
        cache.push('&lt;/', node.name, '&gt;');
        break;

      case Structure.Node.ATTR:
        cache.push(' ', node.name, '=\"');
        // cache = compileNodes(cache, node.childNodes);
        cache.push('\"');
        break;

      default:
        throw new Error('Compile error: unknown node type: '+node.type);
    }

    return cache;
  }


  Structure.copy = function (prototype) {
    var c, obj = {};
    for (c in prototype) {
      obj[c] = prototype[c];
    }
    return obj;
  };

  Structure.uppercase = function (chr) {
    return 'A' <= chr && chr <= 'Z';
  };

  Structure.lowercase = function (chr) {
    return 'a' <= chr && chr <= 'z';
  };

  Structure.alpha = function (chr) {
    return Structure.uppercase(chr) || Structure.lowercase(chr);
  };

  Structure.whitespace = function (chr) {
    return 0 <= [ '\n', '\t', '\r', ' ' ].indexOf(chr);
  };


  Structure.Document = function () {
    this.initialize(Structure.Node.DOCUMENT, '#document');
  };

  Structure.Document.prototype = Structure.copy(Structure.Node.prototype);
  Structure.Document.prototype.constructor = Structure.Document;

  Structure.Document.prototype.createElement = function (name) {
    var node = new Structure.Element(name);
    node.setDocument(this);
    return node;
  };

  Structure.Document.prototype.createText = function (data) {
    var node = new Structure.Text(data);
    node.setDocument(this);
    return node;
  };

  Structure.Document.prototype.createAttr = function (name) {
    var node = new Structure.Attr(name);
    node.setDocument(this);
    return node;
  };


  Structure.CharStream = function (str, options) {
    this.initialize(str, options);
  };
  Structure.CharStream.prototype.line = null;
  Structure.CharStream.prototype.column = null;

  Structure.CharStream.prototype.initialize = function (input, options) {
    this.pointer = 0;
    this.size = input.length;
    this.input = input;
    this.line = 1;
    this.column = 1;

    //
    this.options = options || {};
    this.options.sendEOF = (undefined === this.options.sendEOF); // Defaults to TRUE
  };

  Structure.CharStream.prototype.consume = function (fn) {
    var chr;

    // Let the callback process the input character by character
    while (this.pointer < this.size) {
      chr = this.input[this.pointer++];
      this.column++;
      if ('\n' === chr) {
        this.line++;
        this.column = 1;
      }
      fn(chr);
    }

    // Send EOF character (-1)
    if (this.options.sendEOF) {
      fn( -1 );
    }
  };


  Structure.Token = {
    TEXT            : 'text',
    START_TAG       : 'start tag',
    END_TAG         : 'end tag',
    ATTR_KEY        : 'attr key',
    ATTR_VALUE      : 'attr value',
    END_ATTR        : 'end attr',
    START_TAG_CLOSE : 'start tag close',
    EOF             : 'eof',
  };

  Structure.Tokenizer = function (parser) {
    this.initialize(parser);
    return this;
  };

  // Tokenizer states
  Structure.Tokenizer.DATA              = 'data';
  Structure.Tokenizer.TAG_OPEN          = 'tag open';
  Structure.Tokenizer.TAG_NAME          = 'tag name';
  Structure.Tokenizer.END_TAG_NAME      = 'end tag name';
  Structure.Tokenizer.BEFORE_ATTR_KEY   = 'before attr key';
  Structure.Tokenizer.ATTR_KEY          = 'attr key';
  Structure.Tokenizer.BEFORE_ATTR_VALUE = 'before attr value';
  Structure.Tokenizer.ATTR_VALUE        = 'attr value';
  Structure.Tokenizer.AFTER_ATTR        = 'after attr';

  Structure.Tokenizer.prototype.initialize = function (parser) {
    this.parser = parser;
    this.state = this.DATA;
    this.token = null;
    this.attrDelimiter = null;
  };

  Structure.Tokenizer.prototype.process = function (chr) {
    return;
    
    // console.log(this.state, chr);
    switch (this.state) {

      case this.DATA:
        switch (true) {

          case '<' === chr:
            this.TAG_OPEN;
            break;

          case -1 === chr:
            this.emit({
              type: Structure.Token.EOF
            });
            break;

          default:
            this.emit({
              type: Structure.Token.TEXT,
              data: chr
            });
            // this.parser.error('Unexpected character in data: '+chr);
            break;
        }
        break;

      case this.TAG_OPEN:
        switch (true) {

          case Structure.alpha(chr):
            this.token = {
              type: Structure.Token.START_TAG,
              name: chr,
            };
            this.TAG_NAME;
            break;

          case '/' === chr:
            this.token = {
              type: Structure.Token.END_TAG,
              name: '',
            };
            this.state = this.END_TAG_NAME;
            break;

          case -1 === chr:
            this.parser.error('Unexpected EOF in tag open');
            break;

          default:
            this.parser.error('Unexpected character in tag open: '+chr);
            break;
        }
        break;

      case this.TAG_NAME:
        switch (true) {
          case Structure.alpha(chr):
            this.token.name += chr;
            break;

          case Structure.whitespace(chr):
            this.emit();
            this.state = this.BEFORE_ATTR_KEY;
            break;

          case '>' === chr:
            this.emit();
            this.state = this.BEFORE_ATTR_KEY;
            this.process(chr);
            break;

          case -1 === chr:
            // this.parser.error('Unexpected EOF in tag name');
            this.emit();
            this.state = this.DATA;
            this.process(chr);
            break;

          default:
            this.parser.error('Unexpected character in tag name: '+chr);
            break;
        }
        break;

      case this.END_TAG_NAME:
        switch (true) {

          case Structure.alpha(chr):
            this.token.name += chr;
            break;

          case '>' === chr:
            this.emit();
            this.state = this.DATA;
            break;

          default:
            this.parser.error('Unexpected character in end tag name: '+chr);
            break;
        }
        break;

      case this.BEFORE_ATTR_KEY:
        switch (true) {

          case Structure.whitespace(chr):
            break; // Ignore

          case Structure.alpha(chr):
            this.token = {
              type: Structure.Token.ATTR_KEY,
              name: chr,
            };
            this.state = this.ATTR_KEY;
            break;

          case '>' === chr:
            this.emit({
              type: Structure.Token.START_TAG_CLOSE
            });
            this.state = this.DATA;
            break;

          default:
            this.parser.error('Unexpected character before attribute key: '+chr);
            break;
        }
        break;

      case this.ATTR_KEY:
        switch (true) {
          case Structure.alpha(chr):
            this.token.name += chr;
            break;

          case '=' === chr:
            this.emit();
            this.state = this.BEFORE_ATTR_VALUE;
            break;

          default:
            this.parser.error('Unexpected character in attribute key: '+chr);
            break;
        }
        break;

      case this.BEFORE_ATTR_VALUE:
        switch (true) {

          case Structure.whitespace(chr):
            break; // Ignore

          case '"' === chr:
          case '\'' === chr:
            this.attrDelimiter = chr;
            this.state = this.ATTR_VALUE;
            this.token = {
              type: Structure.Token.TEXT,
              data: '',
            };
            break;

          default:
            this.parser.error('Unexpected character before attribute value: '+chr);
            break;
        }
        break;

      case this.ATTR_VALUE:
        switch (true) {
          case this.attrDelimiter === chr:
            this.emit();
            this.emit({
              type: Structure.Token.END_ATTR,
            });
            this.state = this.AFTER_ATTR;
            break;

          default:
            this.token.data += chr;
            break;
        }
        break;

      case this.AFTER_ATTR:
        switch (true) {
          case Structure.whitespace(chr):
            this.state = this.BEFORE_ATTR_KEY;
            break;

          case '>' === chr:
            this.state = this.BEFORE_ATTR_KEY;
            this.process(chr);
            break;

          default:
            this.parser.error('Unexpected character after attribute: '+chr);
            break;
        }
        break;

      default:
        this.parser.error('Unexpected tokenizer state: '+this.state.toUpperCase().replace(' ', '_'));
        break;
    }
  };

  Structure.Tokenizer.prototype.emit = function (token) {
    if (this.token) {
      token = this.token;
    }
    console.log('State:', token.type, 'Mode:', this.parser.treeConstructor.mode);
    this.parser.treeConstructor.process(token);
    this.token = null;
  };



  Structure.TreeConstructor = function (parser) {
    this.initialize(parser);
  };

  Structure.TreeConstructor.INITIAL     = 'initial';
  Structure.TreeConstructor.BEFORE_HTML = 'before html';
  Structure.TreeConstructor.BEFORE_HEAD = 'before head';
  Structure.TreeConstructor.IN_HEAD     = 'in head';
  Structure.TreeConstructor.AFTER_HEAD  = 'after head';
  Structure.TreeConstructor.IN_BODY     = 'in body';
  Structure.TreeConstructor.AFTER_BODY  = 'after body';
  Structure.TreeConstructor.AFTER_HTML  = 'after html';
  Structure.TreeConstructor.ATTR        = 'attr';

  Structure.TreeConstructor.prototype.parser = null;
  Structure.TreeConstructor.prototype.node = null;
  Structure.TreeConstructor.prototype.nodeStack = null;
  Structure.TreeConstructor.prototype.mode = null;

  Structure.TreeConstructor.prototype.initialize = function (parser) {
    this.parser = parser;
    this.node = parser.document;
    this.nodeStack = [ this.node ];
    this.mode = this.INITIAL;
    this.modeStack = [];
  };

  Structure.TreeConstructor.prototype.pushNode = function (node) {
    this.node = node;
    this.nodeStack.push(node);
    return node;
  };

  Structure.TreeConstructor.prototype.popNode = function () {
    this.nodeStack.pop();
    return (this.node = this.nodeStack[ this.nodeStack.length - 1 ]);
  };

  Structure.TreeConstructor.prototype.pushMode = function (mode) {
    this.modeStack.push(this.mode);
    return this.mode = mode;
  };

  Structure.TreeConstructor.prototype.popMode = function () {
    return this.mode = this.modeStack.pop();
  };

  Structure.TreeConstructor.prototype.insertText = function (data) {
    return this.node.appendChild(
      this.parser.document.createText(data)
    );
  };

  Structure.TreeConstructor.prototype.insertElement = function (name) {
    // console.log('Inserting ', name, 'into', this.node.name);
    var newNode = this.parser.document.createElement(name);
    this.node.appendChild(newNode);
    return this.pushNode(newNode);
  };

  Structure.TreeConstructor.prototype.insertAttr = function (name) {
    var newNode = this.parser.document.createAttr(name);
    this.node.appendAttr(newNode);
    return this.pushNode(newNode);
  };

  Structure.TreeConstructor.prototype.process = function (token) {
    return;
    
    switch (this.mode) {

///////////INITIAL
      case this.INITIAL:
        this.mode = this.BEFORE_HTML;
        this.process(token);
        break;

///////////BEFORE_HTML
      case this.BEFORE_HTML:
        switch (true) {

          case this.TEXT === token.type && Structure.whitespace(token.data):
            // this.insertText(token.data);
            break; // Ignore

          // case this.ATTR_KEY === token.type:
          //   this.insertAttr(token.name);
          //   this.pushMode(ATTR);
            // break;

          case this.START_TAG_CLOSE === token.type:
            this.mode = this.BEFORE_HEAD;
            break;

          case this.ATTR_KEY === token.type:
            this.insertAttr(token.name);
            break;

          

          default:
            if (this.START_TAG === token.type && 'html' === token.name) {
              this.insertElement(token.name);
            } else {
              this.insertElement('html');
              this.mode = this.BEFORE_HEAD;
              this.process(token);
            }
            break;
        }
        break;

///////////BEFORE_HEAD
      case this.BEFORE_HEAD:
        switch (true) {

          // case this.TEXT === token.type:
          //   this.mode = this.IN_HEAD;
          //   this.process(token);
          //   break;

          default:
            this.insertElement('head');
            this.mode = this.IN_HEAD;
            this.process(token);
            break;
        }
        break;
      case this.IN_HEAD:
        switch (true) {

          // case this.TEXT === token.type:
          //   this.mode = this.AFTER_HEAD;
          //   this.process(token);
          //   break;

          default:
            this.popNode();
            this.mode = this.AFTER_HEAD;
            this.process(token);
            break;
        }
        break;
      case this.AFTER_HEAD:
        switch (true) {

          // case this.TEXT === token.type:
          //   this.mode = this.AFTER_HEAD;
          //   this.process(token);
          //   break;

          default:
            this.insertElement('body');
            this.mode = this.IN_BODY;
            this.process(token);
            break;
        }
        break;

      case this.IN_BODY:
        switch (true) {

          case this.TEXT === token.type:
            this.insertText(token.data);
            break;

          case this.START_TAG === token.type:
            this.insertElement(token.name);
            break;

          case this.START_TAG_CLOSE === token.type:
            break; // Ignore

          case this.END_TAG === token.type:
            this.popNode();
            // console.log(token);
            if ('body' === token.name) {
              this.popNode();
              this.mode = this.AFTER_BODY;
              // alert('end tag');
            }
            break;

          case this.ATTR_KEY === token.type:
            this.insertAttr(token.name);
            break;

          default:
            this.popNode();
            this.mode = this.AFTER_BODY;
            this.process(token);
            break;
        }
        break;

      case this.AFTER_BODY:
        switch (true) {

          // case this.TEXT === token.type:
          //   this.mode = this.AFTER_HEAD;
          //   this.process(token);
          //   break;

          default:
            this.popNode();
            this.mode = this.AFTER_HTML;
            this.process(token);
            break;
        }
        break;

      case this.AFTER_HTML:
        switch (true) {

          // case this.TEXT === token.type:
          //   this.mode = this.AFTER_HEAD;
          //   this.process(token);
          //   break;

          case this.EOF === token.type:
            // console.log('CONSTRUCTION COMPLETE');
            break;

          default:
            this.parser.error('Unexpected token after html: '+token.type.toUpperCase().replace(' ', '_'));
            break;
        }
        break;

      case this.ATTR:
        switch (true) {

          case this.TEXT === token.type:
            this.insertText(token.data);
            break;

          case this.END_ATTR === token.type:
            this.popMode();
            break;

          default:
            this.parser.error('Unexpected token in attribute: '+token.type.toUpperCase().replace(' ', '_'));
            break;
        }
        break;

      default:
        this.parser.error('Unexpected tree constructor mode: '+this.mode);
        break;
    }
  };


  Structure.Parser = function (options) {
    this.initialize(options);
  };

  Structure.Parser.prototype.initialize = function (options) {
    this.options = options || {};
    this.options.sendEOF = (undefined === this.options.sendEOF); // Defaults to TRUE
  };

  Structure.Parser.prototype.parse = function (input) {
    this.document        = new Structure.Document();
    this.stream          = new Structure.CharStream(input, { sendEOF: this.options.sendEOF });
    this.tokenizer       = new Structure.Tokenizer(this);
    this.treeConstructor = new Structure.TreeConstructor(this);

    this.stream.consume(
      this.tokenizer.process.bind(this.tokenizer)
    );

    return this.document;
  };

  Structure.Parser.prototype.error = function (message) {
    var err = new Error('Parse error: '+message);
    
    err.tokenizerState = this.treeConstructor.state;
    err.treeConstructorMode = this.tokenizer.mode;

    throw err;
  };


  Structure.getCompiler = function () {
    if (!this.__compilerInstance) {
      this.__compilerInstance = new Structure.Compiler();
    }
    return this.__compilerInstance;
  };

  Structure.getParser = function () {
    if (!this.__parserInstance) {
      this.__parserInstance = new Structure.Parser();
    }
    return this.__parserInstance;
  };

  root.struc = function (input) {
    return Structure.getCompiler().compile(
      Structure.getParser().parse(input)
    );
  };

  root.Structure = Structure;

}(window || this));
