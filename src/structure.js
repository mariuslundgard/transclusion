/* ============================================================================================
 * Bootstrap: structure.js v0.1.0
 * http://mariuslundgard.com/structure/intro
 * ============================================================================================
 * Copyright 2013-2014 Marius Lundgård
 * Licensed under MIT (https://github.com/mariuslundgard/structure.js/blob/master/LICENSE)
 * ============================================================================================ */


(function(core, Compiler, Parser) {
  'use strict';

  var getCompiler = function() {
    if (!core.__compiler) {
      core.__compiler = new Compiler();
    }
    return core.__compiler;
  };

  var getParser = function () {
    if (!core.__parser) {
      core.__parser = new Parser();
    }
    return core.__parser;
  };

  window.structure.compile = function (input) {
    var document = getParser().parse(input);
    return getCompiler().compile(document);
  };

  /*

  Usage:

  $('html').replace(structure.compile('<p>Hello, world!</p>'));

  Usage:

  var doc = new structure.Document('<p>Hello, world!</p>');
  $('body').html(doc.compile('body'));

  */

})(
  window.structure.core,
  window.structure.Compiler,
  window.structure.Parser
);
