
var url = require('url');
// lockit-login attaches name and email to req.session

// restrict routes to users who are logged in
exports.restrict = function(config) {

  // use empty object when no config provided
  config = config || {};

  // use default route when none specified
  var route = config.loginRoute || '/login';

  // simple restrict function from express auth example
  return function(req, res, next) {
    if (req.session.name && req.session.email) {
      next();
    } else {
      // send only status code when rest and json is active
      if (config.rest) return res.send(401);

      // redirect to login page but save url the user really wanted to visit
      res.redirect(route + '?redirect=' + req.url);
    }
  };

};

// get type of database from connection string
// return an object with the type of database and the required adapter
exports.getDatabase = function(config) {

  var uri = config.db.url || config.db;

  var urlObj = url.parse(uri);
  var prot = urlObj.protocol;

  var res = {};

  switch (prot) {
    case 'http:':
    case 'https:':
      res.type = 'couchdb';
      res.adapter = 'lockit-couchdb-adapter';
      break;
    case 'mongodb:':
      res.type = 'mongodb';
      res.adapter = 'lockit-mongodb-adapter';
      break;
    case 'postgres:':
      res.type = 'postgresql';
      res.adapter = 'lockit-sql-adapter';
      break;
    case 'mysql:':
      res.type = 'mysql';
      res.adapter = 'lockit-sql-adapter';
      break;
    case 'sqlite:':
      res.type = 'sqlite';
      res.adapter = 'lockit-sql-adapter';
      break;
  }

  return res;

};
