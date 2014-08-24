function Expr() {
  structure.Node.call(this, structure.Node.NODE_EXPR, '#expr');
}

Expr.prototype = Object.create(structure.Node.prototype);
Expr.prototype.constructor = Expr;

// exports
structure.nodes.Expr = Expr;
