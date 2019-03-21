'use strict'

var Buffer = require('safe-buffer').Buffer

module.exports = function (checksumFn) {
  // Encode a buffer as a base64-check encoded string
  function encode (payload) {
    var checksum = checksumFn(payload)

    return Buffer.concat([
      payload,
      checksum
    ], payload.length + 4).toString('base64');
  }

  function decodeRaw (buffer) {
    var payload = buffer.slice(0, -4)
    var checksum = buffer.slice(-4)
    var newChecksum = checksumFn(payload)

    if (checksum[0] ^ newChecksum[0] |
        checksum[1] ^ newChecksum[1] |
        checksum[2] ^ newChecksum[2] |
        checksum[3] ^ newChecksum[3]) return

    return payload
  }

  // Decode a base64-check encoded string to a buffer, no result if checksum is wrong
  function decodeUnsafe (string) {
    var buffer = new Buffer(string, 'base64')
    if (!buffer) return

    return decodeRaw(buffer)
  }

  function decode (string) {
    var buffer = new Buffer(string, 'base64')
    var payload = decodeRaw(buffer, checksumFn)
    if (!payload) throw new Error('Invalid checksum')
    return payload
  }

  return {
    encode: encode,
    decode: decode,
    decodeUnsafe: decodeUnsafe
  }
}
