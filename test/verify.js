'use strict';

var totp = require('notp').totp;
var assert = require('assert');
var utls = require('../index.js');

describe('verify', function() {

  it('should return "true" if token is valid', function() {
    var key = 'abcd1234';
    var token = totp.gen(key, {});
    var valid = utls.verify(token, key);
    assert(valid);
  });

  it('should return "false" if token is invalid', function() {
    var key = 'abcd1234';
    var token = '123456';
    var valid = utls.verify(token, key);
    assert(!valid);
  });

  it('should return "false" if token is valid but old', function(done) {
    var options = {
      time: 0.05
    };
    var key = 'abcd1234';
    var token = totp.gen(key, options);
    setTimeout(function() {
      var valid = utls.verify(token, key, options);
      assert(!valid);
      done();
    }, 100);
  });

});
