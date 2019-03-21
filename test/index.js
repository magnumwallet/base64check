var base64check = require('../')
var fixtures = require('./fixtures')
var tape = require('tape')
var Buffer = require('safe-buffer').Buffer

fixtures.valid.forEach(function (f) {
  tape('decodes ' + f.string, function (t) {
    t.plan(2)
    var actual = base64check.decode(f.string).toString('hex')
    t.equal(actual, f.payload)

    actual = base64check.decodeUnsafe(f.string).toString('hex')
    t.equal(actual, f.payload)
  })
})

fixtures.invalid.forEach(function (f) {
  tape('decode throws on ' + f.string, function (t) {
    t.plan(2)
    t.throws(function () {
        base64check.decode(f.string)
    }, new RegExp(f.exception))

    t.equal(base64check.decodeUnsafe(f.string), undefined)
  })
})

fixtures.valid.forEach(function (f) {
  tape('encodes ' + f.string, function (t) {
    t.plan(1)
    var actual = base64check.encode(Buffer.from(f.payload, 'hex'))

    t.equal(actual, f.string)
  })
})
