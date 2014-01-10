/*!
 * Structure JavaScript Library v0.1.0alpha
 * http://mariuslundgard.com/structure.js
 *
 * Copyright 2005, 2014 Structure Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://mariuslundgard.com/structure.js/license
 *
 * Date: 2014-01-10T20:24Z
 */

(function ( global, factory ) {

  // if ( typeof module === "object" && typeof module.exports === "object" ) {
  //   // For CommonJS and CommonJS-like environments where a proper window is present,
  //   // execute the factory and get Structure
  //   // For environments that do not inherently posses a window with a document
  //   // (such as Node.js), expose a Structure-making factory as module.exports
  //   // This accentuates the need for the creation of a real window
  //   // e.g. var Structure = require("jquery")(window);
  //   // See ticket #14549 for more info
  //   module.exports = global.document ?
  //     factory( global, true ) :
  //     function ( w ) {
  //       if ( !w.document ) {
  //         throw new Error( "Structure requires a window with a document" );
  //       }
  //       return factory( w );
  //     };
  // } else {
  //   factory( global );
  // }

  factory(global);

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function ( window ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
// 


  

  var Compiler = {};
  // Structure.Compiler

  // Structure.Compiler = function (options) {
  //   this.initialize.call(this, options);
  // };

  // Structure.Compiler.prototype.initialize = function (options) {
  //   options || (options = {});
  // };
  
  // Structure.Compiler.prototype.compile = function (document) {
  //   return compileNodes(["&lt;!DOCTYPE html&gt;\n"], document.childNodes).join("");
  // };

  // function compileNodes(cache, nodeList) {
  //   for (var i = 0; i < nodeList.length; i++) {
  //       cache = compileNode(cache, nodeList[i]);
  //   }
  //   return cache;
  // }

  // function compileNode(cache, node)
  // {
  //   switch (node.type) {

  //     case Node.TEXT:
  //       if ("<" === node.data) {
  //         cache.push("&lt;");
  //       } else if (">" === node.data) {
  //         cache.push("&gt;");
  //       } else {
  //         cache.push(node.data);
  //       }
  //       break;

  //     case Node.ELEMENT:
  //       cache.push("&lt;", node.name);
  //       cache = compileNodes(cache, node.attrs);
  //       cache.push("&gt;");
  //       cache = compileNodes(cache, node.childNodes);
  //       cache.push("&lt;/", node.name, "&gt;");
  //       break;

  //     case Node.ATTR:
  //       cache.push(" ", node.name, "=\"");
  //       // cache = compileNodes(cache, node.childNodes);
  //       cache.push("\"");
  //       break;

  //     default:
  //       throw new Error("Compile error: unknown node type: "+node.type);
  //   }

  //   return cache;
  // }

  

  var Structure = {
    compiler: new Compiler()
  };


  window.document.title = "test";
  
  return Structure;

}));
