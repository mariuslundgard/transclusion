(function(exports){
var structure = exports.structure = {};

structure.elementRules = {
  globalAttrs: {
    'accesskey': [],
    'class': [],
    'contenteditable': [],
    'contextmenu': [],
    // 'data-*': [], // handled by the system
    'dir': [],
    'draggable': [],
    'dropzone': [],
    'hidden': [],
    'id': [],
    'itemid': [],
    'itemprop': [],
    'itemref': [],
    'itemscope': [],
    'itemtype': [],
    'lang': [],
    'spellcheck': [],
    'style': [],
    'tabindex': [],
    'title': []
  },
  voidElements: [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ],
  html: {
    allowedChildElements: {
      'head': [],
      'body': []
    }
  },
  head: {
    allowedAttrs: {
      'profile': []
    },
    allowedChildElements: {
      'title': [],
      'base': {
        allowedAttrs: {
          'href': [],
          'target': []
        }
      },
      'link': {
        allowedAttrs: {
          'crossorigin': [],
          'disabled': [],
          'href': [],
          'hreflang': [],
          'media': [],
          'methods': [],
          'rel': [],
          'sizes': [],
          'target': [],
          'type': []
        }
      },
      'meta': {
        allowedAttrs: {
          'charset': [ 'utf-8' ],
          'content': [],
          'http-equiv': [],
          'name': []
        }
      },
      'style': {
        allowedAttrs: {
          'type': [],
          'media': [],
          'scoped': [],
          'title': [],
          'disabled': []
        }
      },
      'script': {
        allowedAttrs: {
          'async': [],
          'src': [],
          'type': [],
          'defer': [],
          'crossorigin': []
        }
      },
      'noscript': []
    }
  },
  body: {
    allowedAttrs: {
      'onafterprint': [],
    },
    allowedChildElements: {
      'script': {
        allowedAttrs: {
          'async': [],
          'src': [],
          'type': [],
          'defer': [],
          'crossorigin': []
        }
      },
      'noscript': [],
      'section': {
        allowedChildElements: {
          '#flow': [],
          'flink': []
        }
      },
      'nav': {
        allowedChildElements: {
          '#flow': []
        }
      },
      'article': {
        allowedChildElements: {
          '#flow': []
        }
      },
      'aside': {
        allowedChildElements: {
          '#flow': []
        }
      },
      'h1': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'h2': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'h3': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'h4': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'h5': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'h6': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'header': {
        allowedChildElements: {
          '#flow': []
        }
      },
      'footer': {
        allowedChildElements: {
          '#flow': []
        }
      },
      'address': [],
      'main': {
        allowedChildElements: {
          '#flow': []
        }
      },
      'p': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'hr': {
        allowedAttrs: {
          'color': []
        }
      },
      'pre': [],
      'blockquote': {
        allowedAttrs: {
          'cite': []
        }
      },
      'ol': {
        allowedChildElements: {
          'li': []
        },
        allowedAttrs: {
          'reversed': [],
          'start': [],
          'type': []
        }
      },
      'ul': {
        allowedChildElements: {
          'li': []
        }
      },
      'li': {
        allowedAttrs: {
          'value': []
        },
      },
      'dl': {
        allowedChildElements: {
          'dd': [],
          'dt': []
        },
        allowedAttrs: {
          'compact': []
        }
      },
      'dt': [],
      'dd': {
        allowedAttrs: {
          'nowrap': []
        }
      },
      'figure': {
        allowedChildElements: {
          '#flow': [],
          'figcaption': []
        }
      },
      'figcaption': [],
      'div': {
        allowedChildElements: {
          '#flow': [],
        }
      },
      'a': {
        allowedAttrs: {
          'datafld': [],
          'datasrc': [],
          'download': [],
          'href': [],
          'hreflang': [],
          'media': [],
          'methods': [],
          'ping': [],
          'rel': [],
          'target': [],
          'type': [],
          'urn': []
        }
      },
      'em': [],
      'strong': [],
      'small': [],
      's': [],
      'cite': [],
      'q': {
        allowedAttrs: {
          'cite': []
        }
      },
      'dfn': [],
      'abbr': [],
      'data': {
        allowedAttrs: {
          'value': []
        }
      },
      'time': {
        allowedAttrs: {
          'datetime': []
        }
      },
      'code': [],
      'var': [],
      'samp': [],
      'kbd': [],
      'sub': [],
      'sup': [],
      'i': [],
      'b': [],
      'u': [],
      'mark': [],
      'ruby': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'rt': [],
      'rp': [],
      'bdi': [],
      'bdo': {
        allowedAttrs: {
          'dir': []
        }
      },
      'span': [],
      'br': {
        allowedAttrs: {
          'clear': []
        }
      },
      'wbr': [],
      'ins': {
        allowedAttrs: {
          'cite': [],
          'datetime': []
        }
      },
      'del': {
        allowedAttrs: {
          'cite': [],
          'datetime': []
        }
      },
      'img': {
        allowedAttrs: {
          'alt': [],
          'crossorigin': [],
          'height': [],
          'ismap': [],
          'src': [],
          'width': [],
          'usemap': []
        }
      },
      'iframe': {
        allowedAttrs: {
          'allowfullscreen': [],
          'height': [],
          'mozapp': [],
          'mozbrowser': [],
          'name': [],
          'remote': [],
          'sandbox': [],
          'seamless': [],
          'src': [],
          'srcdoc': [],
          'width': []
        }
      },
      'embed': {
        allowedAttrs: {
          'height': [],
          'src': [],
          'type': [],
          'width': []
        }
      },
      'object': {
        allowedChildElements: {
          'param': [],
          '#transparent': []
        },
        allowedAttrs: {
          'data': [],
          'form': [],
          'height': [],
          'name': [],
          'type': [],
          'width': []
        },
      },
      'param': {
        allowedAttrs: {
          'name': [],
          'value': []
        }
      },
      'video': {
        allowedChildElements: {
          '#transparent': [],
          'source': [],
          '#flow': [],
          '#phrasing': []
        },
        allowedAttrs: {
          'autoplay': [],
          'buffered': [],
          'controls': [],
          'crossorigin': [],
          'height': [],
          'loop': [],
          'muted': [],
          'played': [],
          'preload': [],
          'poster': [],
          'src': [],
          'width': []
        }
      },
      'audio': {
        allowedChildElements: {
          'track': [],
          '#transparent': [],
          'source': []
        },
        allowedAttrs: {
          'autoplay': [],
          'buffered': [],
          'controls': [],
          'loop': [],
          'mozcurrentsampleoffset': [],
          'muted': [],
          'played': [],
          'preload': [],
          'src': [],
          'volume': []
        }
      },
      'source': {
        allowedAttrs: {
          'src': [],
          'type': [],
          'media': []
        }
      },
      'track': {
        allowedAttrs: {
          'default': [],
          'kind': [],
          'label': [],
          'src': [],
          'srclang': []
        }
      },
      'canvas': {
        allowedAttrs: {
          'width': [],
          'height': []
        }
      },
      'map': {
        allowedChildElements: {
          '#transparent': []
        }
      },
      'area': {
        allowedAttrs: {
          'alt': [],
          'coords': [],
          'download': [],
          'href': [],
          'hreflang': [],
          'media': [],
          'rel': [],
          'shape': [],
          'target': [],
          'type': []
        }
      },
      'svg': {
        allowedAttrs: {
          'version': [],
          'baseprofile': [],
          'contentscripttype': [],
          'contentstyletype': [],
          'x': [],
          'y': [],
          'width': [],
          'height': [],
          'viewbox': [],
          'preserveaspectratio': [],
          'zoomandpan': [],
          'xmlxml:space': []
        }
      },
      'math': {
        allowedAttrs: {
          'dir': [],
          'href': [],
          'mathbackground': [],
          'mathcolor': [],
          'display': [],
          'overflow': [],
          'decimalpoint' : [],
          'displaystyle': [],
          'infixlinebreakstyle': [],
          'scriptlevel': [],
          'scriptminsize': [],
          'scriptsizemultiplier': []
        }
      },
      'table': {
        allowedChildElements: {
          'caption': [],
          'colgroup': [],
          'thead': [],
          'tfoot': [],
          'tbody': [],
          'tr': []
        }
      },
      'caption': [],
      'colgroup': {
        allowedChildElements: {
          'col': []
        },
        allowedAttrs: {
          'bgcolor': [],
          'span': [],
        },
      },
      'col': {
        allowedAttrs: {
          'bgcolor': [],
          'span': []
        }
      },
      'tbody': {
        allowedChildElements: {
          'tr': []
        },
        allowedAttrs: {
          'bgcolor': [],
        },
      },
      'thead': {
        allowedChildElements: {
          'tr': []
        },
        allowedAttrs: {
          'bgcolor': []
        }
      },
      'tfoot': {
        allowedChildElements: {
          'tr': []
        },
        allowedAttrs: {
          'bgcolor': []
        }
      },
      'tr': {
        allowedChildElements: {
          'td': [],
          'th': []
        }
      },
      'td': {
        allowedAttrs: {
          'bgcolor': [],
          'colspan': [],
          'headers': [],
          'rowspan': []
        }
      },
      'th': {
        allowedAttrs: {
          'bgcolor': [],
          'colspan': [],
          'headers': [],
          'rowspan': [],
          'scope': [],
        }
      },
      'form': {
        allowedChildElements: {
          '#flow': []
        },
        allowedAttrs: {
          'accept-charset': {
            'action': [],
            'autocomplete': [],
            'enctype': [],
            'method': [],
            'name': [],
            'novalidate': [],
            'target': []
          }
        }
      },
      'fieldset': {
        allowedChildElements: {
          'legend': [],
          '#flow': []
        },
        allowedAttrs: {
          'disabled': [],
          'form': [],
          'name': []
        }
      },
      'legend': {
        allowedChildElements: {
          '#phrasing': []
        }
      },
      'label': {
        allowedChildElements: {
          '#phrasing': []
      },
        allowedAttrs: {
          'accesskey': [],
          'for': [],
          'form': []
        }
      },
      'input': {
        allowedAttrs: {
          'type': [],
          'accept': [],
          'mozactionhint': [],
          'autocomplete': [],
          'autofocus': [],
          'autosave': [],
          'checked': [],
          'disabled': [],
          'form': [],
          'formaction': [],
          'formenctype': [],
          'formmethod': [],
          'formnovalidate': [],
          'formtarget': [],
          'height': [],
          'inputmode': [],
          'list': [],
          'max': [],
          'maxlength': [],
          'min': [],
          'multiple': [],
          'name': [],
          'pattern': [],
          'placeholder': [],
          'readonly': [],
          'required': [],
          'selectiondirection': [],
          'size': [],
          'spellcheck': [],
          'src': [],
          'step': [],
          'value': [],
          'width': [],
          'x-moz-errormessage': []
        }
      },
      'button': {
        allowedAttrs: {
          'autofocus': [],
          'disabled': [],
          'form': [],
          'formaction': [],
          'formenctype': [],
          'formmethod': [],
          'formnovalidate': [],
          'formtarget': [],
          'name': [],
          'type': [],
          'value': []
        }
      },
      'select': {
        allowedChildElements: {
          'option': [],
          'optgroup': []
        },
        allowedAttrs: {
          'autofocus': [],
          'disabled': [],
          'form': [],
          'multiple': [],
          'name': [],
          'required': [],
          'size': []
        }
      },
      'datalist': {
        allowedChildElements: {
          '#phrasing': [],
          'option': []
        }
      },
      'optgroup': {
        allowedChildElements: {
          'option': []
      },
        allowedAttrs: {
          'disabled': [],
          'label': []
        }
      },
      'option': {
        allowedAttrs: {
          'disabled': [],
          'label': [],
          'selected': [],
          'value': []
        }
      },
      'textarea': {
        allowedAttrs: {
          'autofocus': [],
          'cols': [],
          'disabled': [],
          'form': [],
          'maxlength': [],
          'name': [],
          'placeholder': [],
          'readonly': [],
          'required': [],
          'rows': [],
          'selectiondirection': [],
          'selectionend': [],
          'selectionstart': [],
          'spellcheck': [],
          'wrap': []
        }
      },
      'keygen': {
        allowedAttrs: {
          'autofocus': [],
          'challenge': [],
          'disabled': [],
          'form': [],
          'keytype': [],
          'name': []
        }
      },
      'output': {
        allowedAttrs: {
          'for': [],
          'form': [],
          'name': []
        }
      },
      'progress': {
        allowedAttrs: {
          'max': [],
          'value': [],
        }
      },
      'meter': {
        allowedAttrs: {
          'value': [],
          'min': [],
          'max': [],
          'low': [],
          'high': [],
          'optimum': [],
          'form': []
        }
      },
      'details': {
        allowedChildElements: {
          'summary': [],
          '#flow': []
        },
        allowedAttrs: {
          'open': []
        }
      },
      'summary': [],
      'menuitem': {
        allowedAttrs: {
          'checked': [],
          'command': [],
          'default': [],
          'disabled': [],
          'icon': [],
          'label': [],
          'radiogroup': [],
          'type': []
        }
      },
      'menu': {
        allowedChildElements: {
          '#flow': [],
          'menuitem': []
      },
        allowedAttrs: {
          'type': [],
          'label': []
        }
      }
    }
  },
  'contentCategories': {
    '#flow': {
      'a': [],
      'abbr': [],
      'address': [],
      'article': [],
      'aside': [],
      'audio': [],
      'b': [],
      'bdo': [],
      'blockquote': [],
      'br': [],
      'button': [],
      'canvas': [],
      'cite': [],
      'code': [],
      'command': [],
      'datalist': [],
      'del': [],
      'details': [],
      'dfn': [],
      'div': [],
      'dl': [],
      'em': [],
      'embed': [],
      'fieldset': [],
      'figure': [],
      'footer': [],
      'form': [],
      'h1': [],
      'h2': [],
      'h3': [],
      'h4': [],
      'h5': [],
      'h6': [],
      'header': [],
      'hgroup': [],
      'hr': [],
      'i': [],
      'iframe': [],
      'img': [],
      'input': [],
      'ins': [],
      'kbd': [],
      'keygen': [],
      'label': [],
      'main': [], // experimental
      'map': [],
      'mark': [],
      'math': [],
      'menu': [],
      'meter': [],
      'nav': [],
      'noscript': [],
      'object': [],
      'ol': [],
      'output': [],
      'p': [],
      'pre': [],
      'progress': [],
      'q': [],
      'ruby': [],
      's': [],
      'samp': [],
      'script': [],
      'section': [],
      'select': [],
      'small': [],
      'span': [],
      'strong': [],
      'sub': [],
      'sup': [],
      'svg': [],
      'table': [],
      'textarea': [],
      'time': [],
      'u': [],
      'ul': [],
      'var': [],
      'video': [],
      'wbr': [],
      '#text': [],
    },
    '#phrasing': {
      'abbr': [],
      'audio': [],
      'b': [],
      'bdi': [],
      'bdo': [],
      'br': [],
      'button': [],
      'canvas': [],
      'cite': [],
      'code': [],
      'command': [],
      'datalist': [],
      'dfn': [],
      'em': [],
      'embed': [],
      'i': [],
      'iframe': [],
      'img': [],
      'input': [],
      'kbd': [],
      'keygen': [],
      'label': [],
      'mark': [],
      'math': [],
      'meter': [],
      'noscript': [],
      'object': [],
      'output': [],
      'progress': [],
      'q': [],
      'ruby': [],
      'samp': [],
      'script': [],
      'select': [],
      'small': [],
      'span': [],
      'strong': [],
      'sub': [],
      'sup': [],
      'svg': [],
      'textarea': [],
      'time': [],
      'var': [],
      'video': [],
      'wbr': [],
      '#text': [],
    },
    '#palpable': {
      'a': [],
      'abbr': [],
      'address': [],
      'article': [],
      'aside': [],
      'audio': [],
      'b': [],
      'bdi': [],
      'bdo': [],
      'blockquote': [],
      'button': [],
      'canvas': [],
      'cite': [],
      'code': [],
      'data': [],
      'details': [],
      'dfn': [],
      'div': [],
      'dl': [],
      'em': [],
      'embed': [],
      'fieldset': [],
      'figure': [],
      'footer': [],
      'form': [],
      'h1': [],
      'h2': [],
      'h3': [],
      'h4': [],
      'h5': [],
      'h6': [],
      'header': [],
      'hgroup': [],
      'i': [],
      'iframe': [],
      'img': [],
      'input': [],
      'ins': [],
      'kbd': [],
      'keygen': [],
      'label': [],
      'main': [],
      'map': [],
      'mark': [],
      'math': [],
      'menu': [],
      'meter': [],
      'nav': [],
      'object': [],
      'ol': [],
      'output': [],
      'p': [],
      'pre': [],
      'progress': [],
      'q': [],
      'ruby': [],
      's': [],
      'samp': [],
      'section': [],
      'select': [],
      'small': [],
      'span': [],
      'strong': [],
      'sub': [],
      'sup': [],
      'svg': [],
      'table': [],
      'textarea': [],
      'time': [],
      'u': [],
      'ul': [],
      'var': [],
      'video': [],
      '#text': [],
    }
  }
};

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

function Node(type, name) {
  this.type = type;
  this.name = name;
  this.document = null;

  // child nodes
  this.firstChild = null;
  this.lastChild = null;
  this.childNodes = [];
  this.attrs = [];
  this.index = 0;

  // pointers
  this.parentNode = null;
  this.childCount = 0;

  // offsets
  this.outerStartOffset = null;
  this.outerEndOffset = null;
  this.innerStartOffset = null;
  this.innerEndOffset = null;

  if (! this.name) {
    throw new Error('Missing `name`');
  }

  if (! this.type) {
    throw new Error('Missing `type`');
  }
}

// exports
structure.Node = Node;
structure.nodes = {};

// constants
Node.NODE_ELEMENT = 1;
Node.NODE_DOCUMENT = 2;
Node.NODE_TEXT = 3;
Node.NODE_ATTR = 4;
Node.NODE_EXPR = 5;
Node.NODE_COMMENT = 6;

Node.prototype = {
  setDocument: function (doc) {
    this.document = doc;
  },

  appendChild: function (node) {
    node.parentNode = this;
    if (Node.NODE_TEXT) {
      if (! node.whiteSpace) {
        node.index = this.childCount;
        this.childCount++;
      }
    } else {
      node.index = this.childCount;
      this.childCount++;
    }

    this.childNodes.push(node);

    if (! this.firstChild) {
      this.firstChild = node;
    }

    this.lastChild = node;

    return node;
  },

  appendAttr: function (node) {
    node.parentNode = this;
    node.index = this.attrs.length;
    this.attrs.push(node);
    return node;
  },

  setOuterStartOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setOuterStartOffset` cannot be undefined');
    }
    this.outerStartOffset = Number(offset);
  },

  setOuterEndOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setOuterEndOffset` cannot be undefined');
    }
    this.outerEndOffset = Number(offset);
  },

  setInnerStartOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setInnerStartOffset` cannot be undefined');
    }
    this.innerStartOffset = Number(offset);
  },

  setInnerEndOffset: function (offset) {
    if (undefined === offset) {
      throw new Error('Argument to `setInnerEndOffset` cannot be undefined');
    }
    this.innerEndOffset = Number(offset);
  },

  dump: function () {
    var ret = {}, i, len;

    ret.index = this.index;
    ret.name = this.name;
    ret.type = this.type;

    if (this.childNodes.length) {
      ret.childNodes = [];
      for (i = 0, len = this.childNodes.length; i < len; i++) {
        ret.childNodes.push(this.childNodes[i].dump());
      }
    }

    return ret;
  }
};

function Element(name) {
  structure.Node.call(this, structure.Node.NODE_ELEMENT, name);
  this.directiveSet = null;
  this.id = null;
  this.previousSibling = null;
  this.nextSibling = null;
}

Element.prototype = Object.create(structure.Node.prototype);
Element.prototype.constructor = Element;

structure.nodes.Element = Element;

Element.prototype.appendChild = function (node) {
  if (this.lastChild) {
    node.previousSibling = this.lastChild;
    this.nextSibling = node;
  }
  node.nextSibling = null;
  structure.Node.prototype.appendChild.call(this, node);
  return node;
};

Element.prototype.mayContain = function (name) {
  return this.getDirectiveSet().mayContain(name);
};

Element.prototype.mayContainAttribute = function (name) {
  return this.getDirectiveSet().mayContainAttribute(name);
};

Element.prototype.isVoidElement = function () {
  return this.getDirectiveSet().isVoidElement();
};

Element.prototype.getDirectiveSet = function () {
  if (null === this.directiveSet) {
    this.directiveSet = new structure.ElementDirectiveSet(this.name);
  }
  return this.directiveSet;
};

Element.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.outerStartOffset = this.outerStartOffset;
  ret.innerStartOffset = this.innerStartOffset;
  ret.innerEndOffset = this.innerEndOffset;
  ret.outerEndOffset = this.outerEndOffset;
  ret.path = this.getUniquePath();
  return ret;
};

Element.prototype.getUniquePath = function () {
  if ('html' === this.name) {
    return 'html';
  }

  var path;
  var node = this;
  while (node.parentNode && 'html' !== node.parentNode.name) {
      var name = node.name;
      var parent = node.parentNode;
      var siblings = parent.getChildrenByName(name);
      if (name !== 'body' && name !== 'head' && siblings.length > 1) {
        name += ':nth-child(' + (node.index+1) + ')';
      }
      path = name + (path ? '>' + path : '');
      node = parent;
  }
  return path;
};

Element.prototype.getChildrenByName = function(name) {
  var children = [];
  for (var i = 0; i < this.childNodes.length; i++ ){
    if (name === this.childNodes[i].name) {
      children.push(this.childNodes[i]);
    }
  }
  return children;
};

function Attr(name) {
  structure.Node.call(this, structure.Node.NODE_ATTR, name);
}

Attr.prototype = Object.create(structure.Node.prototype);
Attr.prototype.constructor = Attr;

// exports
structure.nodes.Attr = Attr;

function Text(data) {
  structure.Node.call(this, structure.Node.NODE_TEXT, '#text');
  this.data = data || '';
  this.whiteSpace = true;
}

Text.prototype = Object.create(structure.Node.prototype);
Text.prototype.constructor = Text;

// exports
structure.nodes.Text = Text;

Text.prototype.appendData = function (data) {
  this.data += data;
};

Text.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};

function Comment(data) {
  structure.Node.call(this, structure.Node.NODE_COMMENT, '#comment');
  this.data = data || '';
}

Comment.prototype = Object.create(structure.Node.prototype);
Comment.prototype.constructor = Comment;

structure.nodes.Comment = Comment;

Comment.prototype.dump = function () {
  var ret = structure.Node.prototype.dump.call(this);
  ret.data = this.data;
  return ret;
};

function CharStream(input) {
  this.input = input ? input.replace(/(\r\n|\n|\r)/gm,'\n') : '';
  this.size = this.input.length;
  this.pointer = 0;
  this.line = 1;
  this.column = 1;
}

// exports
structure.CharStream = CharStream;

CharStream.prototype = {
  getPointer: function () {
    return this.pointer;
  },

  getSize: function () {
    return this.size;
  },

  getLine: function () {
    return this.line;
  },

  getColumn: function () {
    return this.column;
  },

  consume: function (len) {
    var ret = '', chr, i = 0;

    if (undefined === len) {
      len = 1;
    }

    while (i < len) {
      if (this.pointer < this.getSize()) {
        chr = this.input.charAt(this.pointer);
        if ('\n' === chr) {
          this.line++;
          this.column = 0;
        }
        ret += chr;
        this.column++;
        this.pointer++;
      }
      i++;
    }

    if (ret.length) {
      return ret;
    }

    return -1;
  },

  next: function (len) {
    var ret = '',
        index = 0;

    if (undefined === len) {
      len = 1;
    }

    while (index < len) {
      if ((this.pointer + index) < this.getSize()) {
        ret += this.input.charAt(this.pointer + index);
      }
      index++;
    }

    if (0 === ret.length) {
      return -1;
    }

    return ret;
  },

  shift: function (len) {
    var i = 0,
        chr;

    if (undefined === len) {
      len = 1;
    }

    while (i < len) {
      chr = this.next();
      
      if ('\n' === chr) {
        this.line++;
        this.column = 0;
      }

      this.column++;
      this.pointer++;
      i++;
    }
  }
};

structure.CharTester = {
  isWhiteSpace: function (chr) {
    return '\n' === chr || '\t' === chr || ' ' === chr;
  },
  isUpperCase: function (chr) {
    return 'A' <= chr && chr <= 'Z';
  },
  isLowerCase: function (chr) {
    return 'a' <= chr && chr <= 'z';
  },
  isNumber: function(chr) {
    return '0' <= chr && chr <= '9';
  },
  isAlpha: function(chr){
    return this.isUpperCase(chr) || this.isLowerCase(chr);
  },
};

function Document(input) {
  structure.Node.call(this, structure.Node.NODE_DOCUMENT, '#document');
  this.debug = false;
  this.input = input || '';
  this.parser = null;
  this.compiler = null;
  this.reset();
}

Document.prototype = Object.create(structure.Node.prototype);
Document.prototype.constructor = Document;

// exports
structure.Document = Document;

Document.prototype.setInput = function (input) {
  if (input !== this.input) {
    this.input = input;
    this.reset();
  }
};

Document.prototype.reset = function () {
  if (this.parser) {
    this.parser.reset();
  }
  this.childNodes = [];
  this.attrs = [];
  this.firstChild = null;
  this.lastChild = null;
  this.outerStartOffset = null;
  this.outerEndOffset = null;
  this.innerStartOffset = null;
  this.innerEndOffset = null;
  this.documentElement = null;
  this.titleElement = null;
  this.body = null;
  this.isParsed = false;
  this.isCompiled = false;
  this.output = null;
};

Document.prototype.createElement = function (name) {
  var node = new structure.nodes.Element(name);
  node.setDocument(this);
  switch (name) {
    case 'html':
      if (this.documentElement) {
        throw new Error('The <html> element already exists');
      }
      this.documentElement = node;
      break;
    case 'body':
      if (this.body) {
        throw new Error('The <body> element already exists');
      }
      this.body = node;
      break;
    case 'title':
      if (this.titleElement) {
        throw new Error('The <title> element already exists');
      }
      this.titleElement = node;
      break;
  }
  return node;
};

Document.prototype.createText = function (data) {
  var node = new structure.nodes.Text(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createComment = function (data) {
  var node = new structure.nodes.Comment(data);
  node.setDocument(this);
  return node;
};

Document.prototype.createAttr = function (name) {
  var node = new structure.nodes.Attr(name);
  node.setDocument(this);
  return node;
};

Document.prototype.getParser = function () {
  if (null === this.parser) {
    this.parser = new structure.Parser(this);
  }
  return this.parser;
};

Document.prototype.getCompiler = function () {
  if (null === this.compiler) {
    this.compiler = new structure.Compiler(this);
  }
  return this.compiler;
};

Document.prototype.parse = function () {
  if (! this.isParsed) {
    this.getParser().parse(this.input);
    this.isParsed = true;
  }
};

Document.prototype.compile = function (input) {
  if (input) {
    this.setInput(input);
  }
  if (! this.isCompiled) {
    this.parse();
    this.output = this.getCompiler().compile();
    this.isCompiled = true;
  }
  return this.output;
};

structure.Token = {
  EOF: 'EOF',
  CHAR: 'CHAR',
  DOCTYPE: 'DOCTYPE',
  COMMENT: 'COMMENT',
  START_TAG: 'START_TAG',
  START_TAG_CLOSE: 'START_TAG_CLOSE',
  START_TAG_NAME: 'START_TAG_NAME',
  END_TAG: 'END_TAG',
  ATTR_KEY: 'ATTR_KEY',
  START_ATTR_VALUE: 'START_ATTR_VALUE',
  END_ATTR_VALUE: 'END_ATTR_VALUE',
  EXPR_OPEN: 'EXPR_OPEN',
  VARIABLE: 'VARIABLE',
  FUNC: 'FUNC',
  END_FUNC: 'END_FUNC',
  DOT: 'DOT',
  STR: 'STR',
  NUM: 'NUM',
  EXPR_CLOSE: 'EXPR_CLOSE',
  OPERATOR: 'OPERATOR',
  META: 'META',
  END_META: 'END_META',
  START_ARR: 'START_ARR',
  END_ARR: 'END_ARR',
  START_OBJ: 'START_OBJ',
  END_OBJ: 'END_OBJ'
};

function Tokenizer(prs) {
  if (! prs) {
    throw new Error('Missing `parser` for Tokenizer');
  }
  this.parser = prs;
  this.reset();
  this.openExprDelim = '[[';
  this.closeExprDelim = '[[';
  this.replacementChar = '?';
}

// exports
structure.Tokenizer = Tokenizer;

// states
Tokenizer.STATE_EOF                     = 'STATE_EOF';
Tokenizer.STATE_DATA                    = 'STATE_DATA';
Tokenizer.STATE_MARKUP_DECLARATION_OPEN = 'STATE_MARKUP_DECLARATION_OPEN';
Tokenizer.STATE_COMMENT_START           = 'STATE_COMMENT_START';
Tokenizer.STATE_COMMENT_START_DASH      = 'STATE_COMMENT_START_DASH';
Tokenizer.STATE_COMMENT                 = 'STATE_COMMENT';
Tokenizer.STATE_COMMENT_END_DASH        = 'STATE_COMMENT_END_DASH';
Tokenizer.STATE_COMMENT_END             = 'STATE_COMMENT_END';
Tokenizer.STATE_BOGUS_COMMENT           = 'STATE_BOGUS_COMMENT';
Tokenizer.STATE_CHAR_REF_IN_DATA        = 'STATE_CHAR_REF_IN_DATA';
Tokenizer.STATE_TAG_OPEN                = 'STATE_TAG_OPEN';
Tokenizer.STATE_TAG_NAME                = 'STATE_TAG_NAME';
Tokenizer.STATE_SELF_CLOSING_START_TAG  = 'STATE_SELF_CLOSING_START_TAG';
Tokenizer.STATE_BEFORE_ATTR_KEY         = 'STATE_BEFORE_ATTR_KEY';
Tokenizer.STATE_END_TAG_OPEN            = 'STATE_END_TAG_OPEN';
Tokenizer.STATE_END_TAG_NAME            = 'STATE_END_TAG_NAME';
Tokenizer.STATE_RAWTEXT                 = 'STATE_RAWTEXT';
Tokenizer.STATE_RAWTEXT_LESS_THAN_SIGN  = 'STATE_RAWTEXT_LESS_THAN_SIGN';
Tokenizer.STATE_RAWTEXT_END_TAG_OPEN    = 'STATE_RAWTEXT_END_TAG_OPEN';
Tokenizer.STATE_RAWTEXT_END_TAG_NAME    = 'STATE_RAWTEXT_END_TAG_NAME';
Tokenizer.STATE_BEFORE_ATTR_KEY         = 'STATE_BEFORE_ATTR_KEY';
Tokenizer.STATE_ATTR_KEY                = 'STATE_ATTR_KEY';
Tokenizer.STATE_BEFORE_ATTR_VALUE       = 'STATE_BEFORE_ATTR_VALUE';
Tokenizer.STATE_ATTR_VALUE              = 'STATE_ATTR_VALUE';
Tokenizer.STATE_AFTER_ATTR_VALUE        = 'STATE_AFTER_ATTR_VALUE';

var state = {},
    Token = structure.Token,
    CharTester = structure.CharTester;

//////////////////////////////////////////////////////////////////////////////
// Tokenizer methods:

Tokenizer.prototype = {
  reset: function () {
    this.state = Tokenizer.STATE_DATA;
    this.tok = null;
    this.buffer = '';
    this.prevStartTagToken = null;
    this.attrDelimiter = null;
  },

  tokenize: function (input) {
    var stream = new structure.CharStream(input),
        innings = 0;

    while (true) {
      if (this.parser.document.debug) {
        this.parser.debug(this.state + '.tokenize(' + stream.next() + ')');
      }

      if (undefined === state[this.state]) {
        throw new Error('Unexpected tokenizer state: ' + this.state);
      }

      state[this.state](this, stream);

      innings++;

      if (3000 < innings) {
        throw new Error('Tokenizer running wild?');
      }

      if (Tokenizer.STATE_EOF === this.state) {
        return;
      }
    }

    if (Tokenizer.STATE_EOF !== this.state) {
      throw new Error('The tokenizer did not finish (state was '+this.state+', but should be STATE_EOF)');
    }
  },

  emit: function (tok) {
    if (! tok) {
      tok = this.tok;
      this.tok = null;
    }

    if (this.tok) {
      throw new Error('The tokenizer has an unemitted token');
    }

    if (Token.START_TAG === tok.type) {
      this.prevStartTagToken = tok;
    }

    this.parser.handleToken(tok);
  },

  currentEndTagIsAppropriate: function () {
    if (Token.END_TAG !== this.tok.type) {
      throw new Error('The current token is not an end tag: ' + this.tok.type);
    }
    return this.prevStartTagToken && this.tok.name === this.prevStartTagToken.name;
  },

  setState: function (state) {
    if (undefined === state) {
      throw new Error('Cannot set undefined state');
    }
    this.state = state;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Data state:

state[Tokenizer.STATE_DATA] = function (tok, stream) {
  var chr = stream.consume();

  switch (true) {

    case '&' === chr:
      tok.setState(Tokenizer.STATE_CHAR_REF_IN_DATA);
      break;

    case '<' === chr:
      tok.setState(Tokenizer.STATE_TAG_OPEN);
      break;

    case -1 === chr:
      tok.setState(Tokenizer.STATE_EOF);
      tok.emit({
        type: Token.EOF
      });
      break;

    case tok.openExprDelim === chr + stream.next(tok.openExprDelim.length - 1):
      tok.parser.report(
        'exception',
        'Not implemented (STATE_DATA)'
      );
      break;

    case '\0' === chr:
      tok.parser.report(
        'exception',
        'Unexpected NULL character (STATE_DATA)'
      );
      tok.emit({
        type: Token.CHAR,
        data: tok.replacementChar
      });
      break;

    default:
      tok.emit({
        type: Token.CHAR,
        data: chr
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Markup declaration open state:

state[Tokenizer.STATE_MARKUP_DECLARATION_OPEN] = function (tok, stream) {
  // var chr = stream.consume();
  

  switch (true) {
    case '--' === stream.next(2):
    // case '!--' === '!' + chr + stream.next():
      stream.shift(2);
      tok.tok = {
          type: Token.COMMENT,
          data: '',
      };
      tok.setState(Tokenizer.STATE_COMMENT_START);
      break;

    case 'DOCTYPE' === String(stream.next(7)).toUpperCase():
    // case 'DOCTYPE' === 'D' + String(stream.next(6)).toUpperCase():
      stream.shift(7);
      tok.setState(Tokenizer.STATE_DOCTYPE);
      break;

    default:
      var chr = stream.next();
      tok.parser.report(
        'error',
        'Unexpected character: ' + chr + ' (STATE_MARKUP_DECLARATION_OPEN)'
      );
      tok.setState(Tokenizer.STATE_BOGUS_COMMENT);
      if (-1 !== chr) {
          tok.buffer = chr;
      }
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Comment start state:

state[Tokenizer.STATE_COMMENT_START] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case '-' === chr:
      stream.consume();
      tok.setState(Tokenizer.STATE_COMMENT_START_DASH);
      break;

    case '\0' === chr:
      stream.consume();
      tok.parser.report(
        'error',
        'Unexpected NULL character (STATE_COMMENT_START)'
      );
      tok.tok.data += tok.replacementChar;
      break;

    case '>' === chr:
      stream.consume();
      tok.parser.report(
        'error',
        'Unexpected > character (STATE_COMMENT_START)'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      break;

    case -1 === chr:
      tok.parser.report(
        'error',
        'Unexpected EOF (STATE_COMMENT_START)'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      // stream.shift(-1);
      break;

    default:
      stream.consume();
      tok.tok.data += chr;
      tok.setState(Tokenizer.STATE_COMMENT);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Comment start dash state:

state[Tokenizer.STATE_COMMENT_START_DASH] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case '-' === chr:
      stream.consume();
      tok.setState(Tokenizer.STATE_COMMENT_END);
      break;

    case '\0' === chr:
      stream.consume();
      tok.parser.report(
          'error',
          'Unexpected NULL character in STATE_COMMENT_START_DASH'
      );
      tok.tok.data += '-' + tok.replacementChar;
      tok.setState(Tokenizer.STATE_COMMENT);
      break;

    case '>' === chr:
      stream.consume();
      tok.parser.report(
          'error',
          'Unexpected > character in STATE_COMMENT_START_DASH'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      break;

    case -1 === chr:
      tok.parser.report(
          'error',
          'Unexpected EOF character in STATE_COMMENT_START_DASH'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      // stream.shift(-1);
      break;

    default:
      stream.consume();
      tok.tok.data += '-' + chr;
      tok.setState(Tokenizer.STATE_COMMENT);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Comment state:

state[Tokenizer.STATE_COMMENT] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case '-' === chr:
      stream.consume();
      tok.setState(Tokenizer.STATE_COMMENT_END_DASH);
      break;

    case '\0' === chr:
      stream.consume();
      tok.parser.report(
        'error',
        'Encountered NULL character (STATE_COMMENT)'
      );
      tok.tok.data += tok.replacementChar;
      break;

    case -1 === chr:
      tok.parser.report(
        'error',
        'Encountered EOF (STATE_COMMENT)'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      break;

    default:
      stream.consume();
      tok.tok.data += chr;
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Comment end dash state:

state[Tokenizer.STATE_COMMENT_END_DASH] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case '-' === chr:
      tok.setState(Tokenizer.STATE_COMMENT_END);
      break;

    default:
      tok.tok.data += chr;
      tok.setState(Tokenizer.STATE_COMMENT);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Comment end state:

state[Tokenizer.STATE_COMMENT_END] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case '>' === chr:
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      break;

    case '\0' === chr:
      tok.parser.report(
        'error',
        'Unexpected NULL character (STATE_COMMENT_END)'
      );
      tok.tok.data += '--' + tok.replacementChar;
      tok.setState(Tokenizer.STATE_COMMENT);
      break;

    case '!' === chr:
      tok.parser.report(
        'error',
        'Unexpected `!` (STATE_COMMENT_END)'
      );
      tok.setState(Tokenizer.STATE_COMMENT_END_BANG);
      break;

    case '-' === chr:
      tok.parser.report(
        'error',
        'Unexpected `-` (STATE_COMMENT_END)'
      );
      tok.tok.data += '-';
      break;

    case -1 === chr:
      tok.parser.report(
        'error',
        'Unexpected EOF (STATE_COMMENT_END)'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit();
      break;

    default:
      tok.parser.report(
          'error',
          'Unexpected character: ' + chr + ' (STATE_COMMENT_END)'
      );
      tok.tok.data += '--' + chr;
      tok.setState(Tokenizer.STATE_COMMENT);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Bogus comment state:

state[Tokenizer.STATE_BOGUS_COMMENT] = function (tok, stream) {
  var chr = '',
      buf = '';
  while ('>' !== chr && -1 !== chr) {
    chr = stream.consume();
    if (-1 !== chr) {
      buf += ('\0' === chr ? tok.replacementChar : chr);
    }
  }
  stream.consume();
  tok.emit({
    type: Token.COMMENT,
    data: buf
  });
  tok.state = Tokenizer.STATE_DATA;
};

//////////////////////////////////////////////////////////////////////////////
// Tag open state:

state[Tokenizer.STATE_TAG_OPEN] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case '!' === chr:
      tok.setState(Tokenizer.STATE_MARKUP_DECLARATION_OPEN);
      break;

    case '/' === chr:
      tok.setState(Tokenizer.STATE_END_TAG_OPEN);
      break;

    case '>' === chr:
      tok.emit({
        type: Token.CHAR,
        data: '<>',
      });
      tok.setState(Tokenizer.STATE_DATA);
      break;

    case '<' === chr:
      tok.emit({
        type: Token.CHAR,
        data: '<',
      });
      break;

    case CharTester.isWhiteSpace(chr):
      tok.emit({
        type: Token.CHAR,
        data: '<'.chr,
      });
      tok.setState(Tokenizer.STATE_DATA);
      break;

    case CharTester.isUpperCase(chr):
      tok.tok = {
        type: Token.START_TAG,
        name: chr.toLowerCase(),
        offset: stream.pointer - 2,
      };
      tok.setState(Tokenizer.STATE_TAG_NAME);
      break;

    case CharTester.isLowerCase(chr):
      tok.tok = {
        type: Token.START_TAG,
        name: chr,
        offset: stream.pointer - 2,
      };
      tok.setState(Tokenizer.STATE_TAG_NAME);
      break;

    case '?' === chr:
      tok.parser.report('exception', 'Unexpected character in tag open: ? (STATE_TAG_OPEN)');
      tok.setState(Tokenizer.STATE_BOGUS_COMMENT);
      tok.buffer = chr;
      break;

    case -1 === chr:
      tok.parser.report('notice', 'Unexpected EOF in tag open (STATE_TAG_OPEN)');
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.CHAR,
        data: '&lt;'
      });
      break;

    default:
      tok.parser.report('notice', 'Unexpected character in tag open: ' + chr + ' (STATE_TAG_OPEN)');
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.CHAR,
        data: '&lt;'.chr,
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Tag name state:

state[Tokenizer.STATE_TAG_NAME] = function (tok, stream) {
  var chr = stream.consume(),
      tmp;
  switch (true) {
    case CharTester.isUpperCase(chr):
      chr = chr.toLowerCase();
      tok.tok.name += chr;
      break;

    case CharTester.isLowerCase(chr):
    case CharTester.isNumber(chr):
      tok.tok.name += chr;
      break;

    case CharTester.isWhiteSpace(chr):
      // tok.parser.report('exception', 'not implemented');
      tok.emit();
      tok.setState(Tokenizer.STATE_BEFORE_ATTR_KEY);
      break;

    case '>' === chr:
      tok.emit();
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.START_TAG_CLOSE,
        selfClosing: false,
        offset: stream.pointer,
      });
      break;

    case '/' === chr:
      tok.emit();
      tok.setState(Tokenizer.STATE_SELF_CLOSING_START_TAG);
      break;

    case -1 === chr:
      tok.parser.report('notice', 'Unexpected EOF in tag name');
      tmp = tok.tok.name;
      tok.tok = null;
      tok.emit({
        type: Token.CHAR,
        data: '&lt;' + tmp
      });
      // tok.tok = null;
      tok.setState(Tokenizer.STATE_DATA);
      break;

    default:
      tok.parser.report('notice', 'Unexpected character in tag name: ' + chr);
      tmp = tok.tok.name;
      tok.tok = null;
      tok.emit({
        type: Token.CHAR,
        data: '&lt;' + tmp + chr
      });
      tok.setState(Tokenizer.STATE_DATA);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// End tag open state:

state[Tokenizer.STATE_END_TAG_OPEN] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case CharTester.isUpperCase(chr):
      // chr = strtolower(chr);
      tok.tok = {
        type: Token.END_TAG,
        name: chr.toLowerCase(),
        innerOffset: stream.pointer - 3,
      };
      tok.setState(Tokenizer.STATE_END_TAG_NAME);
      break;

    case CharTester.isLowerCase(chr):
      tok.tok = {
        type: Token.END_TAG,
        name: chr,
        innerOffset: stream.pointer - 3,
      };
      tok.setState(Tokenizer.STATE_END_TAG_NAME);
      break;

    case -1 === chr:
      tok.emit({
        type: Token.CHAR,
        data: '&lt;/'
      });
      tok.setState(Tokenizer.STATE_DATA);
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character in end tag open: ' + chr
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// End tag name state:

state[Tokenizer.STATE_END_TAG_NAME] = function (tok, stream) {
  var chr = stream.consume(),
      tmp;
  switch (true) {
    case CharTester.isUpperCase(chr):
      tok.tok.name += chr.toUpperCase();
      break;

    case CharTester.isLowerCase(chr):
    case CharTester.isNumber(chr):
      tok.tok.name += chr;
      break;

    case '>' === chr:
      tok.tok.outerOffset = stream.pointer;
      tok.emit();
      tok.setState(Tokenizer.STATE_DATA);
      break;

    case -1 === chr:
      tmp = tok.tok.name;
      tok.tok = null;
      tok.emit({
        type: Token.CHAR,
        data: '&lt;/' + tmp
      });
      tok.setState(Tokenizer.STATE_DATA);
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character in end tag name: ' + chr
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Raw text state:

state[Tokenizer.STATE_RAWTEXT] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {

    case '<' === chr:
      tok.setState(Tokenizer.STATE_RAWTEXT_LESS_THAN_SIGN);
      break;

    case '\0' === chr:
      tok.parser.report(
        'error',
        'Unexpected NULL characted in rawtext (STATE_RAWTEXT)'
      );
      tok.emit({
        type: Token.CHAR,
        data: tok.replacementChar
      });
      break;

    case -1 === chr:
      tok.emit({
        type: Token.EOF
      });
      tok.setState(Tokenizer.STATE_DATA);
      break;

    default:
      tok.emit({
        type: Token.CHAR,
        data: chr
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Raw text less than sign state:

state[Tokenizer.STATE_RAWTEXT_LESS_THAN_SIGN] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case '/' === chr:
      stream.consume();
      tok.buffer = '';
      tok.setState(Tokenizer.STATE_RAWTEXT_END_TAG_OPEN);
      break;

    default:
      tok.setState(Tokenizer.STATE_RAWTEXT);
      tok.emit({
        type: Token.CHAR,
        data: '<'
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Raw text end tag open state:

state[Tokenizer.STATE_RAWTEXT_END_TAG_OPEN] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case CharTester.isUpperCase(chr):
      stream.consume();
      tok.tok = {
        type: Token.END_TAG,
        name: chr.toLowerCase()
      };
      tok.buffer += chr;
      tok.setState(Tokenizer.STATE_RAWTEXT_END_TAG_NAME);
      break;

    case CharTester.isLowerCase(chr):
      stream.consume();
      tok.tok = {
        type: Token.END_TAG,
        name: chr
      };
      tok.buffer += chr;
      tok.setState(Tokenizer.STATE_RAWTEXT_END_TAG_NAME);
      break;

    default:
      tok.setState(Tokenizer.STATE_RAWTEXT);
      tok.emit({
        type: Token.CHAR,
        data: '</'
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Raw text end tag name state:

state[Tokenizer.STATE_RAWTEXT_END_TAG_NAME] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case CharTester.isWhiteSpace(chr):
      if (tok.currentEndTagIsAppropriate()) {
        stream.consume();
        tok.setState(Tokenizer.STATE_BEFORE_ATTR_KEY);
      } else {
        tok.setState(Tokenizer.STATE_RAWTEXT);
        tok.tok = null;
        tok.emit({
          type: Token.CHAR,
          data: '</' + tok.buffer
        });
      }
      break;

    case '/' === chr:
      if (tok.currentEndTagIsAppropriate()) {
        stream.consume();
        tok.setState(Tokenizer.STATE_SELF_CLOSING_START_TAG);
      } else {
        tok.setState(Tokenizer.STATE_RAWTEXT);
        tok.tok = null;
        tok.emit({
          type: Token.CHAR,
          data: '</' + tok.buffer
        });
      }
      break;

    case '>' === chr:
      if (tok.currentEndTagIsAppropriate()) {
        stream.consume();
        tok.setState(Tokenizer.STATE_DATA);
        tok.emit();
      } else {
        tok.setState(Tokenizer.STATE_RAWTEXT);
        tok.tok = null;
        tok.emit({
          type: Token.CHAR,
          data: '</' + tok.buffer
        });
      }
      break;

    case CharTester.isUpperCase(chr):
      stream.consume();
      tok.tok.name += chr.toLowerCase();
      tok.buffer += chr;
      break;

    case CharTester.isLowerCase(chr):
      stream.consume();
      tok.tok.name += chr;
      tok.buffer += chr;
      break;

    default:
      tok.setState(Tokenizer.STATE_RAWTEXT);
      tok.tok = null;
      tok.emit({
        type: Token.CHAR,
        data: '</' + tok.buffer
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Before attr key state:

state[Tokenizer.STATE_BEFORE_ATTR_KEY] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {

    case CharTester.isWhiteSpace(chr):
      break; // ignore

    case CharTester.isUpperCase(chr):
      tok.tok = {
        type: Token.ATTR_KEY,
        name: chr.toLowerCase()
      };
      tok.setState(Tokenizer.STATE_ATTR_KEY);
      break;

    case CharTester.isLowerCase(chr):
      tok.tok = {
        type: Token.ATTR_KEY,
        name: chr
      };
      tok.setState(Tokenizer.STATE_ATTR_KEY);
      break;

    case -1 === chr:
      tok.parser.report(
        'error',
        'Unexpected end of file before attribute key: ' + chr + ' (STATE_BEFORE_ATTR_KEY)'
      );
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.START_TAG_CLOSE,
        offset: -1
      });
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character before attribute key: ' + chr + ' (STATE_BEFORE_ATTR_KEY)'
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Attr key state:

state[Tokenizer.STATE_ATTR_KEY] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case '=' === chr:
      tok.emit();
      tok.setState(Tokenizer.STATE_BEFORE_ATTR_VALUE);
      break;

    case CharTester.isUpperCase(chr):
    case CharTester.isLowerCase(chr):
    case '-' === chr:
      tok.tok.name += chr.toLowerCase();
      break;

    case -1 === chr:
      tok.parser.report(
        'exception',
        'Unexpected end of file before attribute key: ' + chr + ' (STATE_ATTR_KEY)'
      );
      // tok.setState(Tokenizer.STATE_DATA);
      // tok.emit({
      //   type: Token.START_TAG_CLOSE,
      //   offset: -1
      // });
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character in attribute key: ' + chr + ' (STATE_ATTR_KEY)'
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Before attr value state:

state[Tokenizer.STATE_BEFORE_ATTR_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case CharTester.isWhiteSpace(chr):
      break; // Ignore

    case '[' === chr:
      tok.emit({
        type: Token.START_ARR
      });
      tok.setState(Tokenizer.STATE_AFTER_ATTR_VALUE);
      tok.pushState(Tokenizer.BEFORE_JSON_ARRAY_VALUE);
      break;

    case '{' === chr:
      tok.emit({
        type: Token.START_OBJ
      });
      tok.setState(Tokenizer.STATE_AFTER_ATTR_VALUE);
      tok.pushState(Tokenizer.BEFORE_JSON_OBJECT_KEY);
      break;

    case '"' === chr:
    case '\'' === chr:
      tok.attrDelimiter = chr;
      tok.emit({
        type: Token.START_ATTR_VALUE
      });
      tok.setState(Tokenizer.STATE_ATTR_VALUE);
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character before attribute value: ' + chr
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Attr value state:

state[Tokenizer.STATE_ATTR_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case tok.attrDelimiter === chr:
      tok.emit({
        type: Token.END_ATTR_VALUE
      });
      tok.setState(Tokenizer.STATE_AFTER_ATTR_VALUE);
      break;

    case -1 === chr:
      tok.emit({
        type: Token.END_ATTR_VALUE
      });
      tok.setState(Tokenizer.STATE_AFTER_ATTR_VALUE);
      tok.parser.report(
        'error',
        'Unexpected EOF in attribute value'
      );
      break;

    default:
      tok.emit({
        type: Token.CHAR,
        data: chr
      });
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Attr value state:

state[Tokenizer.STATE_AFTER_ATTR_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case CharTester.isWhiteSpace(chr):
      tok.setState(Tokenizer.STATE_BEFORE_ATTR_KEY);
      break;

    case '>' === chr:
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.START_TAG_CLOSE,
        selfClosing: false,
        offset: stream.getPointer()
      });
      break;

    case -1 === chr:
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.START_TAG_CLOSE,
        selfClosing: false,
        offset: stream.getPointer()
      });
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character after attribute value: ' + chr
      );
      break;
  }
};

function TreeConstructor(prs) {
  if (! prs) {
    throw new Error('Missing `parser` for TreeConstructor');
  }
  this.parser = prs;
  this.reset();
}

// exports
var mode = {},
    // struct = structure || (structure = {}),
    Token = structure.Token,
    // Node = structure.Node,
    CharTester = structure.CharTester;

// exports
structure.TreeConstructor = TreeConstructor;

// constants
TreeConstructor.MODE_INITIAL      = 'MODE_INITIAL';
TreeConstructor.MODE_BEFORE_HTML  = 'MODE_BEFORE_HTML';
TreeConstructor.MODE_BEFORE_HEAD  = 'MODE_BEFORE_HEAD';
TreeConstructor.MODE_IN_HEAD      = 'MODE_IN_HEAD';
TreeConstructor.MODE_AFTER_HEAD   = 'MODE_AFTER_HEAD';
TreeConstructor.MODE_IN_BODY      = 'MODE_IN_BODY';
TreeConstructor.MODE_AFTER_BODY   = 'MODE_AFTER_BODY';
TreeConstructor.MODE_AFTER_HTML   = 'MODE_AFTER_HTML';
TreeConstructor.MODE_IN_START_TAG = 'MODE_IN_START_TAG';
TreeConstructor.MODE_IN_TEXT      = 'MODE_IN_TEXT';
TreeConstructor.MODE_ATTR_VALUE   = 'MODE_ATTR_VALUE';

TreeConstructor.prototype = {
  reset: function () {
    this.mode = TreeConstructor.MODE_INITIAL;
    this.nodeStack = [];
    this.modeStack = [];
    this.pushNode(this.parser.document);
  },

  handleToken: function (tok) {

    if (undefined === this.mode) {
      throw new Error('The tree constructor\'s mode cannot be undefined');
    }

    if (! tok) {
      throw new Error('Token must be provided');
    }

    if (typeof tok !== 'object') {
      throw new Error('Token must be an object');
    }

    if (undefined === tok.type) {
      throw new Error('Token type cannot be undefined');
    }

    if (this.parser.document.debug) {
      this.parser.debug(this.mode + '.handleToken(' + tok.type + ')');
    }

    if (undefined === mode[this.mode]) {
      throw new Error('Unknown tree constructor mode: ' + this.mode);
    }

    mode[this.mode](this, tok);
  },

  setMode: function (mode) {
    if (undefined === mode) {
      throw new Error('Cannot set undefined mode');
    }
    this.mode = mode;
  },

  pushMode: function (mode) {
    if (undefined === mode) {
      throw new Error('cannot push undefined mode');
    }
    this.modeStack.push(this.mode);
    this.mode = mode;
  },

  popMode: function () {
    if (! this.modeStack.length) {
      throw new Error('The mode stack is already empty');
    }

    this.mode = this.modeStack.pop();

    if (undefined === this.mode) {
      throw new Error('cannot pop undefined mode');
    }
  },

  pushNode: function (node) {
    this.nodeStack.push(node);
    this.node = node;
  },

  popNode: function () {
    if (! this.nodeStack.length) {
      throw new Error('The node stack is already empty');
    }

    var node = this.nodeStack.pop();
    this.node = this.nodeStack[this.nodeStack.length-1];
    return node;
  },

  insertElement: function (name) {
    var node = this.parser.document.createElement(name);
    this.node.appendChild(node);
    this.pushNode(node);
    return node;
  },

  insertChar: function (data) {
    var node = this.parser.document.createText(data);
    if (this.node.lastChild && structure.Node.NODE_TEXT === this.node.lastChild.type) {
      this.node.lastChild.appendData(data);
    } else {
      this.node.appendChild(node);
    }
    if (! CharTester.isWhiteSpace(data)) {
      this.node.lastChild.whiteSpace = false;
    }
    return node;
  },

  insertComment: function (data) {
    var node = this.parser.document.createComment(data);
    this.node.appendChild(node);
    return node;
  },

  insertAttr: function (name) {
    var node = this.parser.document.createAttr(name);
    this.node.appendAttr(node);
    this.pushNode(node);
    return node;
  },

  assertTitleElementExists: function () {
    if (! this.parser.document.titleElement) {
      this.insertElement('title');
      this.popNode();
    }
  }
};

//////////////////////////////////////////////////////////////////////////////
// Initial mode

mode[TreeConstructor.MODE_INITIAL] = function (scope, tok) {
  switch (true) {
    case Token.COMMENT === tok.type || Token.CHAR && CharTester.isWhiteSpace(tok.data):
      break; // ignore

    case Token.DOCTYPE === tok.type:
      scope.parser.report(
        'debug',
        'Insert <!DOCTYPE ' + tok.name + '> (MODE_INITIAL)'
      );
      scope.insertDoctype(tok.name);
      scope.setMode(TreeConstructor.MODE_BEFORE_HTML);
      break;

    default:
      scope.parser.report(
        'debug',
        'Force insert <!DOCTYPE html> (MODE_INITIAL)'
      );
      scope.setMode(TreeConstructor.MODE_BEFORE_HTML);
      scope.handleToken(tok);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Before html mode

mode[TreeConstructor.MODE_BEFORE_HTML] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
      scope.insertChar(tok.data);
      break;

    case Token.START_TAG === tok.type:
      if ('html' === tok.name) {
        scope.parser.report('debug', 'Inserting <html> (MODE_BEFORE_HTML)');
        scope.insertElement('html');
        scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
      } else {
        scope.parser.report(
          'debug', 
          'Inserting <html> before attempting to insert <' + tok.name + '> (MODE_BEFORE_HTML)'
        );
        scope.insertElement('html');
        scope.setMode(TreeConstructor.MODE_BEFORE_HEAD);
        scope.handleToken(tok);
      }
      break;

    case Token.START_TAG_CLOSE === tok.type:
      scope.setMode(TreeConstructor.MODE_BEFORE_HEAD);
      scope.node.setInnerStartOffset(tok.offset);
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    default:
      scope.parser.report(
        'debug', 
        'Inserting <html> before proceeding to handle token: ' + tok.type + ' (MODE_BEFORE_HTML)'
      );
      scope.insertElement('html');
      scope.setMode(TreeConstructor.MODE_BEFORE_HEAD);
      scope.handleToken(tok);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Before head mode

mode[TreeConstructor.MODE_BEFORE_HEAD] = function (scope, tok) {
  // var node;
  switch (true) {
    case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
      scope.insertChar(tok.data);
      break;

    case Token.START_TAG === tok.type:
      if ('head' === tok.name) {
        scope.parser.report(
          'debug',
          'Inserting <head> (MODE_BEFORE_HEAD)'
        );
        scope.insertElement('head');
        scope.node.setOuterStartOffset(tok.offset);
        scope.setMode(TreeConstructor.MODE_IN_HEAD);
        scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
      } else {
        scope.parser.report(
          'debug',
          'Inserting <head> before attempting to insert <' + tok.name + '> (MODE_BEFORE_HEAD)'
        );
        scope.insertElement('head');
        scope.setMode(TreeConstructor.MODE_IN_HEAD);
        scope.handleToken(tok);
      }
      break;

    case Token.START_TAG_CLOSE === tok.type:
      // console.log(Token);
      scope.node.setInnerStartOffset(tok.offset);
      scope.setMode(TreeConstructor.MODE_IN_HEAD);
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    default:
      scope.parser.report(
        'debug',
        'Inserting <head> before proceeding to handle token: ' + tok.type + ' (MODE_BEFORE_HEAD)'
      );
      scope.insertElement('head');
      scope.setMode(TreeConstructor.MODE_IN_HEAD);
      scope.handleToken(tok);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// In head mode

mode[TreeConstructor.MODE_IN_HEAD] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
      scope.insertChar(tok.data);
      break; // ignore

    case Token.END_TAG === tok.type:
      if ('head' === tok.name) {
        scope.parser.report(
          'debug',
          'Inserting </head> (MODE_IN_HEAD)'
        );
        scope.setMode(TreeConstructor.MODE_AFTER_HEAD);
        scope.node.setInnerEndOffset(tok.innerOffset);
        scope.node.setOuterEndOffset(tok.outerOffset);
        scope.popNode();
      } else {
        scope.parser.report(
          'exception',
          'Unexpected end tag: </' + tok.name + '>'
        );
      }
      break;

    case Token.START_TAG === tok.type:
      // console.log(tok.name);
      if (scope.node.mayContain(tok.name)) {
        scope.insertElement(tok.name);
        scope.node.setOuterStartOffset(tok.offset);
        scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
      } else {
        scope.parser.report(
          'debug',
          'Inserting </head> before attempting to insert <' + tok.name + '> (MODE_IN_HEAD)'
        );
        while ('head' !== scope.node.name) {
          scope.popNode();
        }
        scope.popNode();
        scope.setMode(TreeConstructor.MODE_AFTER_HEAD);
        scope.handleToken(tok);
      }
      break;

    case Token.START_TAG_CLOSE === tok.type:
      scope.parser.report(
        'debug',
        'End start tag: <' + scope.node.name + '> (MODE_IN_HEAD)'
      );
      scope.node.setInnerStartOffset(tok.offset);
      if (-1 < [ 'title', 'script', 'style' ].indexOf(scope.node.name)) {
        scope.pushMode(TreeConstructor.MODE_IN_TEXT);
        scope.parser.tokenizer.setState(structure.Tokenizer.STATE_RAWTEXT);
      } else {
        // console.log(tok, scope.node);
        if (scope.node.isVoidElement()) {
          scope.popNode();
        }
      }
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    default:
      scope.parser.report(
        'debug',
        'Inserting </head> before continuing to process token: ' + tok.type + ' (MODE_IN_HEAD)'
      );
      while ('head' !== scope.node.name) {
        scope.popNode();
      }
      scope.assertTitleElementExists();
      scope.popNode();
      scope.setMode(TreeConstructor.MODE_AFTER_HEAD);
      scope.handleToken(tok);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// After head mode

mode[TreeConstructor.MODE_AFTER_HEAD] = function (scope, tok) {
  // var node;
  switch (true) {
    case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
      scope.insertChar(tok.data);
      break;

    case Token.START_TAG === tok.type:
      if ('body' === tok.name) {
        scope.parser.report(
          'debug',
          'Inserting <body> (MODE_AFTER_HEAD)'
        );
        scope.insertElement('body');
        scope.node.setOuterStartOffset(tok.offset);
        scope.setMode(TreeConstructor.MODE_IN_BODY);
        scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
      } else {
        scope.parser.report(
          'debug',
          'Inserting <body> before attempting to insert <' + tok.name + '> (MODE_AFTER_HEAD)'
        );
        scope.insertElement('body');
        scope.setMode(TreeConstructor.MODE_IN_BODY);
        scope.handleToken(tok);
      }
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    default:
      scope.parser.report(
        'debug',
        'Inserting <body> before proceeding to handle token: ' + tok.type + ' (MODE_AFTER_HEAD)'
      );
      scope.insertElement('body');
      scope.setMode(TreeConstructor.MODE_IN_BODY);
      scope.handleToken(tok);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// In body mode

mode[TreeConstructor.MODE_IN_BODY] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type:
      scope.insertChar(tok.data);
      break;

    case Token.START_TAG === tok.type:
      if (scope.node.mayContain(tok.name)) {
        // console.log(tok);
        scope.parser.report(
          'debug',
          'Inserting <'+tok.name+'> (MODE_IN_BODY)'
        );
        scope.insertElement(tok.name);
        scope.node.setOuterStartOffset(tok.offset);
        scope.pushMode(TreeConstructor.MODE_IN_START_TAG);
      } else {
        scope.parser.report(
          'exception',
          'Unexpected start tag in ' + scope.node.name + ': ' + tok.name + ' (MODE_IN_BODY)'
        );
      }
      break;

    case Token.START_TAG_CLOSE === tok.type:
      if (scope.node.isVoidElement() || tok.selfClosing) {
        scope.parser.report(
          'debug',
          'Self-closing <' + scope.node.name + '>'
        );
        scope.popNode();
      }
      scope.node.setInnerStartOffset(tok.offset);
      break;

    case Token.END_TAG === tok.type:
      switch (tok.name) {
        case 'body':
        case 'html':
          while ('body' !== scope.node.name) {
            scope.parser.report(
              'debug',
              'Inserting </' + scope.node.name + '> (MODE_IN_BODY)'
            );
            scope.node.setInnerEndOffset(tok.innerOffset);
            scope.node.setOuterEndOffset(tok.outerOffset);
            scope.popNode();
          }
          scope.parser.report(
            'debug',
            'Inserting </body> (MODE_IN_BODY)'
          );
          scope.node.setInnerEndOffset(tok.innerOffset);
          scope.node.setOuterEndOffset(tok.outerOffset);
          scope.popNode();
          scope.setMode(TreeConstructor.MODE_AFTER_BODY);
          if ('html' === tok.name) {
            scope.handleToken(tok);
          }
          break;

        default:
          if (tok.name === scope.node.name) {
            scope.node.setInnerEndOffset(tok.innerOffset);
            scope.node.setOuterEndOffset(tok.outerOffset);
            scope.popNode();
          } else {
            scope.parser.report(
              'exception',
              'Unexpected end tag </' + tok.name + '> in <' + scope.node.name + '> (MODE_IN_BODY)'
            );
          }
          break;
      }
      break;

    case Token.EOF === tok.type:
      scope.parser.report(
        'debug',
        'Inserting </body> at end of file (MODE_IN_BODY)'
      );
      while ('body' !== scope.node.name) {
        scope.popNode();
      }
      scope.setMode(TreeConstructor.MODE_AFTER_BODY);
      scope.handleToken(tok);
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    case Token.EXPR_OPEN === tok.type:
      scope.insertExpr();
      scope.pushMode(TreeConstructor.MODE_IN_EXPR);
      break;

    default:
      scope.parser.report(
        'exception',
        'Unexpected token in body: ' + tok.type
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// After body mode

mode[TreeConstructor.MODE_AFTER_BODY] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
      scope.insertChar(tok.data);
      break;

    case Token.EOF === tok.type:
      scope.parser.report(
        'debug',
        'Inserting </html> at end of file (MODE_AFTER_BODY)'
      );
      while ('html' !== scope.node.name) {
        scope.popNode();
      }
      scope.setMode(TreeConstructor.MODE_AFTER_HTML);
      scope.handleToken(tok);
      break;

    case Token.END_TAG === tok.type:
      if ('html' === tok.name) {
        while ('html' !== scope.node.name) {
          scope.node.setInnerEndOffset(tok.innerOffset);
          scope.node.setOuterEndOffset(tok.outerOffset);
          scope.popNode();
        }
        scope.node.setInnerEndOffset(tok.innerOffset);
        scope.node.setOuterEndOffset(tok.outerOffset);
        scope.popNode();
        scope.setMode(TreeConstructor.MODE_AFTER_HTML);
      } else {
        scope.parser.report(
          'exception',
          'Unexpected end tag </' + tok.name + '> (MODE_AFTER_BODY)'
        );
      }
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    case Token.START_TAG === tok.type:
      scope.parser.report(
        'error',
        'Unexpected start tag <' + tok.name + '> after body (MODE_AFTER_BODY)'
      );
      scope.setMode(TreeConstructor.MODE_IN_BODY);
      scope.pushNode(scope.parser.document.bodyElement); // reinsert the body element to the stack of open element
      scope.handleToken(tok);
      break;

    default:
      scope.parser.report(
        'exception',
        'Unexpected token after body: ' + tok.type
      );
      scope.setMode(TreeConstructor.MODE_IN_BODY);
      scope.pushNode(scope.parser.document.bodyElement); // reinsert the body element to the stack of open element
      scope.handleToken(tok);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// In start tag mode

mode[TreeConstructor.MODE_IN_START_TAG] = function (scope, tok) {
  switch (true) {
    case Token.START_TAG_CLOSE === tok.type:
      scope.popMode();
      if (structure.Node.NODE_ATTR === scope.node.type) {
        scope.popNode();
      }
      scope.handleToken(tok);
      break;

    case Token.START_ARR === tok.type:
      scope.insertArray();
      scope.pushMode(TreeConstructor.MODE_ARR);
      break;

    case Token.START_OBJ === tok.type:
      scope.insertObject();
      scope.pushMode(TreeConstructor.MODE_OBJ);
      break;

    case Token.ATTR_KEY === tok.type:
      while (structure.Node.NODE_ATTR === scope.node.type) {
        scope.popNode();
      }
      if (scope.node.mayContainAttribute(tok.name)) {
        scope.insertAttr(tok.name);
      } else {
        scope.insertAttr('data-' + tok.name);
      }
      break;

    case Token.START_ATTR_VALUE === tok.type:
      scope.pushMode(TreeConstructor.MODE_ATTR_VALUE);
      break;

    default:
      scope.parser.report(
        'exception',
        'Unexpected token in start tag mode: ' . tok.type
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// After html mode

mode[TreeConstructor.MODE_AFTER_HTML] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type && CharTester.isWhiteSpace(tok.data):
      scope.insertChar(tok.data);
      break;

    case Token.COMMENT === tok.type:
      scope.insertComment(tok.data);
      break;

    case Token.EOF === tok.type:
      // DONE!
      // stop parsing
      break;

    // case Token.END_TAG === tok.type:
    //   if ('html' === tok.name) {
    //     while ('html' !== scope.node.name) {
    //       scope.node.setInnerEndOffset(tok.innerOffset);
    //       scope.node.setOuterEndOffset(tok.outerOffset);
    //       scope.popNode();
    //     }
    //     scope.node.setInnerEndOffset(tok.innerOffset);
    //     scope.node.setOuterEndOffset(tok.outerOffset);
    //     scope.popNode();
    //     scope.setMode(TreeConstructor.MODE_AFTER_HTML);
    //   } else {
    //     scope.parser.report('exception', 'Unexpected end tag </' + tok.name + '> (MODE_AFTER_BODY)');
    //   }
    //   break;

    // case Token.START_TAG === tok.type:
    //   scope.parser.report('error', 'Unexpected start tag <' + tok.name + '> after body (MODE_AFTER_BODY)');
    //   scope.setMode(TreeConstructor.MODE_IN_BODY);
    //   scope.pushNode(scope.parser.document.bodyElement); // reinsert the body element to the stack of open element
    //   scope.handleToken(tok);
    //   break;

    default:
      scope.parser.report('exception', 'Unexpected token after html: ' + tok.type);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// In text mode

mode[TreeConstructor.MODE_IN_TEXT] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type:
      scope.insertChar(tok.data);
      break;

    case Token.EOF === tok.type:
      scope.parser.report('error', 'Unexpected end of file in text mode (MODE_IN_TEXT)');
      if ('script' === scope.node) {
        scope.node.alreadyStarted = true;
      }
      scope.popNode();
      scope.popMode();
      scope.handleToken(tok);
      break;

    case Token.END_TAG === tok.type:
      if ('script' === tok.name) {
        // TODO
        throw new Error('NOT IMPLEMENTED');
      } else {
        scope.popNode();
        scope.popMode();
      }
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// In attr value mode

mode[TreeConstructor.MODE_ATTR_VALUE] = function (scope, tok) {
  switch (true) {
    case Token.CHAR === tok.type:
      scope.insertChar(tok.data);
      break;

    // case Token.EXPR_OPEN === tok.type:
    //     scope.insertExpr();
    //     scope.pushMode(self::EXPR);
    //     break;

    case Token.END_ATTR_VALUE === tok.type:
      scope.popMode();
      scope.popNode();
      break;

    case Token.EOF === tok.type:
      scope.parser.report(
        'error',
        'Unexpected token in attribute value: ' + tok.type + ' (MODE_ATTR_VALUE)'
      );
      break;

    default:
      scope.parser.report(
        'exception',
        'Unexpected token in attribute value: ' + tok.type + ' (MODE_ATTR_VALUE)'
      );
      break;
  }
};

function Parser(doc) {
  if (! doc) {
    throw new Error('Missing `document` for Parser');
  }
  this.document = doc;
  this.treeConstructor = null;
  this.tokenizer = null;
  this.messages = [];
}

// exports
structure.Parser = Parser;

Parser.prototype = {
  reset: function () {
    if (this.treeConstructor) {
      this.treeConstructor.reset();
    }
    if (this.tokenizer) {
      this.tokenizer.reset();
    }
    this.messages = [];
  },

  parse: function (input) {
    this.getTokenizer().tokenize(input);
  },

  handleToken: function (tok) {
    this.getTreeConstructor().handleToken(tok);
  },

  getTokenizer: function () {
    if (null === this.tokenizer) {
      this.tokenizer = new structure.Tokenizer(this);
    }
    return this.tokenizer;
  },

  getTreeConstructor: function () {
    if (null === this.treeConstructor) {
      this.treeConstructor = new structure.TreeConstructor(this);
    }
    return this.treeConstructor;
  },

  report: function (type, message) {
    if ('exception' === type) {
      throw new Error(message);
    }

    if ('notice' === type) {
      console.warn('>> Parser.NOTICE', message);
    } else if ('error' === type) {
      console.error('>> Parser.ERROR', message);
    } else {
      // TODO
      // if (this.document.debug) {
      //   console.log('>> Parser.' + type.toUpperCase(), message);
      // }
    }

    this.messages.push({
      type: type,
      message: message
    });
  },

  debug: function () {
    var i, len, msg;
    for (i = 0, len = arguments.length; i < len; i++) {
      msg = arguments[i];
      if (typeof msg === 'object') {
        throw new Error('Can\'t debug objects (yet)');
      } else {
        this.report('debug', msg);
      }
    }
  }
};

function Compiler(doc) {
  if (! doc) {
    throw new Error('Missing `document` for Compiler');
  }
  this.document = doc;
}

// exports
structure.Compiler = Compiler;

Compiler.prototype = {
  compile: function () {
    return this.compileNodes(this.document.childNodes);
  },

  compileNodes: function (nodes) {
    var i, len, ret = '';
    for (i = 0, len = nodes.length; i < len; i++) {
      ret += this.compileNode(nodes[i]);
    }
    return ret;
  },

  compileNode: function (node) {
    var ret = '';
    switch (node.type) {
      case structure.Node.NODE_ELEMENT:
        ret += '<';
        ret += node.name;
        ret += this.compileNodes(node.attrs);
        ret += '>';
        if (! node.isVoidElement()) {
          ret += this.compileNodes(node.childNodes);
          ret += '</';
          ret += node.name;
          ret += '>';
        }
        break;

      case structure.Node.NODE_TEXT:
        ret += node.data;
        break;

      case structure.Node.NODE_COMMENT:
        ret += '<!--';
        ret += node.data;
        ret += '-->';
        break;

      case structure.Node.NODE_ATTR:
        ret += ' ';
        ret += node.name;
        ret += '="';
        ret += this.compileNodes(node.childNodes);
        ret += '"';
        break;

      default:
        throw new Error('Unsupported node type in compiler: ' + node.type);
    }
    return ret;
  }
};
})(this);