function Num(value) {
  structure.Node.call(this, structure.Node.NODE_NUMBER, '#number');
  this.value = value;
}

Num.prototype = Object.create(structure.Node.prototype);
Num.prototype.constructor = Num;

// exports
structure.nodes.Num = Num;
