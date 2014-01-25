/*
 * grunt-contrib-build
 * http://mariuslundgard.com/grunt-contrib-build
 *
 * Copyright (c) 2014 Marius Lundgård
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  
  var path = require('path'),
      fs = require('fs'),
      requirejs = require('requirejs'),
      rdefineEnd = /\}\);[^}\w]*$/,
      srcFolder = __dirname + '/../../src/',
      desc = 'Concatenate source, remove sub AMD definitions, (include/exclude modules with +/- flags), embed date/version',

      // RequireJS configuration
      config = {
        baseUrl: 'src',
        // name: 'main',
        // out: 'dist/main.js',
        // We have multiple minify steps
        optimize: 'none',
        // Include dependencies loaded with require
        findNestedDependencies: true,
        // Avoid breaking semicolons inserted by r.js
        skipSemiColonInsertion: true,
        wrap: {
          startFile: 'src/parts/start.frag',
          endFile: 'src/parts/end.frag'
        },
        // paths: {
          // sizzle: "sizzle/dist/sizzle"
        // },
        rawText: {},
        onBuildWrite: convert
      };

  grunt.registerMultiTask('build', desc, function() {

    // Merge task-specific and/or target-specific options with these defaults.
    // var dest = this.data.dest || 'dist/main.js',
    var wrap = this.data.wrap,
        title = grunt.config("pkg.title"),
        version = grunt.config("pkg.version"),
        author = grunt.config("pkg.author"),
        homepage = grunt.config("pkg.homepage");//,
        // done = this.async();

    //
    // console.log(this.data.name);
    config.name = this.data.name || 'main';
    config.out  = this.data.dest || 'dist/main.js';

    // var se
    var dest = this.data.dest || 'dist/main.js';

    // Process wrap.
    // console.log(options.wrap);
    // console.log(this.data.wrap);
    // var wrap = grunt.template.process(options.wrap);

    // console.log(this.data);

    //
    // grunt.log.writeln(this.target + ': ' + this.data);

    // console.log(done);

    /**
     * Handle Final output from the optimizer
     * @param {String} compiled
     */
    config.out = function( compiled ) {
      compiled = compiled
        // Embed Title
        .replace( /@TITLE/g, title )
        // Embed Version
        .replace( /@VERSION/g, version )
        // Embed Author
        .replace( /@AUTHOR/g, author )
        // Embed Homepage
        .replace( /@HOMEPAGE/g, homepage )
        // Embed Year
        .replace( /@YEAR/g, ( new Date() ).getFullYear() )
        // Embed Date
        // yyyy-mm-ddThh:mmZ
        .replace( /@DATE/g, ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" ) );

      

      // Write concatenated source to file
      grunt.file.write( dest, compiled );
    };

    // console.log('test');

    // Trace dependencies and concatenate files
    requirejs.optimize(config, function(response) {
      grunt.verbose.writeln(response);
      grunt.log.ok("File '" + dest + "' created.");
      done();
      // console.log('SUCCESS');
    }, function(err) {
      done(err);
    });

    // console.log('Built\n\n\n');
  });

  /**
   * Strip all definitions generated by requirejs
   * Convert "var" modules to var declarations
   * "var module" means the module only contains a return statement that should be converted to a var declaration
   * This is indicated by including the file in any "var" folder
   * @param {String} name
   * @param {String} path
   * @param {String} contents The contents to be written (including their AMD wrappers)
   */
  function convert( name, path, contents ) {
    // var amdName;

    // console.log(name, path);

    // // Convert var modules
    if ( /.\/var\//.test( path ) ) {
      contents = contents
        .replace( /define\([\w\W]*?return/, "var " + (/var\/([\w-]+)/.exec(name)[1]) + " =" )
        .replace( rdefineEnd, "" );
      }

    // // // Sizzle treatment
    // // } else if ( /^sizzle$/.test( name ) ) {
    // //   contents = "var Sizzle =\n" + contents
    // //     // Remove EXPOSE lines from Sizzle
    // //     .replace( /\/\/\s*EXPOSE[\w\W]*\/\/\s*EXPOSE/, "return Sizzle;" );

    // // AMD Name
    // } else if ( (amdName = grunt.option( "amd" )) != null && /^exports\/amd$/.test( name ) ) {
    //   // Remove the comma for anonymous defines
    //   contents = contents
    //     .replace( /(\s*)"jquery"(\,\s*)/, amdName ? "$1\"" + amdName + "\"$2" : "" );

    // } else {

    // //   // Ignore jQuery's exports (the only necessary one)
    // //   if ( name !== "jquery" ) {
    // //     contents = contents
    // //       .replace( /\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, "$1" )
    // //       // Multiple exports
    // //       .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );
    // //   }

      // Remove define wrappers, closure ends, and empty declarations
      contents = contents
        .replace( /define\([^{]*?{/, "" )
        .replace( rdefineEnd, "" );

    //   // Remove anything wrapped with
    //   // /* ExcludeStart */ /* ExcludeEnd */
    //   // or a single line directly after a // BuildExclude comment
    //   contents = contents
    //     .replace( /\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "" )
    //     .replace( /\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "" );

      // Remove empty definitions
      contents = contents
        .replace( /define\(\[[^\]]+\]\)[\W\n]+$/, "" );

    //   // TMP:
      // contents = contents.replace('\ndefine("main", function(){});\n', '');
    // }
    return contents;
  }

};
