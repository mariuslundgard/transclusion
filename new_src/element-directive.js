(function (exports) {
  var struct = exports.structure || (exports.structure = {});

  function ElementDirective(name, rules, callbacks) {
    this.name = name;
    this.rules = rules || {};
    this.callbacks = callbacks || {};
    this.isLoaded = false;
  }

  struct.ElementDirective = ElementDirective;

  ElementDirective.prototype = {
    mayContain: function (name) {
      this.loadRules();
      return undefined !== this.rules.allowedChildElements[name];
    },

    isVoidElement: function () {
      this.loadRules();
      return undefined !== struct.elementRules.voidElements[this.name];
    },

    loadRules: function () {
      var elRules, allowedAttrs, allowedChildElements, expandedChildElements;

      if (! this.isLoaded) {
        // rules = struct.elementRules;
        allowedAttrs = {};
        allowedChildElements = {};
        expandedChildElements = {};

        switch (this.name) {

            case 'html':
                allowedAttrs = struct.elementRules.html.allowedAttrs;
                allowedChildElements = struct.elementRules.html.allowedChildElements;
                break;

            case 'head':
                allowedAttrs = struct.elementRules.head.allowedAttrs;
                allowedChildElements = struct.elementRules.head.allowedChildElements;
                break;

            case 'body':
                allowedAttrs = struct.elementRules.body.allowedAttrs;
                allowedChildElements = struct.elementRules.body.allowedChildElements;
                break;

            default:
                if (struct.elementRules.head.allowedChildElements[this.name]) {
                    elRules = struct.elementRules.head.allowedChildElements[this.name] || {};
                } else if (struct.elementRules.body.allowedChildElements[this.name]) {
                    elRules = struct.elementRules.body.allowedChildElements[this.name] || {};
                }
                
                allowedAttrs = (elRules && elRules.allowedAttrs) ? elRules.allowedAttrs : {};
                allowedChildElements = (elRules && elRules.allowedChildElements) ? elRules.allowedChildElements : {};

                if (elRules && elRules.allowedChildElements) {
                    expandedChildElements = expandChildElements(elRules.allowedChildElements);
                }
                break;
        }

        console.log(this.name, struct.elementRules.globalAttrs, allowedAttrs, allowedChildElements, expandedChildElements);

        this.extendAllowedAttrs(struct.elementRules.globalAttrs);
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
    var i, name, _name, ret = {};

    for (name in allowedChildElements) {
      if ('#' === name.charAt(0)) {
        for (_name in struct.elementRules.contentCategories[name]) {
          ret[_name] = struct.elementRules.contentCategories[name][_name];
        }
      }
    }

    return ret;
  }

})(this);
