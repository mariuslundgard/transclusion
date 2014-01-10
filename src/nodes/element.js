// ;(function (root, Structure, undefined){
//   'use strict';

//   var Element = function (name) {
//     this.initialize.call(this, Structure.Node.ELEMENT, name);
//     this.attrs = [];
//   };

//   Element.prototype = copy(Structure.Node.prototype);
//   Element.prototype.constructor = Element;
//   Element.prototype.attrs = null;

//   Element.prototype.appendAttr = function (child) {
//     var index = this.attrs.length;
//     this.attrs.push(child);
//     child.setParent(this);
//     child.setIndex(index);
//     child.setDocument(this.document);
//     return child;
//   };

//   // root.Structure || (root.Structure = {});
//   root.Structure.Element = Element;

// }(this, this.Structure));
