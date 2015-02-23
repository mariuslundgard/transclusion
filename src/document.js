function Document(input) {
  transclusion.Node.call(this, transclusion.Node.NODE_DOCUMENT, '#document');
  this.debug = false;
  this.input = input || '';
  this.parser = null;
  this.compiler = null;
  this.directives = [];
  this.reset();
}

Document.prototype = Object.create(transclusion.Node.prototype);
Document.prototype.constructor = Document;

// exports
transclusion.Document = Document;

Document.prototype.addDirective = function(name, params) {
  var directive = new transclusion.ElementDirective(name, params);
  this.directives.push(directive);
  return directive;
};

Document.prototype.setInput = function (input) {
  if (input !== this.input) {
    this.input = input;
    this.reset();
  }
};

Document.prototype.reset = function () {
  if (this.parser) {
    this.parser.reset();
  }
  this.context = {
    test: 'Hello, world!'
  };
  this.childNodes = [];
  this.attrs = [];
  this.firstChild = null;
  this.lastChild = null;
  this.outerStartOffset = null;
  this.outerEndOffset = null;
  this.innerStartOffset = null;
  this.innerEndOffset = null;
  this.documentElement = null;
  this.titleElement = null;
  this.body = null;
  this.isParsed = false;
  this.isCompiled = false;
  this.output = null;
};

Document.prototype.createElement = function (name) {
  var node = new transclusion.nodes.Element(name);
  node.setDocument(this);
  switch (name) {
    case 'html':
      if (this.documentElement) {
        throw new Error('The <html> element already exists');
      }
      this.documentElement = node;
      break;
    case 'body':
      if (this.body) {
        throw new Error('The <body> element already exists');
      }
      this.body = node;
      break;
    case 'title':
      if (this.titleElement) {
        throw new Error('The <title> element already exists');
      }
      this.titleElement = node;
      break;
  }
  return node;
};

Document.prototype.createText = function (data) {
  var node = new transclusion.nodes.Text(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createComment = function (data) {
  var node = new transclusion.nodes.Comment(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createAttr = function (name) {
  var node = new transclusion.nodes.Attr(name);
  node.setDocument(this);
  return node;
};

Document.prototype.createArray = function (name) {
  var node = new transclusion.nodes.Arr(name);
  node.setDocument(this);
  return node;
};

Document.prototype.createString = function (data) {
  var node = new transclusion.nodes.Str(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createExpr = function () {
  var node = new transclusion.nodes.Expr();
  node.setDocument(this);
  return node;
};

Document.prototype.createVar = function (name) {
  var node = new transclusion.nodes.Var(name);
  node.setDocument(this);
  return node;
};

Document.prototype.createNumber = function (name) {
  var node = new transclusion.nodes.Num(name);
  node.setDocument(this);
  return node;
};

Document.prototype.createOperator = function (sign) {
  var node = new transclusion.nodes.Operator(sign);
  node.setDocument(this);
  return node;
};

Document.prototype.getParser = function () {
  if (null === this.parser) {
    this.parser = new transclusion.Parser(this);
  }
  return this.parser;
};

Document.prototype.getCompiler = function () {
  if (null === this.compiler) {
    this.compiler = new transclusion.Compiler(this);
  }
  return this.compiler;
};

Document.prototype.parse = function () {
  if (! this.isParsed) {
    this.getParser().parse(this.input);
    this.isParsed = true;
  }
};

Document.prototype.compile = function (input) {
  if (input) {
    this.setInput(input);
  }
  if (! this.isCompiled) {
    this.parse();
    this.output = this.getCompiler().compile();
    this.isCompiled = true;
  }
  return this.output;
};
