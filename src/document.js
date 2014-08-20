function Document(input) {
  structure.Node.call(this, structure.Node.NODE_DOCUMENT, '#document');
  this.debug = false;
  this.input = input || '';
  this.parser = null;
  this.compiler = null;
  this.reset();
}

Document.prototype = Object.create(structure.Node.prototype);
Document.prototype.constructor = Document;

// exports
structure.Document = Document;

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
  var node = new structure.nodes.Element(name);
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
  var node = new structure.nodes.Text(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createComment = function (data) {
  var node = new structure.nodes.Comment(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createAttr = function (name) {
  var node = new structure.nodes.Attr(name);
  node.setDocument(this);
  return node;
};

Document.prototype.getParser = function () {
  if (null === this.parser) {
    this.parser = new structure.Parser(this);
  }
  return this.parser;
};

Document.prototype.getCompiler = function () {
  if (null === this.compiler) {
    this.compiler = new structure.Compiler(this);
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
