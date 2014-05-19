
### restrict([config])

Prevent users who aren't logged-in from accessing routes.
Use `loginRoute` for redirection. Function also remembers the requested url
and user is redirected after successful login. If `rest` is enabled
you'll get a `401` response.


- `config` **Object** *optional*  - Configuration object

  - `loginRoute` **String** - Route that handles the login process - default `'/login'`





#### Example


`config.js`
```javascript
exports.loginRoute = '/login';
```

`app.js`
```javascript
var config = require('./config.js');
app.get('/private', util.restrict(config), function(req, res) {
  res.send('only a logged in user can see this');
})
```


