module.exports = function(grunt) {
  'use strict';

  function readOptionalJSON( filepath ) {
    var data = {};
    try {
      data = grunt.file.readJSON( filepath );
    } catch ( e ) {}
    return data;
  }

  var srcHintOptions = readOptionalJSON( "src/.jshintrc" );

  // Grunt plugins
  // grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-compress');
  // grunt.loadNpmTasks('grunt-jasmine-node');
  // grunt.loadNpmTasks('grunt-ddescribe-iit');
  // grunt.loadNpmTasks('grunt-merge-conflict');
  // grunt.loadNpmTasks('grunt-parallel');
  // grunt.loadNpmTasks('grunt-shell');

  // Load tasks
  grunt.loadTasks('build/tasks');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    build: {
      all: {
        dest: "dist/structure.js",
        minimum: [
          "core",
        //   "selector"
        ],
        // Exclude specified modules if the module matching the key is removed
        // removeWith: {
        //   ajax: [ "manipulation/_evalUrl" ],
        //   callbacks: [ "deferred" ],
        //   css: [ "effects", "dimensions", "offset" ],
        //   sizzle: [ "css/hiddenVisibleSelectors", "effects/animatedSelector" ]
        // }
      }
    },

    jsonlint: {
      pkg: {
        src: [ "package.json" ]
      },
      jscs: {
        src: [ ".jscs.json" ]
      },
      bower: {
        src: [ "bower.json" ]
      }
    },

    jscs: {
      src: "src/**/*.js",
      gruntfile: "Gruntfile.js",
      tasks: "build/tasks/*.js"
    },

    jshint: {
      all: {
        src: [
          "src/**/*.js", //"Gruntfile.js", "test/**/*.js", "build/tasks/*",
          // "build/{bower-install,release-notes,release}.js"
        ],
        options: {
          jshintrc: true
        }
      },
      dist: {
        src: "dist/structure.js",
        options: srcHintOptions
      }
    },

    uglify: {
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      options: {
        preserveComments: false,
        sourceMap: "dist/structure.min.map",
        sourceMappingURL: "structure.min.map",
        report: "min",
        beautify: {
          ascii_only: true
        },
        banner: "/*! Structure v<%= pkg.version %> | " +
            "(c) 2013, <%= grunt.template.today('yyyy') %> Marius Lundgård | " +
            "mariuslundgard.com/structure.js/license */",
        compress: {
          hoist_funs: false,
          loops: false,
          unused: false
        }
      }
    },

    watch: {
      files: [ "<%= jshint.all.src %>" ],
      tasks: "dev"
    }//,

    // browserify: {
    //   dist: {
    //     files: {
    //       'dist/structure.js': [
    //         'src/test.js'
    //       ],
    //     }//,
    //     // options: {
    //     //   transform: ['coffeeify']
    //     // }
    //   }
    // }
  });

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

  // Short list as a high frequency watch task
  grunt.registerTask( "dev", [ "build:*:*", "jshint"/*, "jscs"*/ ] );

  // Default task.
  grunt.registerTask('test', [/*'clean',*/ 'uglify'/*, 'browserify', 'nodeunit'*/]);
  grunt.registerTask('default', ['uglify' /*'browserify', 'jshint', 'test'*/]);

};