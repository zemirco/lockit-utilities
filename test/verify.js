
var totp = require('notp').totp;
var should = require('should');
var utls = require('../index.js');

describe('verify', function() {

  it('should return "true" if token is valid', function() {
    var key = 'abcd1234';
    var token = totp.gen(key, {});
    var valid = utls.verify(token, key);
    valid.should.be.ok;
  });

  it('should return "false" if token is invalid', function() {
    var key = 'abcd1234';
    var token = '123456';
    var valid = utls.verify(token, key);
    valid.should.not.be.ok;
  });

  it('should return "false" if token is valid but old', function(done) {
    var options = {
      time: 0.05
    };
    var key = 'abcd1234';
    var token = totp.gen(key, options);
    setTimeout(function() {
      var valid = utls.verify(token, key, options);
      valid.should.not.be.ok;
      done();
    }, 100);
  });

});
