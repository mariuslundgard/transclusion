function Expr() {
  transclusion.Node.call(this, transclusion.Node.NODE_EXPR, '#expr');
}

Expr.prototype = Object.create(transclusion.Node.prototype);
Expr.prototype.constructor = Expr;

// exports
transclusion.nodes.Expr = Expr;
