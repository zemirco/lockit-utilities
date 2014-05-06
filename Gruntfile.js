
var fs = require('fs');
var handlebars = require('handlebars');

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
      jsdoc: {
        command: [
          './node_modules/.bin/jsdoc index.js',
          '--configure ./docs/conf.json',
          '--destination console',
          '--template ./docs/templates/haruki/ > ./docs/docs.json'
        ].join(' ')
      },
      ghpages: {
        command: 'git subtree push --prefix docs/ origin gh-pages'
      }
    },
    jade: {
      docs: {
        options: {
          data: {
            title: '<%= pkg.name %>',
            repo: '<%= pkg.repository.url %>',
            main: '<%= pkg.main %>'
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

  // write markdown files
  grunt.registerTask('gen', 'create markdown files from docs json', function() {
    var gen = require('./docs/generate.js');
    gen();
  });

  // create index.jade
  grunt.registerTask('index', 'create index.jade file', function() {
    // read handlebars template from source
    var source = fs.readFileSync('./docs/templates/index.handlebars.jade', 'utf8');

    // handlebars helper for fn anchor tags, i.e. 'destroy (req, done)' -> 'destroy-req-done-'
    handlebars.registerHelper('anchor', function(fn) {
      var name = fn.name + '-';
      var params = '';
      fn.parameters.forEach(function(param) {
        // check for params like config.key
        if (param.name.indexOf('.') === -1) {
          params += param.name + '-';
        }
      });
      return (name + params).toLowerCase();
    });

    var template = handlebars.compile(source);
    // write index.jade file
    var data = template({
      functions: require('./docs/docs.json').functions
    });
    fs.writeFileSync('./docs/templates/index.jade', data);
  });

  // create README.md
  grunt.registerTask('readme', 'create README.md', function() {
    // read handlebars template from source
    var source = fs.readFileSync('./docs/templates/README.handlebars.md', 'utf8');
    var template = handlebars.compile(source);
    var docsJSON = require('./docs/docs.json');
    // get contents of markdown files
    var contents = [];
    docsJSON.functions.forEach(function(fn) {
      var content = fs.readFileSync('./docs/includes/' + fn.name + '.md', 'utf8');
      contents.push(content);
    });
    // write README.md file
    var data = template(contents);
    fs.writeFileSync('./README.md', data);
  });

  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // 1. use jsdoc (grunt shell:jsdoc) to create ./docs/docs.json
  // 2. use ./docs/generate.js to create ./docs/includes/*.md files
  // 3. use 'index' task to write 'index.jade' file that includes all .md files
  // 4. use 'jade' task to create 'index.html'
  // 5. use 'readme' task to create 'README.md'
  grunt.registerTask('docs', ['shell:jsdoc', 'gen', 'index', 'jade', 'readme']);
  grunt.registerTask('publish', ['shell:ghpages']);

};
