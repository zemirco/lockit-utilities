
### verify (token, key, [options])

Verify a two-factor authentication token.


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

