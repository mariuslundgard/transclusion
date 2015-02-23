function Operator(sign) {
  transclusion.Node.call(this, transclusion.Node.NODE_OPERATOR, '#operator');
  this.sign = sign;
}

Operator.prototype = Object.create(transclusion.Node.prototype);
Operator.prototype.constructor = Operator;

// exports
transclusion.nodes.Operator = Operator;

Operator.prototype.dump = function () {
  var ret = transclusion.Node.prototype.dump.call(this);
  ret.sign = this.sign;
  return ret;
};
