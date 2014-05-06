
var fs = require('fs');
var handlebars = require('handlebars');
var docs = require('./docs.json');

/**
 * Internal helper functions
 */

String.prototype.p = function() {
  return this.replace(/<\/?p>/g, '');
};

String.prototype.code = function() {
  return this.replace(/<\/?code>/g, '`');
};

/**
 * Handlebars helpers
 */

// parameters inside function(...)
handlebars.registerHelper('param', function(param, first) {
  // ignore params like config.key
  if (param.name.indexOf('.') !== -1) return;
  // check if param is optional
  var res = param.optional ? '[' + param.name + ']' : param.name;
  // no comma before first parameter
  if (!first) res = ', ' + res;
  return res;
});

// generate example code blocks with captions
handlebars.registerHelper('example', function(example) {
  // get caption
  var captionRe = /<caption>(.+)<\/caption>/;
  var match = captionRe.exec(example);
  var caption = (match) ? '`' + match[1] + '`\n' : '';
  // remove caption from code
  var codeRe = /<caption>(.+)<\/caption>\r\n\s{2}/;
  var code = example.replace(codeRe, '');
  // fix bug caused by using <caption> - one indentation too much
  if (caption) code = code.replace(/\r\n\s{2}/g, '\r\n');
  // generate code block
  var res = caption + '```javascript\n' + code + '\n```';
  return res;
});

handlebars.registerHelper('desc', function(description) {
  // replace <code></code> block with gfm code block ``
  description = description.code();
  // remove <p></p> tags from description
  description = description.p();
  return description;
});

handlebars.registerHelper('list', function(param) {
  // split param names like config.key in array
  var names = param.name.split('.');
  // check for params like config.key
  var child = (names.length > 1) ? true : false;
  // indent if param is a child
  var indentation = child ? '  ' : '';
  // optional flag only for parent params
  var optional = (param.optional && !child) ? ' *optional* ' : '';
  var name = child ? names[1] : param.name;
  name = '`' + name + '`';
  var type = Array.isArray(param.type) ? param.type.join(', ') : param.type;
  type = '**' + type + '**';
  // remove <p></p> tags from description
  var desc = param.description.p();
  desc = ' - ' + desc;
  // default values
  var def = param.default ? ' - default `' + param.default + '`' : '';
  return indentation + '- ' + name + ' ' + type + optional + desc + def;
});

handlebars.registerHelper('return', function(returns) {
  if (!returns) return;
  var title = '#### Returns\n\n';
  var type = '- **' + returns.type + '**';
  var desc = returns.description ? ' - ' + returns.description.p().code() : '';
  var res = title + type + desc;
  return res;
});

// read handlebars template from source
var source = fs.readFileSync(__dirname + '/templates/template.handlebars', 'utf8');
var template = handlebars.compile(source);

// generate docs
module.exports = function() {
  // loop over functions
  docs.functions.forEach(function(fn) {
    // generate markdown file for each function
    var data = template(fn);
    // write markdown files
    fs.writeFileSync(__dirname + '/includes/' + fn.name + '.md', data);
  });
};
