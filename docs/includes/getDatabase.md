
### getDatabase (config)

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

