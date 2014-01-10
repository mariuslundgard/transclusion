// ;(function (root, Structure, undefined){
//   'use strict';

//   var Document = function () {
//     this.initialize(Structure.Node.DOCUMENT, '#document');
//   };

//   Document.prototype = copy(Structure.Node.prototype);
//   Document.prototype.constructor = Document;

//   Document.prototype.createElement = function (name) {
//     var node = new Structure.Element(name);
//     node.setDocument(this);
//     return node;
//   };

//   Document.prototype.createText = function (data) {
//     var node = new Structure.Text(data);
//     node.setDocument(this);
//     return node;
//   };

//   Document.prototype.createAttr = function (name) {
//     var node = new Structure.Attr(name);
//     node.setDocument(this);
//     return node;
//   };

//   // root.Structure || (root.Structure = {});
//   root.Structure.Document = Document;

// }(this, this.Structure));
