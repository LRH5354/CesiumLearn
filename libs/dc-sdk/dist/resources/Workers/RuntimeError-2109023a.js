define(['exports', './when-54c2dc71'], function (t, r) {
  'use strict'
  function e(t) {
    var r
    ;(this.name = 'RuntimeError'), (this.message = t)
    try {
      throw new Error()
    } catch (t) {
      r = t.stack
    }
    this.stack = r
  }
  r.defined(Object.create) &&
    ((e.prototype = Object.create(Error.prototype)).constructor = e),
    (e.prototype.toString = function () {
      var t = this.name + ': ' + this.message
      return r.defined(this.stack) && (t += '\n' + this.stack.toString()), t
    }),
    (t.RuntimeError = e)
})
