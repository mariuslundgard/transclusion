function Num(value) {
  transclusion.Node.call(this, transclusion.Node.NODE_NUMBER, '#number');
  this.value = value;
}

Num.prototype = Object.create(transclusion.Node.prototype);
Num.prototype.constructor = Num;

// exports
transclusion.nodes.Num = Num;
