define([
  "./compiler"
], function (Compiler) {
  "use strict";

  var Structure = {
    compiler: new Compiler()
  };

  return Structure;
});
