
### qr (config)

Generate image link to QR code.


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

