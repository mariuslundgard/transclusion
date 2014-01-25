// define([
//   './core'
// ], function(Structure) {
(function (core) {

  core.util = {};

  core.util.copy = function (prototype) {
    var c, obj = {};
    for (c in prototype) {
      obj[c] = prototype[c];
    }
    return obj;
  };

  core.util.uppercase = function (chr) {
    return 'A' <= chr && chr <= 'Z';
  };

  core.util.lowercase = function (chr) {
    return 'a' <= chr && chr <= 'z';
  };

  core.util.num = function (chr) {
    return '0' <= chr && chr <= '9';
  };

  core.util.alpha = function (chr) {
    return core.util.uppercase(chr) || core.util.lowercase(chr);
  };

  core.util.whitespace = function (chr) {
    return -1 < [ '\n', '\t', '\r', ' ' ].indexOf(chr);
  };

}(
  window.structure
));
