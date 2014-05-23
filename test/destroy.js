
var should = require('should');
var utls = require('../index.js');

describe('destroy()', function() {

  it('should destroy cookie sessions', function(done) {
    var req = {
      session: {
        name: 'mirco',
        email: 'mirco.zeiss@gmail.com',
        loggedIn: true
      }
    };
    utls.destroy(req, function() {
      should(req.session).be.not.ok;
      done();
    });
  });

  it('should destroy sessions in session stores', function(done) {
    var req = {
      session: {
        name: 'mirco',
        email: 'mirco.zeiss@gmail.com',
        loggedIn: true,
        regenerate: function() {
          done();
        }
      },
      sessionStore: {},
    };
    utls.destroy(req);
  });

});
