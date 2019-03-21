'use strict'

var createHash = require('create-hash')
var base64checkBase = require('./base')

// SHA256(SHA256(buffer))
function sha256x2 (buffer) {
  var tmp = createHash('sha256').update(buffer).digest()
  return createHash('sha256').update(tmp).digest()
}

module.exports = base64checkBase(sha256x2)
