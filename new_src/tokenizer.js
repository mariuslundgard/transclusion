(function (exports) {
  if (! exports.structure.CharStream) {
    throw new Error('The structure.Tokenizer class depends on the structure.CharStream class');
  }

  var struct = exports.structure;

  function Tokenizer(prs) {
    if (! prs) {
      throw new Error('Missing `parser` for Tokenizer');
    }
    this.parser = prs;
    this.reset();

    this.openExprDelim = '[[';
    this.replacementChar = '?';
  }

  Tokenizer.STATE_EOF                    = 'STATE_EOF';
  Tokenizer.STATE_DATA                   = 'STATE_DATA';
  Tokenizer.STATE_CHAR_REF_IN_DATA       = 'STATE_CHAR_REF_IN_DATA';
  Tokenizer.STATE_TAG_OPEN               = 'STATE_TAG_OPEN';
  Tokenizer.STATE_TAG_NAME               = 'STATE_TAG_NAME';
  Tokenizer.STATE_BEFORE_ATTR_KEY        = 'STATE_BEFORE_ATTR_KEY';
  Tokenizer.STATE_SELF_CLOSING_START_TAG = 'STATE_SELF_CLOSING_START_TAG';
  Tokenizer.STATE_BEFORE_ATTR_KEY        = 'STATE_BEFORE_ATTR_KEY';
  Tokenizer.STATE_END_TAG_OPEN           = 'STATE_END_TAG_OPEN';
  Tokenizer.STATE_END_TAG_NAME = 'STATE_END_TAG_NAME';
  Tokenizer.STATE_RAWTEXT = 'STATE_RAWTEXT';
  Tokenizer.STATE_RAWTEXT_LESS_THAN_SIGN = 'STATE_RAWTEXT_LESS_THAN_SIGN';
  Tokenizer.STATE_RAWTEXT_END_TAG_OPEN = 'STATE_RAWTEXT_END_TAG_OPEN';
  Tokenizer.STATE_RAWTEXT_END_TAG_NAME = 'STATE_RAWTEXT_END_TAG_NAME';

  // exports
  struct.Tokenizer = Tokenizer;

  var state = {},
      Token = struct.Token,
      CharTester = struct.CharTester;

  //////////////////////////////////////////////////////////////////////////////
  // Tokenizer methods:

  Tokenizer.prototype = {
    reset: function () {
      this.state = Tokenizer.STATE_DATA;
      this.tok = null;
      this.buffer = '';
      this.prevStartTagToken = null;
      // this.prevEndTagToken = null;
    },

    tokenize: function (input) {
      if (this.parser.document.debug) {
        console.log('-------------------------- TOK --------------------------');
      }

      var stream = new struct.CharStream(input);
      var innings = 0;

      while (true) {
        if (this.parser.document.debug) {
          console.log(this.state + '.tokenize(', stream.next(), ')');
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
      // console.log(this.token);

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

      // if (Token.END_TAG === tok.type) {
      //   this.prevEndTagToken = tok;
      // }

      this.parser.handleToken(tok);
    },

    currentEndTagIsAppropriate: function () {
      if (Token.END_TAG !== this.tok.type) {
        console.log(this.tok);
        throw new Error('The current token is not an end tag');
      }
      return this.prevStartTagToken && this.tok.name === this.prevStartTagToken.name;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Data state:

  // var openExprDelim = '[[';

  state[Tokenizer.STATE_DATA] = function (tok, stream) {
    var chr = stream.consume();

    switch (true) {

      case '&' === chr:
        tok.state = Tokenizer.STATE_CHAR_REF_IN_DATA;
        break;

      case '<' === chr:
        tok.state = Tokenizer.STATE_TAG_OPEN;
        break;

      case -1 === chr:
        tok.state = Tokenizer.STATE_EOF;
        tok.emit({
          type: Token.EOF
        });
        break;

      case tok.openExprDelim === chr + stream.next(tok.openExprDelim.length - 1):
        break;

      case "\0" === chr:
        tok.parser.report('exception', 'Unexpected NULL character in data');
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
  // Tag open state:

  state[Tokenizer.STATE_TAG_OPEN] = function (tok, stream) {
    chr = stream.consume();
    switch (true) {
      case '!' === chr:
        tok.state = Tokenizer.STATE_MARKUP_DECLARATION_OPEN;
        break;

      case '/' === chr:
        tok.state = Tokenizer.STATE_END_TAG_OPEN;
        break;

      case '>' === chr:
        tok.emit({
          type: Token.CHAR,
          data: '<>',
        });
        tok.state = Tokenizer.STATE_DATA;
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
        tok.state = Tokenizer.STATE_DATA;
        break;

      case CharTester.isUpperCase(chr):
        chr = chr.toLowerCase();

      case CharTester.isLowerCase(chr):
        tok.tok = {
          type: Token.START_TAG,
          name: chr,
          offset: stream.pointer - 2,
        };
        tok.state = Tokenizer.STATE_TAG_NAME;
        break;

      case '?' === chr:
        tok.parser.report('exception', 'Unexpected character in tag open: ? (STATE_TAG_OPEN)');
        tok.state = Tokenizer.STATE_BOGUS_COMMENT;
        tok.buffer = chr;
        break;

      case -1 === chr:
        tok.parser.report('notice', 'Unexpected EOF in tag open (STATE_TAG_OPEN)');
        tok.state = Tokenizer.STATE_DATA;
        tok.emit({
          type: Token.CHAR,
          data: '&lt;'
        });
        break;

      default:
        tok.parser.report('notice', 'Unexpected character in tag open: ' + chr + ' (STATE_TAG_OPEN)');
        tok.state = Tokenizer.STATE_DATA;
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
    chr = stream.consume();
    switch (true) {
      case CharTester.isUpperCase(chr):
        chr = chr.toLowerCase();

      case CharTester.isLowerCase(chr):
      case CharTester.isNumber(chr):
        tok.tok.name += chr;
        break;

      case CharTester.isWhiteSpace(chr):
        tok.emit();
        tok.state = Tokenizer.STATE_BEFORE_ATTR_KEY;
        break;

      case '>' === chr:
        tok.emit();
        tok.state = Tokenizer.STATE_DATA;
        tok.emit({
          type: Token.START_TAG_CLOSE,
          selfClosing: false,
          offset: stream.pointer,
        });
        break;

      case '/' === chr:
        tok.emit();
        tok.state = Tokenizer.STATE_SELF_CLOSING_START_TAG;
        break;

      case -1 === chr:
        tok.parser.report('notice', 'Unexpected EOF in tag name');
        tok.emit({
          type: Token.CHAR,
          data: '&lt;' + tok.tok.name
        });
        tok.tok = null;
        tok.state = Tokenizer.STATE_DATA;
        break;

      default:
        tok.parser.report('notice', 'Unexpected character in tag name: ' . chr);
        tok.emit({
          type: Token.CHAR,
          data: '&lt;' + tok.tok.name + chr
        });
        tok.tok = null;
        tok.state = Tokenizer.STATE_DATA;
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // End tag open state:

  state[Tokenizer.STATE_END_TAG_OPEN] = function (tok, stream) {
    chr = stream.consume();
    switch (true) {
      case CharTester.isUpperCase(chr):
        chr = strtolower(chr);

      case CharTester.isLowerCase(chr):
        tok.tok = {
          type: Token.END_TAG,
          name: chr,
          innerOffset: stream.pointer - 3,
        };
        tok.state = Tokenizer.STATE_END_TAG_NAME;
        break;

      case -1 === chr:
        tok.emit({
          type: Token.CHAR,
          data: '&lt;/'
        });
        tok.state = Tokenizer.STATE_DATA;
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
    chr = stream.consume();
    switch (true) {
      case CharTester.isUpperCase(chr):
        chr = chr.toUpperCase();

      case CharTester.isLowerCase(chr):
      case CharTester.isNumber(chr):
        tok.tok.name += chr;
        // tok.state = Tokenizer.STATE_END_TAG_NAME;
        break;

      case '>' === chr:
        tok.tok.outerOffset = stream.pointer;
        console.log(tok.tok);
        tok.emit();
        tok.state = Tokenizer.STATE_DATA;
        break;

      case -1 === chr:
        tok.emit({
          type: Token.CHAR,
          data: '&lt;/' + tok.tok.name
        });
        tok.tok = null;
        tok.state = Tokenizer.STATE_DATA;
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
    chr = stream.consume();
    switch (true) {

      case '<' === chr:
        tok.state = Tokenizer.STATE_RAWTEXT_LESS_THAN_SIGN;
        break;

      case "\0" === chr:
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
        tok.state = Tokenizer.STATE_DATA;
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
    chr = stream.next();
    switch (true) {
      case '/' === chr:
        stream.consume();
        tok.buffer = '';
        tok.state = Tokenizer.STATE_RAWTEXT_END_TAG_OPEN;
        break;

      default:
        tok.state = Tokenizer.STATE_RAWTEXT;
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
    chr = stream.next();
    switch (true) {
      case CharTester.isUpperCase(chr):
        chr = chr.toLowerCase();

      case CharTester.isLowerCase(chr):
        stream.consume();
        tok.tok = {
          type: Token.END_TAG,
          name: chr
        };
        tok.buffer += chr;
        tok.state = Tokenizer.STATE_RAWTEXT_END_TAG_NAME;
        break;

      default:
        tok.state = Tokenizer.STATE_RAWTEXT;
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
    chr = stream.next();
    switch (true) {
      case CharTester.isWhiteSpace(chr):
        if (tok.currentEndTagIsAppropriate()) {
          stream.consume();
          tok.state = Tokenizer.STATE_BEFORE_ATTR_KEY;
        } else {
          tok.state = Tokenizer.STATE_RAWTEXT;
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
          tok.state = Tokenizer.STATE_SELF_CLOSING_START_TAG;
        } else {
          tok.state = Tokenizer.STATE_RAWTEXT;
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
          tok.state = Tokenizer.STATE_DATA;
          tok.emit();
        } else {
          tok.state = Tokenizer.STATE_RAWTEXT;
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
        tok.state = Tokenizer.STATE_RAWTEXT;
        tok.tok = null;
        tok.emit({
          type: Token.CHAR,
          data: '</' + tok.buffer
        });
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////

})(this);
