(function (exports) {
  exports.structure || (exports.structure = {});
  exports.structure.CharTester = {
    isWhiteSpace: function (chr) {
      return '\n' === chr;
    },
    isUpperCase: function (chr) {
      return 'A' <= chr && chr <= 'Z';
    },
    isLowerCase: function (chr) {
      return 'a' <= chr && chr <= 'z';
    },
    isNumber: function(chr) {
      return '0' <= chr && chr <= '9';
    },
    isAlpha: function(chr){
      return this.isUpperCase(chr) || this.isLowerCase(code);
    },
  };
})(this);
