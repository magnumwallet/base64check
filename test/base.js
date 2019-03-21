var tape = require('tape')
var Buffer = require('safe-buffer').Buffer
var createBlakeHash = require('blake-hash')
var base64checkBase = require('../base')

function blake256x2 (buffer) {
  buffer = createBlakeHash('blake256').update(buffer).digest()
  return createBlakeHash('blake256').update(buffer).digest()
}

var base64check = base64checkBase(blake256x2)

tape('custom checksum function (blake256x2)', function (t) {
  const address = 'Bz8EFemTk1poFU/acBi4h8Tj/otOEGMUjgM='
  const payload = Buffer.from('073f0415e993935a68154fda7018b887c4e3fe8b4e10', 'hex')

  t.equal(base64check.encode(payload, blake256x2), address)
  t.same(base64check.decodeUnsafe(address, blake256x2), payload)
  t.same(base64check.decode(address, blake256x2), payload)

  t.end()
})
