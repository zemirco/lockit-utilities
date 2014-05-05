
var should = require('should');
var utls = require('../index.js');

describe('getDatabaseType()', function() {

  it('should work for CouchDB', function(done) {
    var config = {
      db: 'http://127.0.0.1:5984/test'
    };
    var db = utls.getDatabase(config);
    db.type.should.equal('couchdb');
    db.adapter.should.equal('lockit-couchdb-adapter');
    var config_alt = {
      db: {
        url: 'http://127.0.0.1:5984/test'
      }
    };
    var db_alt = utls.getDatabase(config_alt);
    db_alt.type.should.equal('couchdb');
    db_alt.adapter.should.equal('lockit-couchdb-adapter');
    done();
  });

  it('should work for MongoDB', function(done) {
    var config = {
      db: {
        url: 'mongodb://127.0.0.1/test'
      }
    };
    var db = utls.getDatabase(config);
    db.type.should.equal('mongodb');
    db.adapter.should.equal('lockit-mongodb-adapter');
    done();
  });

  it('should work for PostgreSQL', function(done) {
    var config = {
      db: {
        url: 'postgres://127.0.0.1:5432/users'
      }
    };
    var db = utls.getDatabase(config);
    db.type.should.equal('postgresql');
    db.adapter.should.equal('lockit-sql-adapter');
    done();
  });

  it('should work for MySQL', function(done) {
    var config = {
      db: {
        url: 'mysql://127.0.0.1:9821/users'
      }
    };
    var db = utls.getDatabase(config);
    db.type.should.equal('mysql');
    db.adapter.should.equal('lockit-sql-adapter');
    done();
  });

  it('should work for SQLite', function(done) {
    var config = {
      db: {
        url: 'sqlite://'
      }
    };
    var db = utls.getDatabase(config);
    db.type.should.equal('sqlite');
    db.adapter.should.equal('lockit-sql-adapter');
    done();
  });

});
