
### pipe(source, target)

Pipe events from `source` to `target`. `source` can be a single event
emitter or an Array of event emitters.


- `source` **Object, Array** - Single event emitter or Array of event emitters

- `target` **Object** - Single event emitter





#### Example


```javascript
var util = require('util');
var events = require('events');
var utils = require('lockit-utils');

var Child = function() {};
util.inherits(Child, events.EventEmitter);

var Mother = function() {};
util.inherits(Mother, events.EventEmitter);

var child = new Child();
var mother = new Mother();

utils.pipe(child, mother);

mother.on('action', function(action) {
  console.log('look the child is ' + action);
});

child.emit('action', 'smiling');
```


