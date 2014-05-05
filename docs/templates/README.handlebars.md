# Lockit utilities

[![Build Status](https://travis-ci.org/zeMirco/lockit-utilities.svg?branch=master)](https://travis-ci.org/zeMirco/lockit-utilities) [![NPM version](https://badge.fury.io/js/lockit-utils.svg)](http://badge.fury.io/js/lockit-utils)

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

{{#each}}{{{this}}}{{/each}}

## Test

`grunt test`

## License

MIT
