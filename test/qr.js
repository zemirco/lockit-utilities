'use strict';

var should = require('should');
var utls = require('../index.js');

describe('qr', function() {

  it('should return a String', function() {
    var config = {
      key: 'abcd1244',
      email: 'mirco.zeiss@gmail.com'
    };
    var link = utls.qr(config);
    link.should.be.type('string');
  });

  it('should use "Lockit" as default issuer', function() {
    var config = {
      key: 'abcd1244',
      email: 'mirco.zeiss@gmail.com'
    };
    var link = utls.qr(config);
    var label = encodeURIComponent('Lockit:mirco.zeiss@gmail.com');
    var issuer = encodeURIComponent('&issuer=Lockit');
    link.should.containEql(label);
    link.should.containEql(issuer);
  });

  it('should allow for a custom issuer', function() {
    var config = {
      key: 'abcd1244',
      email: 'mirco.zeiss@gmail.com',
      issuer: 'app'
    };
    var link = utls.qr(config);
    var label = encodeURIComponent('app:mirco.zeiss@gmail.com');
    var issuer = encodeURIComponent('&issuer=app');
    link.should.containEql(label);
    link.should.containEql(issuer);
  });

  it('should use base32 encoding for the key', function() {
    var config = {
      key: 'abcd1244',
      email: 'mirco.zeiss@gmail.com'
    };
    var encoded = encodeURIComponent('MFRGGZBRGI2DI===');
    var link = utls.qr(config);
    link.should.containEql(encoded);
  });

});
