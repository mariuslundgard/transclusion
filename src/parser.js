
/*
(function (core, Document, CharStream, Tokenizer, TreeConstructor) {
  
  var Parser = function (options) {
    this.initialize(options);
  };

  Parser.prototype.initialize = function (options) {
    this.options = options || {};
    this.options.sendEOF = (undefined === this.options.sendEOF); // Defaults to TRUE

    if (this.options.document) {
      this.document = this.options.document;
    }
  };

  Parser.prototype.parse = function (input) {

    this.document        = this.document ? this.document : new Document();
    this.stream          = new CharStream(input, { sendEOF: this.options.sendEOF });
    this.tokenizer       = new Tokenizer(this);
    this.treeConstructor = new TreeConstructor(this);

    this.stream.consume(
      this.tokenizer.process.bind(this.tokenizer)
    );

    return this.document;
  };

  Parser.prototype.error = function (message) {
    var err = new Error('Parse error: '+message);
    
    err.tokenizerState = this.treeConstructor.state;
    err.treeConstructorMode = this.tokenizer.mode;

    throw err;
  };

  Parser.prototype.notice = function (message) {
    var err = new Error('Parse notice: '+message);
    
    err.tokenizerState = this.treeConstructor.state;
    err.treeConstructorMode = this.tokenizer.mode;
  };

  core.Parser = Parser;
}(
  window.structure,
  window.structure.Document,
  window.structure.CharStream,
  window.structure.Tokenizer,
  window.structure.TreeConstructor
));

*/
