// ;(function (root, Structure, undefined){
//   'use strict';

//   var Token = Structure.Token;

//   var INITIAL     = 'initial'
//     , BEFORE_HTML = 'before html'
//     , BEFORE_HEAD = 'before head'
//     , IN_HEAD     = 'in head'
//     , AFTER_HEAD  = 'after head'
//     , IN_BODY     = 'in body'
//     , AFTER_BODY  = 'after body'
//     , AFTER_HTML  = 'after html'

//     , ATTR = 'attr';

//   var TreeConstructor = function (parser) {
//     this.initialize.call(this, parser);
//   };

//   TreeConstructor.prototype.parser = null;
//   TreeConstructor.prototype.node = null;
//   TreeConstructor.prototype.nodeStack = null;
//   TreeConstructor.prototype.mode = null;

//   TreeConstructor.prototype.initialize = function (parser) {
//     this.parser = parser;
//     this.node = parser.document;
//     this.nodeStack = [this.node];
//     this.mode = INITIAL;
//     this.modeStack = [];
//   };

//   TreeConstructor.prototype.pushNode = function (node) {
//     this.node = node;
//     this.nodeStack.push(node);
//     return node;
//   };

//   TreeConstructor.prototype.popNode = function () {
//     this.nodeStack.pop();
//     return (this.node = this.nodeStack[this.nodeStack.length-1]);
//   };

//   TreeConstructor.prototype.pushMode = function (mode) {
//     this.modeStack.push(this.mode);
//     return this.mode = mode;
//   };

//   TreeConstructor.prototype.popMode = function () {
//     return this.mode = this.modeStack.pop();
//   };

//   TreeConstructor.prototype.insertText = function (data) {
//     return this.node.appendChild(
//       this.parser.document.createText(data)
//     );
//   };

//   TreeConstructor.prototype.insertElement = function (name) {
//     // console.log('Inserting ', name, 'into', this.node.name);
//     var newNode = this.parser.document.createElement(name);
//     this.node.appendChild(newNode);
//     return this.pushNode(newNode);
//   };

//   TreeConstructor.prototype.insertAttr = function (name) {
//     var newNode = this.parser.document.createAttr(name);
//     this.node.appendAttr(newNode);
//     return this.pushNode(newNode);
//   };

//   TreeConstructor.prototype.process = function (token) {
//     switch (this.mode) {

// ///////////INITIAL
//       case INITIAL:
//         this.mode = BEFORE_HTML;
//         this.process(token);
//         break;

// ///////////BEFORE_HTML
//       case BEFORE_HTML:
//         switch (true) {

//           case Token.TEXT === token.type && whitespace(token.data):
//             // this.insertText(token.data);
//             break;

//           // case Token.ATTR_KEY === token.type:
//           //   this.insertAttr(token.name);
//           //   this.pushMode(ATTR);
//             break;

//           case Token.START_TAG_CLOSE === token.type:
//             this.mode = BEFORE_HEAD;
//             break;

//           case Token.ATTR_KEY === token.type:
//             this.insertAttr(token.name);
//             break;

//           case Token.START_TAG === token.type:
//             if ('html' === token.name) {
//               this.insertElement(token.name);
//               break;
//             }

//           default:
//             this.insertElement('html');
//             this.mode = BEFORE_HEAD;
//             this.process(token);
//             break;
//         }
//         break;

// ///////////BEFORE_HEAD
//       case BEFORE_HEAD:
//         switch (true) {

//           // case Token.TEXT === token.type:
//           //   this.mode = IN_HEAD;
//           //   this.process(token);
//           //   break;

//           default:
//             this.insertElement('head');
//             this.mode = IN_HEAD;
//             this.process(token);
//             break;
//         }
//         break;
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       case IN_HEAD:
//         switch (true) {

//           // case Token.TEXT === token.type:
//           //   this.mode = AFTER_HEAD;
//           //   this.process(token);
//           //   break;

//           default:
//             this.popNode();
//             this.mode = AFTER_HEAD;
//             this.process(token);
//             break;
//         }
//         break;
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       case AFTER_HEAD:
//         switch (true) {

//           // case Token.TEXT === token.type:
//           //   this.mode = AFTER_HEAD;
//           //   this.process(token);
//           //   break;

//           default:
//             this.insertElement('body');
//             this.mode = IN_BODY;
//             this.process(token);
//             break;
//         }
//         break;

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       case IN_BODY:
//         switch (true) {

//           case Token.TEXT === token.type:
//             this.insertText(token.data);
//             break;

//           case Token.START_TAG === token.type:
//             this.insertElement(token.name);
//             break;

//           case Token.START_TAG_CLOSE === token.type:
//             break; // Ignore

//           case Token.END_TAG === token.type:
//             this.popNode();
//             // console.log(token);
//             if ('body' === token.name) {
//               this.popNode();
//               this.mode = AFTER_BODY;
//               // alert('end tag');
//             }
//             break;

//           case Token.ATTR_KEY === token.type:
//             this.insertAttr(token.name);
//             break;

//           default:
//             this.popNode();
//             this.mode = AFTER_BODY;
//             this.process(token);
//             break;
//         }
//         break;

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       case AFTER_BODY:
//         switch (true) {

//           // case Token.TEXT === token.type:
//           //   this.mode = AFTER_HEAD;
//           //   this.process(token);
//           //   break;

//           default:
//             this.popNode();
//             this.mode = AFTER_HTML;
//             this.process(token);
//             break;
//         }
//         break;

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       case AFTER_HTML:
//         switch (true) {

//           // case Token.TEXT === token.type:
//           //   this.mode = AFTER_HEAD;
//           //   this.process(token);
//           //   break;

//           case Token.EOF === token.type:
//             // console.log('CONSTRUCTION COMPLETE');
//             break;

//           default:
//             this.parser.error('Unexpected token after html: '+token.type.toUpperCase().replace(' ', '_'));
//             break;
//         }
//         break;

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       case ATTR:
//         switch (true) {

//           case Token.TEXT === token.type:
//             this.insertText(token.data);
//             break;

//           case Token.END_ATTR === token.type:
//             this.popMode();
//             break;

//           default:
//             this.parser.error('Unexpected token in attribute: '+token.type.toUpperCase().replace(' ', '_'));
//             break;
//         }
//         break;

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       default:
//         this.parser.error('Unexpected tree constructor mode: '+this.mode);
//         break;
//     }
//   };

//   // root.Structure || (root.Structure = {});
//   root.Structure.TreeConstructor = TreeConstructor;
  
// }(this, this.Structure));