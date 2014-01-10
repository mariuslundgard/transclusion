;(function(root, Structure, undefined){
  'use strict';
  
  var Parser = function(options)
  {
    this.initialize.call(this, options);
  };

  Parser.prototype.initialize = function(options)
  {
    this.options = options || {};
    // this.options.sendEOF = (undefined === this.options.sendEOF); // Defaults to TRUE
  };

  Parser.prototype.parse = function(input)
  {
    this.document        = new Structure.Document();
    this.stream          = new Structure.CharStream(input, {sendEOF: this.options.sendEOF});
    this.tokenizer       = new Structure.Tokenizer(this);
    this.treeConstructor = new Structure.TreeConstructor(this);

    this.stream.consume(
      this.tokenizer.process.bind(this.tokenizer)
    );

    return this.document;
  };

  Parser.prototype.error = function(message)
  {
    var err = new Error('Parse error: '+message);
    
    err.tokenizerState = this.treeConstructor.state;
    err.treeConstructorMode = this.tokenizer.mode;

    throw err;
  };

  root.Structure.Parser = Parser;
  
}(this, this.Structure));
