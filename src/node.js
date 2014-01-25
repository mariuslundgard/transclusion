// define([
//   './core'
// ], function(Structure) {
(function (core) {
  
  var Node = function (type, name) {
    this.initialize(type, name);
  };

  Node.ELEMENT  = 1;
  Node.ATTRIBUTE  = 2;
  Node.TEXT  = 3;
  Node.CDATA_SECTION  = 4;
  Node.ENTITY_REFERENCE  = 5;
  Node.ENTITY  = 6;
  Node.PROCESSING_INSTRUCTION  = 7;
  Node.COMMENT  = 8;
  Node.DOCUMENT  = 9;
  Node.DOCUMENT_TYPE  = 10;
  Node.DOCUMENT_FRAGMENT  = 11;
  Node.NOTATION  = 12;

// DOCUMENT_POSITION_DISCONNECTED  = 1
// DOCUMENT_POSITION_PRECEDING  = 2
// DOCUMENT_POSITION_FOLLOWING  = 4
// DOCUMENT_POSITION_CONTAINS  = 8
// DOCUMENT_POSITION_CONTAINED_BY  = 16
// DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC  = 32 

  Node.prototype.initialize = function (type, name) {
    this.id = null;
    this.type = type;
    this.name = name;
    this.index = 0;
    this.document = null;
    this.parent = null;
    this.childNodes = [];

    this.lastChild = null;
    this.firstChild = null;

    this.nextSibling = null;
    this.previousSibling = null;

    this.startPointer = null
    this.endPointer = null;
    // console.log('new structure.Node ('+this.type+')');
  };

  Node.prototype.setIndex = function (index) {
    this.index = index;
  };

  Node.prototype.appendChild = function (node) {
    node.setParent(this);
    
    if (Node.TEXT !== node.type || !node.whiteSpace) {
      if (this.lastChild) {
        node.setIndex(this.lastChild.index + 1);
      }

      if (this.lastChild) {
        this.lastChild.nextSibling = node;
        node.previousSibling = this.lastChild;
      }

      if (!this.firstChild) {
        this.firstChild = node;
      }

      this.lastChild = node;
    }

    this.childNodes.push(node);
  };

  Node.prototype.setDocument = function (document) {
    this.document = document;
  };

  Node.prototype.setParent = function (parent) {
    this.parent = parent;
  };

  Node.prototype.dump = function () {
    var info = {
      type: this.type,
      name: this.name,
    };

    if (this.childNodes.length) {
      info.childNodes = [];
      var i;
      for (i = 0; i < this.childNodes.length; i++) {
        info.childNodes.push(this.childNodes[i].dump());
      }
    }

    return info;
  };

  Node.prototype.getUniqueSelector = function () {
    if ('body' === this.name) {
      return 'body';
    }

    if ('html' === this.name) {
      return 'html';
    }

    var n, name = this.name;

    if (n = this.getDirective().compileName) {
      name = n;
    }

    return this.parent.getUniqueSelector() + ' > ' + name + ':nth-child(' + (this.index + 1) + ')';
  };

  core.Node = Node;

}(
  window.structure
));
