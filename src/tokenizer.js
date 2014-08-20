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
