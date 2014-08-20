function Attr(name) {
  structure.Node.call(this, structure.Node.NODE_ATTR, name);
}

Attr.prototype = Object.create(structure.Node.prototype);
Attr.prototype.constructor = Attr;

// exports
structure.nodes.Attr = Attr;
