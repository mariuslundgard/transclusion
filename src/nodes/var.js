function Var(name) {
  structure.Node.call(this, structure.Node.NODE_VAR, name);
}

Var.prototype = Object.create(structure.Node.prototype);
Var.prototype.constructor = Var;

// exports
structure.nodes.Var = Var;
