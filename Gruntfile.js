
var fs = require('fs');
var handlebars = require('handlebars');
var glob = require('glob');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        expr: true
      },
      files: ['Gruntfile.js', 'index.js', 'test/*.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**.js']
      }
    },
    shell: {
      docs: {
        command: [
          './node_modules/.bin/jsdoc index.js',
          '--configure ./docs/conf.json',
          '--destination console',
          '--template ./docs/templates/haruki/ > ./docs/docs.json'
        ].join(' ')
      }
    },
    jade: {
      docs: {
        options: {
          data: {
            title: '<%= pkg.name %>',
            repo: '<%= pkg.repository.url %>'
          }
        },
        files: {
          './docs/index.html': './docs/templates/index.jade'
        }
      }
    }
  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // write markdown files
  grunt.registerTask('gen', 'create markdown files from docs json', function() {
    var gen = require('./docs/generate.js');
    gen();
  });

  // create index.jade
  grunt.registerTask('index', 'create index.jade file', function() {
    // read handlebars template from source
    var source = fs.readFileSync('./docs/templates/index.handlebars.jade', 'utf8');
    var template = handlebars.compile(source);
    // get all markdown files from 'includes' folder
    var files = glob.sync('includes/*.md', {
      cwd: './docs/'
    });
    // write index.jade file
    var data = template(files);
    fs.writeFileSync('./docs/templates/index.jade', data);
  });

  // create README.md
  grunt.registerTask('readme', 'create README.md', function() {
    // read handlebars template from source
    var source = fs.readFileSync('./docs/templates/README.handlebars.md', 'utf8');
    var template = handlebars.compile(source);
    // get all markdown files from 'includes' folder
    var files = glob.sync('./docs/includes/*.md');
    // get contents of markdown files
    var contents = [];
    files.forEach(function(file) {
      var content = fs.readFileSync(file, 'utf8');
      contents.push(content);
    });
    // write README.md file
    var data = template(contents);
    fs.writeFileSync('./README.md', data);
  });

  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('mocha', ['mochaTest']);

  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // 1. use jsdoc (grunt shell) to create ./docs/docs.json
  // 2. use ./docs/generate.js to create ./docs/includes/*.md files
  // 3. use 'index' task to write 'index.jade' file that includes all .md files
  // 4. use 'jade' task to create 'index.html'
  // 4. use 'readme' task to create 'README.md'
  grunt.registerTask('docs', ['shell', 'gen', 'index', 'jade', 'readme']);

};
