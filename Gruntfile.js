// 'use strict';

module.exports = function(grunt) {

  function readOptionalJSON(filepath) {
    var data = {};
    try {
      data = grunt.file.readJSON(filepath);
    } catch (e) {}
    return data;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    build: {
      all: {
        name: 'structure',
        dest: 'dist/structure.js',
        wrap: {
          startFile: 'src/parts/start.frag',
          endFile: 'src/parts/end.frag'
        }
      }
    },

    jsonlint: {
      pkg: {
        src: [ 'package.json' ]
      },
      jscs: {
        src: [ 'src/.jscs.json' ]
      },
    //   bower: {
    //     src: [ 'bower.json' ]
    //   }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src',
          dir: 'dist',
          optimize: 'none',
          wrap: {
            startFile: 'src/parts/start.frag',
            endFile: 'src/parts/end.frag'
          }
        }
      }
    },

    jscs: {
      src: 'src/*.js',
      gruntfile: 'Gruntfile.js',
      tasks: 'build/tasks/*.js',
      options: {
        config: 'src/.jscs.json'
      }
    },

    jshint: {
      all: {
        src: [
          'src/**/*.js', 'Gruntfile.js', 'test/**/*.js'
        ],
        options: {
          jshintrc: true
        }
      },
      // dist: {
      //   src: 'dist/structure.js',
      //   options: readOptionalJSON('src/.jshintrc')
      // }
    },

    uglify: {
      build: {
        src: 'dist/structure.js',
        dest: 'dist/structure.min.js'
      },
      options: {
        preserveComments: false,
        sourceMap: 'dist/structure.min.map',
        sourceMappingURL: 'structure.min.map',
        report: 'min',
        beautify: {
          ascii_only: true
        },
        banner: '/*! Structure v<%= pkg.version %> | ' +
            '(c) <%= grunt.template.today("yyyy") %> Marius Lundgård | ' +
            'http://mariuslundgard.com/structure.js/license */',
        compress: {
          hoist_funs: false,
          loops: false,
          unused: false
        }
      }
    },

    watch: {
      files: [ '<%= jshint.all.src %>' ],
      tasks: 'dev'
    }
  });

  // Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jscs-checker');

  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load tasks
  grunt.loadTasks('build/tasks');

  // Short list as a high frequency watch task
  grunt.registerTask('dev', [ 'build', 'jshint', 'jscs' ]);

  // Default task(s)
  grunt.registerTask('test', [/*'clean',*/ /*'uglify'*/ /*, 'browserify', 'nodeunit'*/]);
  grunt.registerTask('default', [ 'dev', /*'requirejs',*/ 'uglify' /*'browserify', 'jshint', 'test'*/]);
};
