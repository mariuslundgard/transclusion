/*!
 * Structure JavaScript Library v@VERSION
 * http://mariuslundgard.com/structure.js
 *
 * Copyright 2005, 2014 Structure Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://mariuslundgard.com/structure.js/license
 *
 * Date: @DATE
 */

(function ( global, factory ) {

  // if ( typeof module === "object" && typeof module.exports === "object" ) {
  //   // For CommonJS and CommonJS-like environments where a proper window is present,
  //   // execute the factory and get Structure
  //   // For environments that do not inherently posses a window with a document
  //   // (such as Node.js), expose a Structure-making factory as module.exports
  //   // This accentuates the need for the creation of a real window
  //   // e.g. var Structure = require("jquery")(window);
  //   // See ticket #14549 for more info
  //   module.exports = global.document ?
  //     factory( global, true ) :
  //     function ( w ) {
  //       if ( !w.document ) {
  //         throw new Error( "Structure requires a window with a document" );
  //       }
  //       return factory( w );
  //     };
  // } else {
  //   factory( global );
  // }

  factory(global);

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function ( window ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
// "use strict";
