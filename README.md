# Lockit utilities

[![Build Status](https://travis-ci.org/zeMirco/lockit-utilities.png?branch=master)](https://travis-ci.org/zeMirco/lockit-utilities) [![NPM version](https://badge.fury.io/js/lockit-utils.png)](http://badge.fury.io/js/lockit-utils)

[![NPM](https://nodei.co/npm/lockit-utils.png)](https://nodei.co/npm/lockit-utils/)

Small utilities module for [lockit](https://github.com/zeMirco/lockit).

## Installation

`npm install lockit-utils`

```js
var utls = require('lockit-utils');
```

## Configuration

```js
// redirect target when requesting restricted page
exports.loginRoute = '/login';

// database connection string
// CouchDB
exports.db = 'http://127.0.0.1:5984/test';

// MongoDB
// exports.db = 'mongodb://127.0.0.1/test';

// PostgreSQL
// exports.db = 'postgres://127.0.0.1:5432/users';

// MySQL
// exports.db = 'mysql://127.0.0.1:9821/users';

// SQLite
// exports.db = 'sqlite://:memory:';
```

## Features

 - protect routes from unauthorized access and redirect
 - get database and lockit adapter from connection string

## Methods

##### `utls.restrict(config)`
 
```js
var config = require('./config.js');

app.get('/private', utls.restrict(config), function(req, res) {
  res.send('only a registered user can see this');
})
```

#### `utls.getDatabase(config)`

```js
var config = require('./config.js');

var db = utls.getDatabase(config);

// db is an object containing the keys 'type' and 'adapter'
// {
//   type: 'couchdb',
//   adapter: 'lockit-couchdb-adapter'
// }
```

## Test

`grunt`

## License

Copyright (C) 2013 [Mirco Zeiss](mailto: mirco.zeiss@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.