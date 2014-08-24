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
    },
    allowedMetaAttrs: {
      'scripts': [],
      'style-sheets': [],
      'description': [],
      'keywords': [],
      'author': [],
      'charset': [],
      'application-name': [],
      'generator': []
    }
  },
  head: {
    allowedAttrs: {
      'profile': []
    },
    allowedMetaAttrs: {
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
    allowedMetaAttrs: {
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
          '#phrasing': [],
          'a': [],
          'del': [],
          'ins': [],
          'map': []
        }
      },
      'hr': {
        allowedAttrs: {
          'color': []
        }
      },
      'pre': {
        allowedChildElements: {
          '#phrasing': [],
          'a': [],
          'del': [],
          'ins': [],
          'map': []
        }
      },
      'blockquote': {
        allowedAttrs: {
          'cite': []
        }
      },
      'ol': {
        allowedAttrs: {
          'reversed': [],
          'start': [],
          'type': []
        },
        allowedChildElements: {
          'li': []
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
        allowedChildElements: {
          '#flow' : []
        }
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
          '#flow': []
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
        },
        allowedChildElements: {
          '#flow': [],
          '#phrasing': []
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
        },
        allowedChildElements: {
          '#phrasing': []
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
        },
        allowedChildElements: {
          '#phrasing': []
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
