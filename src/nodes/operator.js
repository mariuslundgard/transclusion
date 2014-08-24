function Operator(sign) {
  structure.Node.call(this, structure.Node.NODE_OPERATOR, '#operator');
  this.sign = sign;
}

Operator.prototype = Object.create(structure.Node.prototype);
Operator.prototype.constructor = Operator;

// exports
structure.nodes.Operator = Operator;

Operator.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.sign = this.sign;
  return ret;
};
