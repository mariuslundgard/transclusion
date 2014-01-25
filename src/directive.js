(function (_, core) {

  var ruleSet = {

    html: {
      allowedAttrs: {
        manifest: {}
      },
      allowedChildren: {
        head: {},
        body: {}
      }
    },

    head: {
      allowedAttrs: {
        profile: {}
      },
      allowedChildren: {
        title: {
          textOnly: true
        },
        base: {
          allowedAttrs: {
            href: {},
            target: {},
          },
        },
        link: {
          allowedAttrs: {
            crossorigin: {},
            disabled: {},
            href: {},
            hreflang: {},
            media: {},
            methods: {},
            rel: {},
            sizes: {},
            target: {},
            type: {},
          },
        },
        meta: {
          allowedAttrs: {
            charset: { 'utf-8': {} },
            content: {},
            'http-equiv': {},
            name: {},
          },
        },
        style: {
          textOnly: true,
          allowedAttrs: {
            type: {},
            media: {},
            scoped: {},
            title: {},
            disabled: {},
          },
        },

        // Scripting
        script: {
          textOnly: true,
          allowedAttrs: {
            async: {},
            src: {},
            type: {},
            defer: {},
            crossorigin: {},
          },
        },
        noscript: {},
      }
    },

    body: {
      allowedAttrs: {
        onafterprint: null
      },

      allowedChildren: {
        
        script: {
          textOnly: true
        },

        noscript: {},

        section: {
          allowedChildren: {
            '#flow': {}
          }
        },

        nav: {
          allowedChildren: {
            '#flow': {}
          }
        },
        
        article: {
          allowedChildren: {
            '#flow': {}
          }
        },
        
        aside: {
          allowedChildren: {
            '#flow': {}
          }
        },
        
        h1: {
          allowedChildren: {
            '#phrasing': {}
          }
        },

        h2: {
          allowedChildren: {
            '#phrasing': {}
          }
        },
        
        h3: {
          allowedChildren: {
            '#phrasing': {}
          }
        },

        h4: {
          allowedChildren: {
            '#phrasing': {}
          }
        },

        h5: {
          allowedChildren: {
            '#phrasing': {}
          }
        },
        
        h6: {
          allowedChildren: {
            '#phrasing': {}
          }
        },
        
        header: {
          allowedChildren: {
            '#flow': {}
          }
        },
        
        footer: {
          allowedChildren: {
            '#flow': {}
          }
        },
        
        address: {},
        
        main: {
          allowedChildren: {
            '#flow': {}
          }
        },
        
        // Grouping
        p: {
          allowedChildren: {
            '#phrasing': {}
          }
        },

        hr: {
          allowedAttrs: {
            color: {}
          },
        },
        
        pre: {},
        
        blockquote: {
          allowedAttrs: {
            cite: {}
          }
        },
        
        ol: {
          allowedChildren: {
            li: {}
          },
          allowedAttrs: {
            reversed: {},
            start: {},
            type: {}
          }
        },

        ul: {
          allowedChildren: {
            li: {},
          }
        },
        
        li: {
          allowedAttrs: {
            value: {}
          }
        },
        
        dl: {
          allowedChildren: {
            dd: {},
            dt: {},
          },
          allowedAttrs: {
            compact: {}
          }
        },

        dt: {},
        
        dd: {
          allowedAttrs: {
            nowrap: {}
          },
        },

        figure: {
          allowedChildren: { '#flow': {}, 'figcaption': {} }
        },
        
        figcaption: {},
        
        div: {
          allowedChildren: {
            '#flow': {}
          }
        },

        // Text-level semantics
        a: {
          allowedAttrs: {
            datafld: {},
            datasrc: {},
            download: {},
            href: {},
            hreflang: {},
            media: {},
            methods: {},
            ping: {},
            rel: {},
            target: {},
            type: {},
            urn: {}
          }
        },

        em: {},
        
        strong: {},
        
        small: {},
        
        s: {},
        
        cite: {},
        
        q: {
          allowedAttrs: {
            cite: {}
          }
        },
        
        dfn: {},
        
        abbr: {},
        
        data: {
          allowedAttrs: {
            value: {}
          }
        },

        time: {
          allowedAttrs: {
            datetime: {}
          }
        },
        
        code: {},
        
        'var': {},
        
        samp: {},
        
        kbd: {},
        
        sub: {},
        
        sup: {},
        
        i: {},
        
        b: {},
        
        u: {},
        
        mark: {},
        
        ruby: {
          allowedChildren: {
            '#phrasing': {}
          }
        },

        rt: {},
        
        rp: {},
        
        bdi: {},
        
        bdo: {
          allowedAttrs: {
            dir: {}
          }
        },
        
        span: {},
        
        br: {
          allowedAttrs: {
            clear: {}
          }
        },
        
        wbr: {},

        // Edits
        ins: {
          allowedAttrs: {
            cite: {},
            datetime: {}
          }
        },

        del: {
          allowedAttrs: {
            cite: {},
            datetime: {}
          }
        },

        // Embedded content
        img: {
          allowedAttrs: {
            alt: {},
            crossorigin: {},
            height: {},
            ismap: {},
            src: {},
            width: {},
            usemap: {}
          }
        },

        iframe: {
          allowedAttrs: {
            allowfullscreen: {},
            height: {},
            mozapp: {},
            mozbrowser: {},
            name: {},
            remote: {},
            sandbox: {},
            seamless: {},
            src: {},
            srcdoc: {},
            width: {}
          }
        },

        embed: {
          allowedAttrs: {
            height: {},
            src: {},
            type: {},
            width: {}
          }
        },

        object: {
          allowedChildren: {
            'param': {},
            '#transparent': {}
          },
          allowedAttrs: {
            data: {},
            form: {},
            height: {},
            name: {},
            type: {},
            width: {}
          }
        },

        param: {
          allowedAttrs: {
            name: {},
            value: {}
          }
        },

        video: {
          allowedChildren: {
            '#transparent': {},
            'source': {},
            '#flow': {},
            '#phrasing': {}
          },
          allowedAttrs: {
            autoplay: {},
            buffered: {},
            controls: {},
            crossorigin: {},
            height: {},
            loop: {},
            muted: {},
            played: {},
            preload: {},
            poster: {},
            src: {},
            width: {}
          }
        },

        audio: {
          allowedChildren: {
            'track': {},
            '#transparent': {},
            'source': {}
          },
          allowedAttrs: {
            autoplay: {},
            buffered: {},
            controls: {},
            loop: {},
            mozcurrentsampleoffset: {},
            muted: {},
            played: {},
            preload: {},
            src: {},
            volume: {}
          }
        },

        source: {
          allowedAttrs: {
            src: {},
            type: {},
            media: {}
          }
        },

        track: {
          allowedAttrs: {
            'default': {},
            kind: {},
            label: {},
            src: {},
            srclang: {}
          }
        },

        canvas: {
          allowedAttrs: {
            width: {},
            height: {}
          }
        },

        map: {
          allowedChildren: {
            '#transparent': {}
          }
        },

        area: {
          allowedAttrs: {
            alt: {},
            coords: {},
            download: {},
            href: {},
            hreflang: {},
            media: {},
            rel: {},
            shape: {},
            target: {},
            type: {}
          }
        },

        svg: {
          allowedAttrs: {
            version: {},
            baseprofile: {},
            contentscripttype: {},
            contentstyletype: {},
            x: {},
            y: {},
            width: {},
            height: {},
            viewbox: {},
            preserveaspectratio: {},
            zoomandpan: {},
            'xmlxml:space': {}
          }
        },

        math: {
          allowedAttrs: {
            dir: {},
            href: {},
            mathbackground: {},
            mathcolor: {},
            display: {},
            overflow: {},
            decimalpoint: {},
            displaystyle: {},
            infixlinebreakstyle: {},
            scriptlevel: {},
            scriptminsize: {},
            scriptsizemultiplier: {}
          }
        },

        // Tabular data
        table: {
          allowedChildren: {
            'caption': {},
            'colgroup': {},
            'thead': {},
            'tfoot': {},
            'tbody': {},
            'tr': {}
          }
        },

        caption: {},
        colgroup: {
          allowedChildren: {
            'col': {}
          },
          allowedAttrs: {
            bgcolor: {},
            span: {}
          }
        },

        col: {
          allowedAttrs: {
            bgcolor: {},
            span: {},
          }
        },

        tbody: {
          allowedChildren: {
            'tr': {}
          },
          allowedAttrs: {
            bgcolor: {}
          }
        },

        thead: {
          allowedChildren: {
            'tr': {}
          },
          allowedAttrs: {
            bgcolor: {}
          }
        },

        tfoot: {
          allowedChildren: {
            'tr': {}
          },
          allowedAttrs: {
            bgcolor: {}
          }
        },

        tr: {
          allowedChildren: {
            'td': {},
            'th': {}
          }
        },

        td: {
          allowedAttrs: {
            bgcolor: {},
            colspan: {},
            headers: {},
            rowspan: {}
          }
        },

        th: {
          allowedAttrs: {
            bgcolor: {},
            colspan: {},
            headers: {},
            rowspan: {},
            scope: {}
          }
        },

        // Forms
        form: {
          allowedChildren: {
            '#flow': {}
          },
          allowedAttrs: {
            'accept-charset': {},
            action: {},
            autocomplete: {},
            enctype: {},
            method: {},
            name: {},
            novalidate: {},
            target: {}
          }
        },

        fieldset: {
          allowedChildren: {
            'legend': {},
            '#flow': {}
          },
          allowedAttrs: {
            disabled: {},
            form: {},
            name: {}
          }
        },

        legend: {
          allowedChildren: {
            '#phrasing': {}
          }
        },

        label: {
          allowedChildren: {
            '#phrasing': {}
          },
          allowedAttrs: {
            accesskey: {},
            'for': {},
            form: {}
          }
        },

        input: {
          allowedAttrs: {
            type: {},
            accept: {},
            mozactionhint: {},
            autocomplete: {},
            autofocus: {},
            autosave: {},
            checked: {},
            disabled: {},
            form: {},
            formaction: {},
            formenctype: {},
            formmethod: {},
            formnovalidate: {},
            formtarget: {},
            height: {},
            inputmode: {},
            list: {},
            max: {},
            maxlength: {},
            min: {},
            multiple: {},
            name: {},
            pattern: {},
            placeholder: {},
            readonly: {},
            required: {},
            selectiondirection: {},
            size: {},
            spellcheck: {},
            src: {},
            step: {},
            value: {},
            width: {},
            'x-moz-errormessage': {}
          }
        },

        button: {
          allowedAttrs: {
            autofocus: {},
            disabled: {},
            form: {},
            formaction: {},
            formenctype: {},
            formmethod: {},
            formnovalidate: {},
            formtarget: {},
            name: {},
            type: {},
            value: {}
          }
        },

        select: {
          allowedChildren: {
            'option': {},
            'optgroup': {}
          },
          allowedAttrs: {
            autofocus: {},
            disabled: {},
            form: {},
            multiple: {},
            name: {},
            required: {},
            size: {}
          }
        },

        datalist: {
          allowedChildren: { '#phrasing': {}, 'option': {} }
        },

        optgroup: {
          allowedChildren: { 'option': {} },
          allowedAttrs: {
            disabled: {},
            label: {}
          }
        },

        option: {
          allowedAttrs: {
            disabled: {},
            label: {},
            selected: {},
            value: {}
          }
        },

        textarea: {
          allowedAttrs: {
            autofocus: {},
            cols: {},
            disabled: {},
            form: {},
            maxlength: {},
            name: {},
            placeholder: {},
            readonly: {},
            readonly: {},
            required: {},
            rows: {},
            selectiondirection: {},
            selectionend: {},
            selectionstart: {},
            spellcheck: {},
            wrap: {}
          }
        },
        
        keygen: {
          allowedAttrs: {
            autofocus: {},
            challenge: {},
            disabled: {},
            form: {},
            keytype: {},
            name: {}
          }
        },
        
        output: {
          allowedAttrs: {
            'for': {},
            form: {},
            name: {}
          }
        },
        
        progress: {
          allowedAttrs: {
            max: {},
            value: {}
          }
        },

        meter: {
          allowedAttrs: {
            value: {},
            min: {},
            max: {},
            low: {},
            high: {},
            optimum: {},
            form: {}
          }
        },

        // Interactive elements
        details: {
          allowedChildren: { 'summary': {}, '#flow': {} },
          allowedAttrs: {
            open: {}
          }
        },
        
        summary: {},
        
        menuitem: {
          allowedAttrs: {
            checked: {},
            command: {},
            'default': {},
            disabled: {},
            icon: {},
            label: {},
            radiogroup: {},
            type: {}
          }
        },

        menu: {
          allowedChildren: { '#flow': {}, 'menuitem': {} },
          allowedAttrs: {
            type: {},
            label: {}
          }
        }
      }
    },


    globalAttrs: {
      accesskey: {},
      class: {},
      contenteditable: {},
      contextmenu: {},
      // data-*: {},
      dir: {},
      draggable: {},
      dropzone: {},
      hidden: {},
      id: {},
      itemid: {},
      itemprop: {},
      itemref: {},
      itemscope: {},
      itemtype: {},
      lang: {},
      spellcheck: {},
      style: {},
      tabindex: {},
      title: {},
    },

    contentCategories: {

      '#flow': [
        'a',
        'abbr',
        'address',
        'article',
        'aside',
        'audio',
        'b',
        'bdo',
        'blockquote',
        'br',
        'button',
        'canvas',
        'cite',
        'code',
        'command',
        'datalist',
        'del',
        'details',
        'dfn',
        'div',
        'dl',
        'em',
        'embed',
        'fieldset',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'hr',
        'i',
        'iframe',
        'img',
        'input',
        'ins',
        'kbd',
        'keygen',
        'label',
        'main', // experimental
        'map',
        'mark',
        'math',
        'menu',
        'meter',
        'nav',
        'noscript',
        'object',
        'ol',
        'output',
        'p',
        'pre',
        'progress',
        'q',
        'ruby',
        's',
        'samp',
        'script',
        'section',
        'select',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'svg',
        'table',
        'textarea',
        'time',
        'u',
        'ul',
        'var',
        'video',
        'wbr'//,
        // '#text'
      ],

      '#phrasing': [
        'abbr',
        'audio',
        'b',
        'bdi',
        'bdo',
        'br',
        'button',
        'canvas',
        'cite',
        'code',
        'command',
        'datalist',
        'dfn',
        'em',
        'embed',
        'i',
        'iframe',
        'img',
        'input',
        'kbd',
        'keygen',
        'label',
        'mark',
        'math',
        'meter',
        'noscript',
        'object',
        'output',
        'progress',
        'q',
        'ruby',
        'samp',
        'script',
        'select',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'svg',
        'textarea',
        'time',
        'var',
        'video',
        'wbr',
        '#text'
      ],

      '#palpable': [
        'a',
        'abbr',
        'address',
        'article',
        'aside',
        'audio',
        'b',
        'bdi',
        'bdo',
        'blockquote',
        'button',
        'canvas',
        'cite',
        'code',
        'data',
        'details',
        'dfn',
        'div',
        'dl',
        'em',
        'embed',
        'fieldset',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'i',
        'iframe',
        'img',
        'input',
        'ins',
        'kbd',
        'keygen',
        'label',
        'main',
        'map',
        'mark',
        'math',
        'menu',
        'meter',
        'nav',
        'object',
        'ol',
        'output',
        'p',
        'pre',
        'progress',
        'q',
        'ruby',
        's',
        'samp',
        'section',
        'select',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'svg',
        'table',
        'textarea',
        'time',
        'u',
        'ul',
        'var',
        'video',
        '#text'
      ]
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
    ]
  };

  console.log('rules', ruleSet);

  var Directive = function (document, name, initialRule) {
    this.document = document;
    this.name = name;
    this.rules = [];
    this.compile = null;
    this.compileName;

    if (initialRule.compile) {
      this.compile = initialRule.compile;
    }

    if (initialRule.compileName) {
      this.compileName = initialRule.compileName;
    }

    this.addRule(initialRule);

    console.log('DIRECTIVE', this.name);
  };

  Directive.load = function(document, name) {

    var rule = {};

    switch (name) {

      case 'html':
        rule = ruleSet.html;
        break;

      case 'head':
        rule = ruleSet.head;
        break;

      case 'body':
        rule = ruleSet.body;
        break;

      default:
        for (var i in ruleSet.head) {
          if (ruleSet.head.allowedChildren[name]) {
            rule = ruleSet.head.allowedChildren[name];
          }
        }
        for (var i in ruleSet.body) {
          if (ruleSet.body.allowedChildren[name]) {
            rule = ruleSet.body.allowedChildren[name];
          }
        }
        break;
    }

    return new Directive(document, name, rule);
  };

  _.extend(Directive.prototype, {

    addRule: function(rule) {
      this.rules.push(rule);
    },

    mayContain: function (name) {

      // by explicit name
      for (var i in this.rules) {
        if (this.rules[i].allowedChildren && this.rules[i].allowedChildren[name]) {
          return true;
        }
      }

      // by container
      if (dir = this.document.getDirective(name)) {
        if (dir.mayBeContainedBy(this.name)) {
          return true;
        }
      }

      // by content category
      if (contentCategory = this.getContentCategory(name)) {
        for (var i in this.rules) {
          if (this.rules[i].allowedChildren && this.rules[i].allowedChildren[contentCategory]) {
            return true;
          }
        }
      }

      return false;
    },

    getContentCategory: function (name) {
      if (ruleSet.contentCategories['#flow']) {
        return '#flow';
      }
      if (ruleSet.contentCategories['#phrasing']) {
        return '#phrasing';
      }
      if (ruleSet.contentCategories['#palpable']) {
        return '#palpable';
      }
      return null;
    },

    mayBeContainedBy: function (name) {
      for (var i in this.rules) {
        if (this.rules[i].allowedParents && -1 < this.rules[i].allowedParents.indexOf(name)) {
          return true;
        }
      }

      return false;
    },

    mayHaveAttribute: function (name) {

      if (ruleSet.globalAttrs[name]) {
        return true;
      }

      if ('data-' === name.substr(5)) {
        return true;
      }

      for (var i in this.rules) {
        if (this.rules[i].allowedAttrs && this.rules[i].allowedAttrs[name]) {
          return true;
        }
      }

      return false;
    },

    mayContainTextOnly: function (name) {
      for (var i in this.rules) {
        if (this.rules[i].textOnly) {
          return true;
        }
      }
    },

    isVoidElement: function(name) {
      return -1 < ruleSet.voidElements.indexOf(name);
    },

    merge: function(directive) {
      for (var i in directive.rules) {
        this.addRule(directive.rules[i]);
      }
    }

  });

  core.Directive = Directive;
}(
  window._,
  window.structure
));
