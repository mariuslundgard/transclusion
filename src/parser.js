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
