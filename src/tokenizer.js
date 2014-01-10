// ;(function (root, Structure, undefined){
//   'use strict';

//   // Tokenizer states
//   var DATA     = 'data'
//     , TAG_OPEN = 'tag open'
//     , TAG_NAME = 'tag name'
//     , END_TAG_NAME = 'end tag name'
//     , BEFORE_ATTR_KEY = 'before attr key'
//     , ATTR_KEY = 'attr key'
//     , BEFORE_ATTR_VALUE = 'before attr value'
//     , ATTR_VALUE = 'attr value'
//     , AFTER_ATTR = 'after attr'
//     ;

//   var Token = {
//     TEXT: 'text',
//     START_TAG: 'start tag',
//     END_TAG: 'end tag',
//     ATTR_KEY: 'attr key',
//     // ATTR_VALUE: 'attr value', -> Using TEXT for attribute values
//     END_ATTR: 'end attr',
//     START_TAG_CLOSE: 'start tag close',
//     EOF: 'eof',
//   };

//   var Tokenizer = function (parser) {
//     this.initialize.call(this, parser);
//     return this;
//   };

//   Tokenizer.prototype.initialize = function (parser) {
//     this.parser = parser;
//     this.state = DATA;
//     this.token = null;
//     this.attrDelimiter = null;
//   };

//   Tokenizer.prototype.process = function (chr) {
//     // console.log(this.state, chr);
//     switch (this.state) {

// ////////// DATA 
//       case DATA:
//         switch (true) {
//           // case alpha(chr):
            
//           //   break;

//           case '<' === chr:
//             this.state = TAG_OPEN;
//             break;

//           case -1 === chr:
//             this.emit({
//               type: Token.EOF
//             });
//             break;

//           default:
//             this.emit({
//               type: Token.TEXT,
//               data: chr
//             });
//             // this.parser.error('Unexpected character in data: '+chr);
//             break;
//         }
//         break;

// ////////// TAG_OPEN 
//       case TAG_OPEN:
//         switch (true) {

//           case alpha(chr):
//             this.token = {
//               type: Token.START_TAG,
//               name: chr,
//             };
//             this.state = TAG_NAME;
//             break;

//           case '/' === chr:
//             this.token = {
//               type: Token.END_TAG,
//               name: '',
//             };
//             this.state = END_TAG_NAME;
//             break;

//           case -1 === chr:
//             this.parser.error('Unexpected EOF in tag open');
//             break;

//           default:
//             this.parser.error('Unexpected character in tag open: '+chr);
//             break;
//         }
//         break;

// ////////// TAG_NAME
//       case TAG_NAME:
//         switch (true) {
//           case alpha(chr):
//             this.token.name += chr;
//             break;

//           case whitespace(chr):
//             this.emit();
//             this.state = BEFORE_ATTR_KEY;
//             break;

//           case '>' === chr:
//             this.emit();
//             this.state = BEFORE_ATTR_KEY;
//             this.process(chr);
//             break;

//           case -1 === chr:
//             // this.parser.error('Unexpected EOF in tag name');
//             this.emit();
//             this.state = DATA;
//             this.process(chr);
//             break;

//           default:
//             this.parser.error('Unexpected character in tag name: '+chr);
//             break;
//         }
//         break;

// ////////// END_TAG_NAME
//       case END_TAG_NAME:
//         switch (true) {

//           case alpha(chr):
//             this.token.name += chr;
//             break;

//           case '>' === chr:
//             this.emit();
//             this.state = DATA;
//             break;

//           default:
//             this.parser.error('Unexpected character in end tag name: '+chr);
//             break;
//         }
//         break;

// ////////// BEFORE_ATTR_KEY
//       case BEFORE_ATTR_KEY:
//         switch (true) {

//           case whitespace(chr):
//             break; // Ignore

//           case alpha(chr):
//             this.token = {
//               type: Token.ATTR_KEY,
//               name: chr,
//             };
//             this.state = ATTR_KEY;
//             break;

//           case '>' === chr:
//             this.emit({
//               type: Token.START_TAG_CLOSE
//             });
//             this.state = DATA;
//             break;

//           default:
//             this.parser.error('Unexpected character before attribute key: '+chr);
//             break;
//         }
//         break;

// ////////// ATTR_KEY
//       case ATTR_KEY:
//         switch (true) {
//           case alpha(chr):
//             this.token.name += chr;
//             break;

//           case '=' === chr:
//             this.emit();
//             this.state = BEFORE_ATTR_VALUE;
//             break;

//           default:
//             this.parser.error('Unexpected character in attribute key: '+chr);
//             break;
//         }
//         break;

// ////////// BEFORE_ATTR_VALUE
//       case BEFORE_ATTR_VALUE:
//         switch (true) {

//           case whitespace(chr):
//             break; // Ignore

//           case '"' === chr:
//           case "'" === chr:
//             this.attrDelimiter = chr;
//             this.state = ATTR_VALUE;
//             this.token = {
//               type: Token.TEXT,
//               data: '',
//             };
//             break;

//           default:
//             this.parser.error('Unexpected character before attribute value: '+chr);
//             break;
//         }
//         break;

// ////////// ATTR_VALUE
//       case ATTR_VALUE:
//         switch (true) {
//           case this.attrDelimiter === chr:
//             this.emit();
//             this.emit({
//               type: Token.END_ATTR,
//             });
//             this.state = AFTER_ATTR;
//             break;

//           default:
//             this.token.data += chr;
//             break;
//         }
//         break;

// ////////// AFTER_ATTR
//       case AFTER_ATTR:
//         switch (true) {
//           case whitespace(chr):
//             this.state = BEFORE_ATTR_KEY;
//             break;

//           case '>' === chr:
//             this.state = BEFORE_ATTR_KEY;
//             this.process(chr);
//             break;

//           default:
//             // this.token.data += chr;
//             this.parser.error('Unexpected character after attribute: '+chr);
//             break;
//         }
//         break;

//       default:
//         this.parser.error('Unexpected tokenizer state: '+this.state.toUpperCase().replace(' ', '_'));
//         break;
//     }
//   };

//   Tokenizer.prototype.emit = function (token) {
//     if (this.token) {
//       token = this.token;
//     }
//     console.log('State:', token.type, 'Mode:', this.parser.treeConstructor.mode);
//     this.parser.treeConstructor.process(token);
//     this.token = null;
//   };

//   // root.Structure || (root.Structure = {});
//   root.Structure.Tokenizer = Tokenizer;
//   root.Structure.Token = Token;

// }(this, this.Structure));
