
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


