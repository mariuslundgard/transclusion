;(function(root, Structure, undefined){
  'use strict';

  var CharStream = function(str, options) {
    this.initialize.call(this, str, options);
  };

  CharStream.prototype.line = null;
  CharStream.prototype.column = null;

  CharStream.prototype.initialize = function(input, options)
  {
    this.pointer = 0;
    this.size = input.length;
    this.input = input;
    this.line = 1;
    this.column = 1;

    //
    this.options = options || {};
    this.options.sendEOF = (undefined === this.options.sendEOF); // Defaults to TRUE
  };

  CharStream.prototype.consume = function(fn)
  {
    var chr;

    // Let the callback process the input character by character
    while (this.pointer < this.size) {
      chr = this.input[this.pointer++];
      this.column++;
      if ("\n" == chr) {
        this.line++;
        this.column = 1;
      }
      fn(chr);
    }

    // Send EOF character (-1)
    if (this.options.sendEOF) {
      fn(-1);
    }
  };

  // Export
  root.Structure.CharStream = CharStream;
  
}(this, this.Structure));
