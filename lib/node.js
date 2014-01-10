;(function(root, Structure, undefined){
  'use strict';

  var Node = function(type, name) {
    this.initialize.call(this, type, name);
  };

  Node.prototype.name = null;
  Node.prototype.type = null;
  Node.prototype.parent = null;
  Node.prototype.index = null;
  Node.prototype.childNodes = null;

  Node.prototype.initialize = function(type, name) {
    this.type = type;
    this.name = name;
    this.childNodes = [];
  };

  Node.prototype.setDocument = function(document) {
    this.document = document;
  };

  Node.prototype.setParent = function(parent) {
    this.parent = parent;
  };

  Node.prototype.setIndex = function(index) {
    this.index = index;
  };

  Node.prototype.appendChild = function(child) {
    var index = this.childNodes.length;
    this.childNodes.push(child);
    child.setParent(this);
    child.setIndex(index);
    child.setDocument(this.document);
    return child;
  };

  Node.DOCUMENT = 1;
  Node.TEXT = 2;
  Node.ELEMENT = 3;
  Node.ATTR = 101;

  // Export
  root.Structure.Node = Node;

}(this, this.Structure));
