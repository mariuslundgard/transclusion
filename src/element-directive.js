function ElementDirective(name, rules, callbacks) {
  this.name = name;
  this.rules = rules || {};
  this.callbacks = callbacks || {};
  this.isLoaded = false;
}

// exports
transclusion.ElementDirective = ElementDirective;

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

  mayContainMetaAttribute: function (name) {
    this.loadRules();
    return undefined !== this.rules.allowedMetaAttrs[name];
  },

  isVoidElement: function () {
    this.loadRules();
    return -1 < transclusion.elementRules.voidElements.indexOf(this.name);
  },

  loadRules: function () {
    var elRules,
        allowedAttrs,
        allowedMetaAttrs,
        allowedChildElements,
        expandedChildElements;

    if (! this.isLoaded) {
      allowedAttrs = {};
      allowedMetaAttrs = {};
      allowedChildElements = {};
      expandedChildElements = {};

      switch (this.name) {
        case 'html':
          allowedAttrs = transclusion.elementRules.html.allowedAttrs;
          allowedMetaAttrs = transclusion.elementRules.html.allowedMetaAttrs;
          allowedChildElements = transclusion.elementRules.html.allowedChildElements;
          break;

        case 'head':
          allowedAttrs = transclusion.elementRules.head.allowedAttrs;
          allowedMetaAttrs = transclusion.elementRules.html.allowedMetaAttrs;
          allowedChildElements = transclusion.elementRules.head.allowedChildElements;
          break;

        case 'body':
          allowedAttrs = transclusion.elementRules.body.allowedAttrs;
          allowedMetaAttrs = transclusion.elementRules.html.allowedMetaAttrs;
          allowedChildElements = transclusion.elementRules.body.allowedChildElements;
          break;

        default:
          if (transclusion.elementRules.head.allowedChildElements[this.name]) {
            elRules = transclusion.elementRules.head.allowedChildElements[this.name] || {};
          } else if (transclusion.elementRules.body.allowedChildElements[this.name]) {
            elRules = transclusion.elementRules.body.allowedChildElements[this.name] || {};
          }

          allowedAttrs = (elRules && elRules.allowedAttrs) ? elRules.allowedAttrs : {};
          allowedChildElements = (elRules && elRules.allowedChildElements) ? elRules.allowedChildElements : {};

          if (elRules && elRules.allowedChildElements) {
            expandedChildElements = expandChildElements(elRules.allowedChildElements);
          }
          break;
      }

      this.extendAllowedAttrs(transclusion.elementRules.globalAttrs);
      this.extendAllowedAttrs(allowedAttrs);
      this.extendAllowedMetaAttrs(allowedMetaAttrs);
      this.extendAllowedChildElements(allowedChildElements);
      this.extendAllowedChildElements(expandedChildElements);

      this.isLoaded = true;
    }
  },

  extendAllowedMetaAttrs: function (rules) {
    if (! this.rules.allowedMetaAttrs) {
      this.rules.allowedMetaAttrs = {};
    }
    for (var i in rules) {
      this.rules.allowedMetaAttrs[i] = rules[i];
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
      for (_name in transclusion.elementRules.contentCategories[name]) {
        ret[_name] = transclusion.elementRules.contentCategories[name][_name];
      }
    }
  }

  return ret;
}
