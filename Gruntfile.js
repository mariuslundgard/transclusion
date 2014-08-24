module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        options: {
          banner: '(function(exports){\n',
          footer: '})(this);'
        },
        files: {
          'dist/structure.js': [
            'src/namespace.js',
            'src/element-rules.js',
            'src/element-directive.js',
            'src/element-directive-set.js',
            'src/node.js',
            'src/nodes/element.js',
            'src/nodes/attr.js',
            'src/nodes/text.js',
            'src/nodes/comment.js',
            'src/nodes/array.js',
            'src/nodes/expr.js',
            'src/nodes/var.js',
            'src/nodes/operator.js',
            'src/nodes/string.js',
            'src/nodes/num.js',
            'src/char-stream.js',
            'src/char-tester.js',
            'src/document.js',
            'src/token.js',
            'src/tokenizer.js',
            'src/tree-constructor.js',
            'src/parser.js',
            'src/compiler.js'
          ]
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
      bower: {
        src: [ 'bower.json' ]
      }
    },

    jscs: {
      src: 'src/*.js',
      gruntfile: 'Gruntfile.js',
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
      }
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
        banner: '/*! Structure.js v<%= pkg.version %> | ' +
            '(c) <%= grunt.template.today("yyyy") %> Marius Lundgård | ' +
            'http://mariuslundgard.com/projects/structure/license */',
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
  grunt.loadNpmTasks('grunt-jscs-checker');

  // Short list as a high frequency watch task
  grunt.registerTask('dev', [ 'concat', 'jshint', 'jscs' ]);

  // Default task(s)
  grunt.registerTask('test', [ 'uglify' ]);
  grunt.registerTask('default', [ 'dev', 'uglify' ]);
};
