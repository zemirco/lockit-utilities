
var util = require('util');
var events = require('events');
var should = require('should');
var utils = require('../index.js');

describe('pipe', function() {

  it('should work with single event emitter', function(done) {
    var Mother = function(){};
    util.inherits(Mother, events.EventEmitter);
    var Child = function(){};
    util.inherits(Child, events.EventEmitter);
    var mother = new Mother();
    var child = new Child();
    utils.pipe(child, mother);
    mother.on('smile', function(one, two, three) {
      one.should.equal('a');
      two.should.equal('b');
      three.should.equal('c');
      done();
    });
    child.emit('smile', 'a', 'b', 'c');
  });

  it('should work with an Array of event emitters', function(done) {
    var Mother = function(){};
    util.inherits(Mother, events.EventEmitter);
    var Child = function(){};
    util.inherits(Child, events.EventEmitter);
    var Teen = function(){};
    util.inherits(Teen, events.EventEmitter);
    var mother = new Mother();
    var child = new Child();
    var teen = new Teen();
    utils.pipe([child, teen], mother);
    var called = 0;
    mother.on('smile', function() {
      called++;
      if (called === 2) done();
    });
    child.emit('smile');
    teen.emit('smile');
  });

});
