function Var(name) {
  transclusion.Node.call(this, transclusion.Node.NODE_VAR, name);
}

Var.prototype = Object.create(transclusion.Node.prototype);
Var.prototype.constructor = Var;

// exports
transclusion.nodes.Var = Var;
