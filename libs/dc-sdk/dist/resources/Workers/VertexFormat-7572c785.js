define(['exports', './when-54c2dc71', './Check-6c0211bc'], function (e, o, t) {
  'use strict'
  function i(e) {
    ;(e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT)),
      (this.position = o.defaultValue(e.position, !1)),
      (this.normal = o.defaultValue(e.normal, !1)),
      (this.st = o.defaultValue(e.st, !1)),
      (this.bitangent = o.defaultValue(e.bitangent, !1)),
      (this.tangent = o.defaultValue(e.tangent, !1)),
      (this.color = o.defaultValue(e.color, !1))
  }
  ;(i.POSITION_ONLY = Object.freeze(new i({ position: !0 }))),
    (i.POSITION_AND_NORMAL = Object.freeze(
      new i({ position: !0, normal: !0 })
    )),
    (i.POSITION_NORMAL_AND_ST = Object.freeze(
      new i({ position: !0, normal: !0, st: !0 })
    )),
    (i.POSITION_AND_ST = Object.freeze(new i({ position: !0, st: !0 }))),
    (i.POSITION_AND_COLOR = Object.freeze(new i({ position: !0, color: !0 }))),
    (i.ALL = Object.freeze(
      new i({ position: !0, normal: !0, st: !0, tangent: !0, bitangent: !0 })
    )),
    (i.DEFAULT = i.POSITION_NORMAL_AND_ST),
    (i.packedLength = 6),
    (i.pack = function (e, t, n) {
      return (
        (n = o.defaultValue(n, 0)),
        (t[n++] = e.position ? 1 : 0),
        (t[n++] = e.normal ? 1 : 0),
        (t[n++] = e.st ? 1 : 0),
        (t[n++] = e.tangent ? 1 : 0),
        (t[n++] = e.bitangent ? 1 : 0),
        (t[n] = e.color ? 1 : 0),
        t
      )
    }),
    (i.unpack = function (e, t, n) {
      return (
        (t = o.defaultValue(t, 0)),
        o.defined(n) || (n = new i()),
        (n.position = 1 === e[t++]),
        (n.normal = 1 === e[t++]),
        (n.st = 1 === e[t++]),
        (n.tangent = 1 === e[t++]),
        (n.bitangent = 1 === e[t++]),
        (n.color = 1 === e[t]),
        n
      )
    }),
    (i.clone = function (e, t) {
      if (o.defined(e))
        return (
          o.defined(t) || (t = new i()),
          (t.position = e.position),
          (t.normal = e.normal),
          (t.st = e.st),
          (t.tangent = e.tangent),
          (t.bitangent = e.bitangent),
          (t.color = e.color),
          t
        )
    }),
    (e.VertexFormat = i)
})
