function ElementDirectiveSet(name) {
  this.name = name;
  this.isLoaded = false;
  this.set = [];
}

structure.ElementDirectiveSet = ElementDirectiveSet;

ElementDirectiveSet.prototype = {
  mayContain: function (name) {
    var i, len;

    this.loadDirectives();

    for (i = 0, len = this.set.length; i < len; i++) {
      if (this.set[i].mayContain(name)) {
        return true;
      }
    }

    return false;
  },

  mayContainAttribute: function (name) {
    var i, len;

    this.loadDirectives();

    for (i = 0, len = this.set.length; i < len; i++) {
      if (this.set[i].mayContainAttribute(name)) {
        return true;
      }
    }

    return false;
  },

  isVoidElement: function () {
    var i, len;

    this.loadDirectives();

    for (i = 0, len = this.set.length; i < len; i++) {
      if (this.set[i].isVoidElement()) {
        return true;
      }
    }

    return false;
  },

  loadDirectives: function () {
    if (! this.isLoaded) {
      this.add(new structure.ElementDirective(this.name));
      this.isLoaded = true;
    }
  },

  add: function (directive) {
    this.set.push(directive);
  }
};
