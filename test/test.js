
var should = require('should');
var utls = require('../index.js');

describe('lockit-utils', function() {
  
  describe('restrict', function() {

    it('should protect routes from unauthorized access', function(done) {
      var req = {
        session: {
          username: null,
          email: null
        }
      };
      var fn = utls.restrict();
      var res = {
        redirect: function(route) {
          // simply make sure res.redirect() is called
          done();
        }
      };
      fn(req, res, function() {});
    });

    it('should allow access to authorized users', function(done) {
      var req = {
        session: {
          username: 'john',
          email: 'john@email.com'
        }
      };
      var res = {};
      var fn = utls.restrict();
      // simply make sure next() is called
      fn(req, res, function() {
        done();
      });
    });

    it('should use the default route when none is specified', function(done) {
      var req = {
        session: {
          username: null,
          email: null
        },
        url: '/profile'
      };
      var fn = utls.restrict();
      var res = {
        redirect: function(route) {
          route.should.equal('/login?redirect=/profile');
          done();
        }
      };
      fn(req, res, function() {});
    });

    it('should use the custom route if one is specified', function(done) {
      var req = {
        session: {
          username: null,
          email: null
        },
        url: '/profile'
      };
      var config = {
        loginRoute: '/test'
      };
      var fn = utls.restrict(config);
      var res = {
        redirect: function(route) {
          route.should.equal('/test?redirect=/profile');
          done();
        }
      };
      fn(req, res, function() {});
    });

    it('should send 401 if rest is active', function(done) {
      var req = {
        session: {
          username: null,
          email: null
        }
      };
      var config = {
        rest: true
      };
      var fn = utls.restrict(config);
      var res = {
        send: function(status) {
          status.should.equal(401);
          done();
        }
      };
      fn(req, res, function() {});
    });
    
  });
  
  describe('getDatabaseType', function() {
    
    it('should work for CouchDB', function(done) {
      var config = {
        db: 'http://127.0.0.1:5984/test'
      };
      var db = utls.getDatabase(config);
      db.type.should.equal('couchdb');
      db.adapter.should.equal('lockit-couchdb-adapter');
      done();
    });

    it('should work for MongoDB', function(done) {
      var config = {
        db: 'mongodb://127.0.0.1/test'
      };
      var db = utls.getDatabase(config);
      db.type.should.equal('mongodb');
      db.adapter.should.equal('lockit-mongodb-adapter');
      done();
    });

    it('should work for PostgreSQL', function(done) {
      var config = {
        db: 'postgres://127.0.0.1:5432/users'
      };
      var db = utls.getDatabase(config);
      db.type.should.equal('postgresql');
      db.adapter.should.equal('lockit-sql-adapter');
      done();
    });

    it('should work for MySQL', function(done) {
      var config = {
        db: 'mysql://127.0.0.1:9821/users'
      };
      var db = utls.getDatabase(config);
      db.type.should.equal('mysql');
      db.adapter.should.equal('lockit-sql-adapter');
      done();
    });

    it('should work for SQLite', function(done) {
      var config = {
        db: 'sqlite://:memory:'
      };
      var db = utls.getDatabase(config);
      db.type.should.equal('sqlite');
      db.adapter.should.equal('lockit-sql-adapter');
      done();
    });
    
  });
  
});