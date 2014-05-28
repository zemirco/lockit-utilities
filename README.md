# Lockit utilities

[![Build Status](https://travis-ci.org/zemirco/lockit-utilities.svg?branch=master)](https://travis-ci.org/zemirco/lockit-utilities) [![NPM version](https://badge.fury.io/js/lockit-utils.svg)](http://badge.fury.io/js/lockit-utils)

Small utilities module for [lockit](https://github.com/zemirco/lockit).

## Installation

`npm install lockit-utils`

```js
var utls = require('lockit-utils');
```

## Configuration

```js
// redirect target when requesting restricted page
exports.login = {
  route: '/login'
};

// database connection string
// CouchDB
exports.db = 'http://127.0.0.1:5984/';

// MongoDB
// exports.db = {
//   url: 'mongodb://127.0.0.1/',
//   name: 'test',
//   collection: 'users'
// };

// PostgreSQL
// exports.db = {
//   url: 'postgres://127.0.0.1:5432/',
//   name: 'users',
//   collection: 'my_user_table'
// };

// MySQL
// exports.db = {
//   url: 'mysql://127.0.0.1:3306/',
//   name: 'users',
//   collection: 'my_user_table'
// };

// SQLite
// exports.db = {
//   url: 'sqlite://',
//   name: ':memory:',
//   collection: 'my_user_table'
// };
```

## Features

- protect routes from unauthorized access and redirect
- get database and lockit adapter from connection string
- generate link to QR code image for two-factor auth
- verify provided two-factor token
- destroy a session (works with cookie sessions and session stores)

## Methods
### restrict([config])

Prevent users who aren't logged-in from accessing routes.
Use `login.route` for redirection. Function also remembers the requested url
and user is redirected after successful login. If `rest` is enabled
you'll get a `401` response.


- `config` **Object** *optional*  - Configuration object

  - `login` **String** - Route that handles the login process - default `'/login'`





#### Example


`config.js`
```javascript
exports.login = {
  route: '/login'
};
```

`app.js`
```javascript
var config = require('./config.js');
app.get('/private', utils.restrict(config), function(req, res) {
  res.send('only a logged in user can see this');
})
```



### getDatabase(config)

Get type of database and database adapter name from connection information.


- `config` **Object** - Configuration object

  - `db` **String, Object** - Database connection string / object



#### Returns

- **Object** - Object containing database `type` and `adapter`



#### Example


`config.js (CouchDB)`
```javascript
exports.db = 'http://127.0.0.1:5984/';
```

`config.js (all other DBs)`
```javascript
exports.db = {
  url: 'postgres://127.0.0.1:5432/',
  name: 'users',
  collection: 'my_user_table'
}
```

`app.js`
```javascript
var config = require('./config.js');
var db = util.getDatabase(config);
// {
//   type: 'couchdb',
//   adapter: 'lockit-couchdb-adapter'
// }
```



### qr(config)

Generate link to QR code,  uses <a href="https://developers.google.com/chart/infographics/docs/qr_codes">Google Charts</a>.


- `config` **Object** - Configuration object

  - `key` **String** - Individual random key for user

  - `email` **String** - User email for Google Authenticator app

  - `issuer` **String** - Issuer for Google Authenticator - default `'Lockit'`



#### Returns

- **String** - URL for QR code



#### Example


```javascript
var config = {
  key: 'abcd1234',
  email: 'mirco.zeiss@gmail.com'
};
var link = util.qr(config);
// https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=otpauth%3A%2F%2Ftotp%2FLockit%3Amirco.zeiss%40gmail.com%3Fsecret%3DMFRGGZBRGI2DI%3D%3D%3D%26issuer%3DLockit
```



### verify(token, key, [options])

Verify a two-factor authentication token, uses <a href="http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm">time-based one-time password algorithm (totp)</a>.
To be used with <a href="https://support.google.com/accounts/answer/1066447?hl=en">Google Authenticator</a>.


- `token` **String** - The two-factor token to verify

- `key` **String** - The individual key for the user

- `options` **Object** *optional*  - Options object for
  <a href="https://github.com/guyht/notp#totpverifytoken-key-opt">notp#totp.verify</a>

  - `window` **String** - Allowable margin for counter - default `6`

  - `time` **Number** - Time step of counter in seconds - default `30`



#### Returns

- **Boolean** - `true` if token is valid



#### Example


```javascript
var key = 'abcd1234';
var token = '236709';
var valid = util.verify(token, key);
if (valid) {
  // continue here
}
```



### destroy(req, done)

Destroy the current session. Works with cookie sessions and session stores.


- `req` **Object** - The default Express request object

- `done` **function** - Function executed when session is destroyed





#### Example


```javascript
util.destroy(req, function() {
  // user is now logged out
});
```



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


## Test

`grunt test`

## License

MIT
