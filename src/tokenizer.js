function Tokenizer(prs) {
  if (! prs) {
    throw new Error('Missing `parser` for Tokenizer');
  }
  this.parser = prs;
  this.reset();
  this.openExprDelim = '[[';
  this.closeExprDelim = ']]';
  this.replacementChar = '?';
}

// exports
transclusion.Tokenizer = Tokenizer;

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

Tokenizer.STATE_BEFORE_ARRAY_VALUE = 'STATE_BEFORE_ARRAY_VALUE';
Tokenizer.STATE_BEFORE_OBJECT_KEY  = 'STATE_BEFORE_OBJECT_KEY';
Tokenizer.STATE_ARRAY_STRING_ESCAPED_VALUE = 'STATE_ARRAY_STRING_ESCAPED_VALUE';
Tokenizer.STATE_AFTER_ARRAY_VALUE = 'STATE_AFTER_ARRAY_VALUE';

Tokenizer.STATE_DYNAMIC_STRING_VALUE = 'STATE_DYNAMIC_STRING_VALUE';
Tokenizer.STATE_DYNAMIC_NUMBER_VALUE = 'STATE_DYNAMIC_NUMBER_VALUE';
Tokenizer.STATE_DYNAMIC_NUMBER_VALUE_AFTER_DECIMAL = 'STATE_DYNAMIC_NUMBER_VALUE_AFTER_DECIMAL';

Tokenizer.STATE_EXPR = 'STATE_EXPR';
Tokenizer.STATE_EXPR_VAR = 'STATE_EXPR_VAR';
Tokenizer.STATE_EXPR_AFTER_VALUE = 'STATE_EXPR_AFTER_VALUE';
Tokenizer.STATE_EXPR_AFTER_OPERATOR = 'STATE_EXPR_AFTER_OPERATOR';

var exprStates = [
      Tokenizer.STATE_EXPR,
      Tokenizer.STATE_EXPR_VAR,
      Tokenizer.STATE_EXPR_AFTER_VALUE,
      Tokenizer.STATE_EXPR_AFTER_OPERATOR
    ],
    state = {},
    Token = transclusion.Token,
    CharTester = transclusion.CharTester;

//////////////////////////////////////////////////////////////////////////////
// Tokenizer methods:

Tokenizer.prototype = {
  reset: function () {
    this.queueTokens = false;
    this.tokQueue = [];
    this.stateStack = [];
    this.state = Tokenizer.STATE_DATA;
    this.tok = null;
    this.buffer = '';
    this.prevStartTagToken = null;
    this.attrDelimiter = null;
  },

  tokenize: function (input) {
    var stream = new transclusion.CharStream(input),
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

      // TODO: remove this in BETA
      if (this.parser.document.debug && 3000 < innings) {
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

    if (this.queueTokens) {
      this.tokQueue.push(tok);
    } else {
      this.parser.handleToken(tok);
    }
  },

  releaseTokenQueue: function () {
    var i, len;
    this.queueTokens = false;
    for (i = 0, len = this.tokQueue.length; i < len; i++) {
      this.emit(this.tokQueue[i]);
    }
    this.tokQueue = [];
  },

  exitExpr: function () {

    this.buffer = '';
    this.tokQueue = [];

    this.queueTokens = false;

    while (-1 < exprStates.indexOf(this.state)) {
      this.popState();
    }

    // this.releaseTokenQueue();

    this.tok = null;
    this.emit({
      type: Token.CHAR,
      data: this.buffer
    });

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
  },

  pushState: function (state) {
    this.stateStack.push(this.state);
    this.state = state;
  },

  popState: function () {
    if (! this.stateStack.length) {
      throw new Error('The state stack cannot be popped because it\'s already empty');
    }
    this.state = this.stateStack.pop();
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
      tok.queueTokens = true;
      tok.emit({
        type: Token.START_EXPR,
        offset: stream.getPointer() - 1
      });
      stream.shift(tok.openExprDelim.length - 1);
      tok.buffer = tok.openExprDelim;
      tok.pushState(Tokenizer.STATE_EXPR);
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
  tok.setState(Tokenizer.STATE_DATA);
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
      tmp = '';
      if (tok.tok) {
        tmp = tok.tok.name;
      }
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

    case '>' === chr:
      // tok.emit();
      tok.setState(Tokenizer.STATE_DATA);
      tok.emit({
        type: Token.START_TAG_CLOSE,
        selfClosing: false,
        offset: stream.pointer,
      });
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
      tok.pushState(Tokenizer.STATE_BEFORE_ARRAY_VALUE);
      break;

    case '{' === chr:
      tok.emit({
        type: Token.START_OBJ
      });
      tok.setState(Tokenizer.STATE_AFTER_ATTR_VALUE);
      tok.pushState(Tokenizer.STATE_BEFORE_OBJECT_KEY);
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
// Before array value state:

state[Tokenizer.STATE_BEFORE_ARRAY_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {

    case ']' === chr:
      tok.emit({
        type: Token.END_ARR
      });
      tok.popState();
      break;

    case '\'' === chr:
    case '"' === chr:
      tok.tok = {
        type: Token.STR,
        data: ''
      };
      tok.attrDelimiter = chr;
      tok.setState(Tokenizer.STATE_AFTER_ARRAY_VALUE);
      tok.pushState(Tokenizer.STATE_DYNAMIC_STRING_VALUE);
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character: ' + chr + ' (STATE_BEFORE_ARRAY_VALUE)'
      );
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Array string value (escaped) state:

state[Tokenizer.STATE_ARRAY_STRING_ESCAPED_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  // console.log(chr);
  switch (true) {

    case -1 === chr:
      tok.parser.report(
        'exception',
        'Unexpected EOF (STATE_ARRAY_STRING_ESCAPED_VALUE)'
      );
      break;

    default:
      tok.tok.data += chr;
      tok.setState(Tokenizer.STATE_DYNAMIC_STRING_VALUE);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// After array value state:

state[Tokenizer.STATE_AFTER_ARRAY_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {

    case ']' === chr:
      tok.emit({
        type: Token.END_ARR
      });
      tok.popState();
      break;

    default:
      tok.parser.report(
        'exception',
        'Unexpected character: ' + chr + ' (STATE_AFTER_ARRAY_VALUE)'
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

//////////////////////////////////////////////////////////////////////////////
// Expression state:

state[Tokenizer.STATE_EXPR] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case CharTester.isWhiteSpace(chr):
      tok.buffer += chr;
      break;

    case CharTester.isAlpha(chr):
      tok.buffer += chr;
      tok.tok = {
        type: Token.VAR,
        name: chr
      };
      tok.setState(Tokenizer.STATE_EXPR_VAR);
      break;

    case '\'' === chr:
    case '"' === chr:
      tok.buffer += chr;
      tok.tok = {
        type: Token.STR,
        data: ''
      };
      tok.attrDelimiter = chr;
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.pushState(Tokenizer.STATE_DYNAMIC_STRING_VALUE);
      break;

    case CharTester.isNumber(chr):
      tok.buffer += chr;
      tok.tok = {
        type: Token.NUM,
        value: chr
      };
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.pushState(Tokenizer.STATE_DYNAMIC_NUMBER_VALUE);
      break;

    case '(' === chr:
      tok.buffer += chr;
      // inception
      tok.emit({
        type: Token.START_EXPR,
        offset: stream.getPointer() - 1
      });
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.pushState(Tokenizer.STATE_EXPR);
      break;

    default:
      tok.buffer += chr;
      tok.parser.report(
        'error',
        'Unexpected character: ' + chr + ' (STATE_EXPR)'
      );
      tok.exitExpr();
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Expression variable state:

state[Tokenizer.STATE_EXPR_VAR] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {
    case CharTester.isAlpha(chr):
    case CharTester.isNumber(chr):
      tok.buffer += chr;
      stream.consume();
      tok.tok.name += chr;
      break;

    case CharTester.isWhiteSpace(chr):
      tok.buffer += chr;
      stream.consume();
      tok.emit();
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      break;

    case -1 === chr:
      tok.parser.report(
        'error',
        'Unexpected EOF (STATE_EXPR_VAR)'
      );
      // tok.emit();
      // tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.exitExpr();
      break;

    default:
      tok.emit();
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// After expression variable state:

state[Tokenizer.STATE_EXPR_AFTER_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {
    case CharTester.isWhiteSpace(chr):
      tok.buffer += chr;
      break; // ignore

    case '+' === chr:
    case '-' === chr:
    case '*' === chr:
    case '/' === chr:
      tok.buffer += chr;
      tok.emit({
        type: Token.OPERATOR,
        sign: chr
      });
      tok.setState(Tokenizer.STATE_EXPR_AFTER_OPERATOR);
      break;

    case tok.closeExprDelim === chr + stream.next(tok.closeExprDelim.length - 1):
      tok.buffer += tok.closeExprDelim;
      tok.emit({
        type: Token.END_EXPR,
        offset: stream.getPointer() - 1
      });
      stream.shift(tok.closeExprDelim.length - 1);
      tok.popState();
      tok.releaseTokenQueue();
      break;

    case ')' === chr:
      tok.buffer += chr;
      tok.emit({
        type: Token.END_EXPR,
        offset: stream.getPointer() - 1
      });
      tok.popState();
      break;

    default:
      tok.buffer += (-1 === chr) ? '' : chr;
      // tok.setState(Tokenizer.STATE_EXPR);
      tok.parser.report(
        'error',
        'Unexpected character: ' + chr + ' (STATE_EXPR_AFTER_VALUE)'
      );
      tok.exitExpr();
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// After expression operator state:

state[Tokenizer.STATE_EXPR_AFTER_OPERATOR] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {

    case CharTester.isWhiteSpace(chr):
      tok.buffer += chr;
      break;

    case '\'' === chr:
    case '"' === chr:
      tok.buffer += chr;
      tok.tok = {
        type: Token.STR,
        data: ''
      };
      tok.attrDelimiter = chr;
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.pushState(Tokenizer.STATE_DYNAMIC_STRING_VALUE);
      break;

    case CharTester.isNumber(chr):
      tok.buffer += chr;
      tok.tok = {
        type: Token.NUM,
        value: chr
      };
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.pushState(Tokenizer.STATE_DYNAMIC_NUMBER_VALUE);
      break;

    case '(' === chr:
      tok.buffer += chr;
      // inception
      tok.emit({
        type: Token.START_EXPR,
        offset: stream.getPointer() - 1
      });
      tok.setState(Tokenizer.STATE_EXPR_AFTER_VALUE);
      tok.pushState(Tokenizer.STATE_EXPR);
      break;

    default:
      tok.buffer += (-1 === chr) ? '' : chr;
      tok.parser.report(
        'error',
        'Unexpected character: ' + chr + ' (STATE_EXPR_AFTER_OPERATOR)'
      );
      tok.exitExpr();
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Dynamic string value state:

state[Tokenizer.STATE_DYNAMIC_STRING_VALUE] = function (tok, stream) {
  var chr = stream.consume();
  switch (true) {

    case '\\' === chr:
      tok.buffer += chr;
      tok.setState(Tokenizer.STATE_ARRAY_STRING_ESCAPED_VALUE);
      break;

    case tok.attrDelimiter === chr:
      tok.buffer += chr;
      tok.emit();
      tok.popState();
      break;

    case -1 === chr:
      tok.parser.report(
        'exception',
        'Unexpected EOF (STATE_DYNAMIC_STRING_VALUE)'
      );
      break;

    default:
      tok.buffer += chr;
      tok.tok.data += chr;
      break;
  }
};

//////////////////////////////////////////////////////////////////////////////
// Dynamic number value state:

state[Tokenizer.STATE_DYNAMIC_NUMBER_VALUE] = function (tok, stream) {
  var chr = stream.next();
  switch (true) {

    case CharTester.isNumber(chr):
      tok.buffer += chr;
      stream.shift(1);
      tok.tok.value += chr;
      break;

    case '.' === chr:
      tok.buffer += chr;
      tok.tok.value += '.';
      stream.shift(1);
      tok.setState(Tokenizer.STATE_DYNAMIC_NUMBER_VALUE_AFTER_DECIMAL);
      break;

    default:
      tok.emit();
      tok.popState();
      break;
  }
};
