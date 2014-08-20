function ElementDirective(name, rules, callbacks) {
  this.name = name;
  this.rules = rules || {};
  this.callbacks = callbacks || {};
  this.isLoaded = false;
}

// exports
structure.ElementDirective = ElementDirective;

ElementDirective.prototype = {
  mayContain: function (name) {
    this.loadRules();
    return undefined !== this.rules.allowedChildElements[name];
  },

  mayContainAttribute: function (name) {
    if ('data-' === name.substr(0, 5)) {
      return true;
    }
    this.loadRules();
    return undefined !== this.rules.allowedAttrs[name];
  },

  isVoidElement: function () {
    this.loadRules();
    return -1 < structure.elementRules.voidElements.indexOf(this.name);
  },

  loadRules: function () {
    var elRules, allowedAttrs, allowedChildElements, expandedChildElements;

    if (! this.isLoaded) {
      allowedAttrs = {};
      allowedChildElements = {};
      expandedChildElements = {};

      switch (this.name) {
        case 'html':
          allowedAttrs = structure.elementRules.html.allowedAttrs;
          allowedChildElements = structure.elementRules.html.allowedChildElements;
          break;

        case 'head':
          allowedAttrs = structure.elementRules.head.allowedAttrs;
          allowedChildElements = structure.elementRules.head.allowedChildElements;
          break;

        case 'body':
          allowedAttrs = structure.elementRules.body.allowedAttrs;
          allowedChildElements = structure.elementRules.body.allowedChildElements;
          break;

        default:
          if (structure.elementRules.head.allowedChildElements[this.name]) {
            elRules = structure.elementRules.head.allowedChildElements[this.name] || {};
          } else if (structure.elementRules.body.allowedChildElements[this.name]) {
            elRules = structure.elementRules.body.allowedChildElements[this.name] || {};
          }
          
          allowedAttrs = (elRules && elRules.allowedAttrs) ? elRules.allowedAttrs : {};
          allowedChildElements = (elRules && elRules.allowedChildElements) ? elRules.allowedChildElements : {};

          if (elRules && elRules.allowedChildElements) {
            expandedChildElements = expandChildElements(elRules.allowedChildElements);
          }
          break;
      }

      this.extendAllowedAttrs(structure.elementRules.globalAttrs);
      this.extendAllowedAttrs(allowedAttrs);
      this.extendAllowedChildElements(allowedChildElements);
      this.extendAllowedChildElements(expandedChildElements);

      this.isLoaded = true;
    }
  },

  extendAllowedAttrs: function (rules) {
    if (! this.rules.allowedAttrs) {
      this.rules.allowedAttrs = {};
    }
    for (var i in rules) {
      this.rules.allowedAttrs[i] = rules[i];
    }
  },

  extendAllowedChildElements: function (rules) {
    if (! this.rules.allowedChildElements) {
      this.rules.allowedChildElements = {};
    }
    for (var i in rules) {
      this.rules.allowedChildElements[i] = rules[i];
    }
  }
};

function expandChildElements(allowedChildElements) {
  var name, _name, ret = {};

  for (name in allowedChildElements) {
    if ('#' === name.charAt(0)) {
      for (_name in structure.elementRules.contentCategories[name]) {
        ret[_name] = structure.elementRules.contentCategories[name][_name];
      }
    }
  }

  return ret;
}
