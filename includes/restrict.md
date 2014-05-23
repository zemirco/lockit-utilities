
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


