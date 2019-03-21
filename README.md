# base64check

[![NPM Package](https://img.shields.io/npm/v/base64check.svg?style=flat-square)](https://www.npmjs.org/package/base64check)

A straight forward implementation of base64check.


## Example

```javascript
var bs64check = require('bs64check')

var decoded = bs64check.decode('AGWhYFmGSi/bx8maRyOoOVvG8YjrwEay/w==')

console.log(decoded)
// => <Buffer 00 65 a1 60 59 86 4a 2f db c7 c9 9a 47 23 a8 39 5b c6 f1 88 eb>

console.log(bs64check.encode(decoded))
// => AGWhYFmGSi/bx8maRyOoOVvG8YjrwEay/w==
```


## LICENSE [MIT](LICENSE)
