function CharStream(input) {
  this.input = input ? input.replace(/(\r\n|\n|\r)/gm,'\n') : '';
  this.size = this.input.length;
  this.pointer = 0;
  this.line = 1;
  this.column = 1;
}

// exports
structure.CharStream = CharStream;

CharStream.prototype = {
  getPointer: function () {
    return this.pointer;
  },

  getSize: function () {
    return this.size;
  },

  getLine: function () {
    return this.line;
  },

  getColumn: function () {
    return this.column;
  },

  consume: function (len) {
    var ret = '', chr, i = 0;

    if (undefined === len) {
      len = 1;
    }

    while (i < len) {
      if (this.pointer < this.getSize()) {
        chr = this.input.charAt(this.pointer);
        if ('\n' === chr) {
          this.line++;
          this.column = 0;
        }
        ret += chr;
        this.column++;
        this.pointer++;
      }
      i++;
    }

    if (ret.length) {
      return ret;
    }

    return -1;
  },

  next: function (len) {
    var ret = '',
        index = 0;

    if (undefined === len) {
      len = 1;
    }

    while (index < len) {
      if ((this.pointer + index) < this.getSize()) {
        ret += this.input.charAt(this.pointer + index);
      }
      index++;
    }

    if (0 === ret.length) {
      return -1;
    }

    return ret;
  },

  shift: function (len) {
    var i = 0,
        chr;

    if (undefined === len) {
      len = 1;
    }

    while (i < len) {
      chr = this.next();
      
      if ('\n' === chr) {
        this.line++;
        this.column = 0;
      }

      this.column++;
      this.pointer++;
      i++;
    }
  }
};
