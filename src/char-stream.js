(function (core) {

  var CharStream = function (str, options) {
    this.initialize(str, options);
  };

  CharStream.prototype.line = null;
  CharStream.prototype.column = null;

  CharStream.prototype.initialize = function (input, options) {
    this.pointer = 0;
    this.size = input.length;
    this.input = input;
    this.line = 1;
    this.column = 1;

    this.options = options || {};
    this.options.sendEOF = (undefined === this.options.sendEOF); // Defaults to TRUE
  };

  CharStream.prototype.shift = function (num) {
    this.pointer += num;
  };

  CharStream.prototype.next = function (num) {
    if (undefined === num) {
      num = 1;
    }

    return this.input.substr(this.pointer, num);
  };

  CharStream.prototype.consume = function (fn) {
    var chr;

    while (this.pointer < this.size) {
      chr = this.input.charAt(this.pointer++);
      
      this.column++;

      if ('\n' === chr) {
        this.line++;
        this.column = 1;
      }

      // Let the callback process the input character by character
      fn(chr);
    }

    if (this.options.sendEOF) {
      fn( -1 );
    }
  };

  core.CharStream = CharStream;
}(
  window.structure
));
