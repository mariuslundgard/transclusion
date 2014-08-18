// define([
//   './core',
//   './util'
// ], function(Structure) {

(function(core, util) {

  var Token = {
    TEXT            : 'text',
    START_TAG       : 'start tag',
    START_TAG_CLOSE : 'start tag close',
    ATTR_KEY        : 'attr key',
    ATTR_VALUE      : 'attr value',
    END_ATTR        : 'end attr',
    END_TAG         : 'end tag',
    EOF             : 'eof',
    COMMENT         : 'comment'
  };

  var Tokenizer = function (parser) {
    this.initialize(parser);
    return this;
  };

  // Tokenizer states
  Tokenizer.DATA              = 'data';
  Tokenizer.TAG_OPEN          = 'tag open';
  Tokenizer.TAG_NAME          = 'tag name';

  Tokenizer.END_TAG_OPEN_NAME = 'end tag open name';
  Tokenizer.END_TAG_NAME      = 'end tag name';
  
  Tokenizer.BEFORE_ATTR_KEY   = 'before attr key';
  Tokenizer.ATTR_KEY          = 'attr key';
  Tokenizer.BEFORE_ATTR_VALUE = 'before attr value';
  Tokenizer.ATTR_VALUE        = 'attr value';
  Tokenizer.AFTER_ATTR        = 'after attr';

  Tokenizer.PLAINTEXT         = 'plaintext';
  Tokenizer.PLAINTEXT_LESS_THAN_SIGN = 'plaintext less than sign';
  Tokenizer.PLAINTEXT_END_TAG_OPEN = 'plaintext end tag open';
  Tokenizer.PLAINTEXT_END_TAG_NAME = 'plaintext end tag name';

  Tokenizer.MARKUP_DECLARATION = 'markup declaration';
  Tokenizer.COMMENT_START = 'comment start';
  Tokenizer.COMMENT = 'comment';
  Tokenizer.COMMENT_END_DASH = 'comment end dash';
  Tokenizer.COMMENT_END = 'comment end';

  Tokenizer.prototype.initialize = function (parser) {
    this.parser = parser;
    this.state = Tokenizer.DATA;
    this.token = null;
    this.attrDelimiter = null;
    this.buffer = '';

    this.tagStartPointer = null
    // this.tagEndPointer = null;
  };

  Tokenizer.prototype.process = function (chr) {

    if (!this.state) {
      throw new Error('No tokenizer state');
    }

    switch (this.state) {

      case Tokenizer.DATA:
        switch (true) {

          case '<' === chr:
            this.state = Tokenizer.TAG_OPEN;
            this.tagStartPointer = this.parser.stream.pointer - 1;
            break;

          case -1 === chr:
            this.emit({
              type: Token.EOF
            });
            break;

          default:
            this.emit({
              type: Token.TEXT,
              data: chr
            });
            // this.parser.error('Unexpected character in data: '+chr);
            break;
        }
        break;

      case Tokenizer.TAG_OPEN:
        switch (true) {

          case '!' === chr:
            this.state = Tokenizer.MARKUP_DECLARATION;
            break;

          case '/' === chr:
            this.state = Tokenizer.END_TAG_OPEN_NAME;
            break;

          case util.alpha(chr):
            this.state = Tokenizer.TAG_NAME;
            this.token = {
              type: Token.START_TAG,
              name: chr,
              start: this.tagStartPointer
            };
            break;

          case '?' === chr:
            this.parser.error('Unexpected ? in tag open');
            this.state = Tokenizer.BOGUS_COMMENT;
            break;

          default:
            this.parser.notice('Unexpected character in tag open: '+chr);
            this.state = Tokenizer.DATA;
            this.emit({ type: Token.TEXT, data: '<' });
            this.process(chr);
            // alert(1);
            break;
        }
        break;

      case Tokenizer.TAG_NAME:
        switch (true) {

          case util.whitespace(chr):
            this.state = Tokenizer.BEFORE_ATTR_KEY;
            this.emit();
            break;

          case '/' === chr:
            this.state = Tokenizer.SELF_CLOSING_START_TAG;
            break;

          case '>' === chr:
            this.state = Tokenizer.BEFORE_ATTR_KEY;
            this.token.innerStartPointer = this.parser.stream.pointer;
            this.emit();
            this.process(chr);
            break;

          // TODO
          // case '\0':
          //   break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in end tag name');
            this.state = Tokenizer.DATA;
            this.process(chr);
            break;

          default:
            this.token.name += chr;
            break;
        }
        break;

      case Tokenizer.END_TAG_OPEN_NAME:
        switch (true) {

          case util.alpha(chr):
            this.token = {
              type: Token.END_TAG,
              name: chr,
              innerEndPointer: this.tagStartPointer
            };
            this.state = Tokenizer.END_TAG_NAME;
            break;

          case '>' === chr:
            this.parser.notice('Unexpected > in end tag open name');
            this.state = Tokenizer.DATA;
            break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in tag open name');
            this.emit({ type: Token.TEXT, data: '</' });
            this.process(chr);
            break;

          default:
            this.parser.notice('Unexpected character in end tag open name: '+chr);
            this.state = Tokenizer.BOGUS_COMMENT;
            break;
        }
        break;

      case Tokenizer.END_TAG_NAME:
        switch (true) {

          case '/' === chr:
            this.state = Tokenizer.SELF_CLOSING_START_TAG;
            break;

          case '>' === chr:
            this.state = Tokenizer.DATA;
            this.token.end = this.parser.stream.pointer;
            this.emit();
            break;

          // TODO
          // case '\0':
          //   break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in end tag name');
            this.state = Tokenizer.DATA;
            this.process(chr);
            break;

          default:
            this.token.name += chr;
            break;
        }
        break;

      case Tokenizer.BEFORE_ATTR_KEY:
        switch (true) {

          case util.whitespace(chr):
            break; // Ignore

          case util.alpha(chr):
            this.state = Tokenizer.ATTR_KEY;
            this.token = {
              type: Token.ATTR_KEY,
              name: chr,
            };
            break;

          case '>' === chr:
            this.state = Tokenizer.DATA;
            this.emit({
              type: Token.START_TAG_CLOSE,
              innerStartPointer: this.parser.stream.pointer
            });
            break;

          default:
            this.parser.error('Unexpected character before attribute key: '+chr);
            break;
        }
        break;

      case Tokenizer.ATTR_KEY:
        switch (true) {
          case util.alpha(chr):
            this.token.name += chr;
            break;

          case '=' === chr:
            this.state = Tokenizer.BEFORE_ATTR_VALUE;
            this.emit();
            break;

          default:
            this.parser.error('Unexpected character in attribute key: '+chr);
            break;
        }
        break;

      case Tokenizer.BEFORE_ATTR_VALUE:
        switch (true) {

          case util.whitespace(chr):
            break; // Ignore

          case '"' === chr:
          case '\'' === chr:
            this.attrDelimiter = chr;
            this.state = Tokenizer.ATTR_VALUE;
            this.token = {
              type: Token.TEXT,
              data: '',
            };
            break;

          default:
            this.parser.error('Unexpected character before attribute value: '+chr);
            break;
        }
        break;

      case Tokenizer.ATTR_VALUE:
        switch (true) {
          case this.attrDelimiter === chr:
            this.state = Tokenizer.AFTER_ATTR;
            this.emit();
            this.emit({
              type: Token.END_ATTR,
            });
            break;

          default:
            this.token.data += chr;
            break;
        }
        break;

      case Tokenizer.AFTER_ATTR:
        switch (true) {

          case util.whitespace(chr):
            this.state = Tokenizer.BEFORE_ATTR_KEY;
            break;

          case '>' === chr:
            this.state = Tokenizer.BEFORE_ATTR_KEY;
            this.process(chr);
            break;

          default:
            this.parser.error('Unexpected character after attribute: '+chr);
            break;
        }
        break;

      case Tokenizer.PLAINTEXT:
        switch (true) {
          
          case '<' === chr:
            this.state = Tokenizer.PLAINTEXT_LESS_THAN_SIGN;
            break;

          case -1 === chr:
            this.state = Tokenizer.DATA;
            this.process(chr);
            break;

          default:
            this.emit({
              type: Token.TEXT,
              data: chr
            });
            // this.parser.error('Unexpected character in plaintext: '+chr);
            break;
        }
        break;

      case Tokenizer.PLAINTEXT_LESS_THAN_SIGN:
        switch (true) {
          
          case '/' === chr:
            this.buffer = chr;
            this.state = Tokenizer.PLAINTEXT_END_TAG_OPEN;
            break;

          default:
            this.state = Tokenizer.PLAINTEXT;
            this.emit({
              type: Token.TEXT,
              data: '<'
            });
            this.process(chr);
            break;
        }
        break;

      case Tokenizer.PLAINTEXT_END_TAG_OPEN:
        switch (true) {

          case util.uppercase(chr):
            chr = chr.toLowerCase();

          case util.lowercase(chr):
            this.token = {
              type: Token.END_TAG,
              name: chr,
            };
            this.buffer += chr;
            this.state = Tokenizer.PLAINTEXT_END_TAG_NAME;
            break;

          default:
            this.state = Tokenizer.PLAINTEXT;
            this.emit({
              type: Token.TEXT,
              data: '</'
            });
            this.process(chr);
            break;
        }
        break;

      case Tokenizer.PLAINTEXT_END_TAG_NAME:
        switch (true) {

          case util.whitespace(chr):
            // TODO: If the current end tag token is an appropriate end tag token, 
            // then switch to the before attribute name state. 
            // Otherwise, treat it as per the "anything else" entry below.
            this.state = Tokenizer.BEFORE_ATTR_KEY;
            break;

          case '/' === chr:
            // TODO: If the current end tag token is an appropriate end tag token, 
            // then switch to the self-closing start tag state. 
            // Otherwise, treat it as per the "anything else" entry below.
            this.state = Tokenizer.SELF_CLOSING_START_TAG;
            break;

          case '>' === chr:
            this.state = Tokenizer.DATA;
            this.token.end = this.parser.stream.pointer;
            this.emit();
            break;

          case util.uppercase(chr):
            this.token.name += chr.toLowerCase();
            this.buffer += chr;
            break;

          case util.lowercase(chr):
            this.token.name += chr;
            this.buffer += chr;
            break;

          default:
            this.state = Tokenizer.PLAINTEXT;
            this.emit({
              type: Token.TEXT,
              data: '</' + this.buffer
            });
            this.buffer = '';
            this.process(chr);
            break;
        }
        break;

      case Tokenizer.MARKUP_DECLARATION:
        switch (true) {

          case '--' === chr + this.parser.stream.next():
            this.parser.stream.shift(1);
            this.token = {
              type: Token.COMMENT,
              data: ''
            };
            this.state = Tokenizer.COMMENT_START;
            break;

          case 'DOCTYPE' === chr.toUpperCase() + this.parser.stream.next(6).toUpperCase():
            this.parser.stream.shift(6);
            this.state = Tokenizer.DOCTYPE;
            break;
          
          // Otherwise, if there is an adjusted current node and it is not an element in 
          // the HTML namespace and the next seven characters are a case-sensitive match 
          // for the string "[CDATA[" (the five uppercase letters "CDATA" with a U+005B 
          // LEFT SQUARE BRACKET character before and after), then consume those characters 
          // and switch to the CDATA section state.

          // Otherwise, this is a parse error. Switch to the bogus comment state. The next 
          // character that is consumed, if any, is the first character that will be in the comment.
          default:
            this.parser.notice('Unexpected character in markup declaration: ' + chr);
            this.state = Tokenizer.BOGUS_COMMENT;
            break;
        }
        break;

      case Tokenizer.COMMENT_START:
        switch (true) {

          case '-' === chr:
            this.state = Tokenizer.COMMENT_START_DASH;
            break;

          // TODO
          // case '\0' === chr:
          //   break;

          case '>' === chr:
            this.parser.notice('Unexpected character in comment start: ' + chr);
            this.state = Tokenizer.DATA;
            this.emit();
            break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in comment start');
            this.state = Tokenizer.DATA;
            this.emit();
            this.process(chr);
            break;

          default:
            this.token.data += chr;
            this.state = Tokenizer.COMMENT;
            break;
        }
        break;

      case Tokenizer.COMMENT:
        switch (true) {

          case '-' === chr:
            this.state = Tokenizer.COMMENT_END_DASH;
            break;

          // TODO
          // case '\0' === chr:
          //   break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in comment');
            this.state = Tokenizer.DATA;
            this.emit();
            this.process(chr);
            break;

          default:
            this.token.data += chr;
            break;
        }
        break;

      case Tokenizer.COMMENT_END_DASH:
        switch (true) {

          case '-' === chr:
            this.state = Tokenizer.COMMENT_END;
            break;

          // TODO
          // case '\0' === chr:
          //   break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in comment end dash');
            this.state = Tokenizer.DATA;
            this.emit();
            this.process(chr);
            break;

          default:
            this.token.data += '-' + chr;
            break;
        }
        break;

      case Tokenizer.COMMENT_END:
        switch (true) {

          case '>' === chr:
            this.state = Tokenizer.DATA;
            this.token.end = this.parser.stream.pointer;
            this.emit();
            break;

          // TODO
          // case '\0' === chr:
          //   break;

          case '!' === chr:
            this.parser.notice('Unexpected ! in comment end');
            this.state = Tokenizer.COMMEND_END_BANG;
            break;

          case '-' === chr:
            this.parser.notice('Unexpected - in comment end');
            this.token.data += chr;
            break;

          case -1 === chr:
            this.parser.notice('Unexpected end of file in comment end');
            this.state = Tokenizer.DATA;
            this.emit();
            this.process(chr);
            break;

          default:
            this.token.data += '--' + chr;
            this.state = Tokenizer.COMMENT;
            break;
        }
        break;

      default:
        this.parser.error('Unexpected tokenizer state: '+this.state.toUpperCase().replace(' ', '_'));
        break;
    }
  };

  Tokenizer.prototype.emit = function (token) {
    if (this.token) {
      token = this.token;
    }

    this.parser.treeConstructor.process(token);

    this.token = null;
  };

  core.Token = Token;
  core.Tokenizer = Tokenizer;

}(
  window.structure,
  window.structure.util
));
