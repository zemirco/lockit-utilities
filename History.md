
##### 0.4.2 / 2014-05-23

- use `req.session.regenerate` instead `req.session.destroy` (fix [#1](https://github.com/zemirco/lockit-utilities/issues/1))

##### 0.4.1 / 2014-05-23

- fix `restrict` by using `config.login.route` instead `config.loginRoute`
- drop unnecessary development dependencies
- update docs

##### 0.4.0 / 2014-05-05

- improve documentation
- `restrict()` function changed

  Instead of checking for `req.session.name` and `req.session.email`
  it now checks for `req.session.loggedIn`.

- add function `qr()` to generate link to QR code image

  ```js
  var config = {
    key: 'abcd1234',
    email: 'mirco.zeiss@gmail.com'
  };
  var link = util.qr(config);
  // https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=otpauth%3A%2F%2Ftotp%2FLockit%3Amirco.zeiss%40gmail.com%3Fsecret%3DMFRGGZBRGI2DI%3D%3D%3D%26issuer%3DLockit
  ```

- add function `verify()` to verify two-factor authentication token

  ```js
  var key = 'abcd1234';
  var token = '236709';
  var valid = util.verify(token, key);
  if (valid) {
    // continue here
  }
  ```

- add function `destroy()` to destroy sessions

  ```js
  util.destroy(req, function() {
    // user is now logged out
  });
  ```

- split tests into multiple files
- update development dependencies

##### 0.3.0 / 2014-04-17

- make `getDatabase()` work with String and Object
