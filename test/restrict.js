'use strict';

var assert = require('assert');
var utls = require('../index.js');

describe('restrict()', function() {

  it('should protect routes from unauthorized access', function(done) {
    var req = {
      session: {
        name: null,
        email: null
      }
    };
    var fn = utls.restrict();
    var res = {
      redirect: function() {
        // simply make sure res.redirect() is called
        done();
      }
    };
    fn(req, res, function() {});
  });

  it('should allow access to authorized users', function(done) {
    var req = {
      session: {
        name: 'john',
        email: 'john@email.com',
        loggedIn: true
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
        name: null,
        email: null
      },
      originalUrl: '/profile'
    };
    var fn = utls.restrict();
    var res = {
      redirect: function(route) {
        assert.equal(route, '/login?redirect=/profile');
        done();
      }
    };
    fn(req, res, function() {});
  });

  it('should use the custom route if one is specified', function(done) {
    var req = {
      session: {
        name: null,
        email: null
      },
      originalUrl: '/profile'
    };
    var config = {
      login: {
        route: '/test'
      }
    };
    var fn = utls.restrict(config);
    var res = {
      redirect: function(route) {
        assert.equal(route, '/test?redirect=/profile');
        done();
      }
    };
    fn(req, res, function() {});
  });

  it('should send 401 if rest is active', function(done) {
    var req = {
      session: {
        name: null,
        email: null
      }
    };
    var config = {
      rest: true
    };
    var fn = utls.restrict(config);
    var res = {
      send: function(status) {
        assert.equal(status, 401);
        done();
      }
    };
    fn(req, res, function() {});
  });

});
