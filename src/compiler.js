define([
  // "./core"
], function () {
  "use strict";

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

  return Compiler;

});