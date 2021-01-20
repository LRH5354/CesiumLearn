define([
  'exports',
  './when-54c2dc71',
  './Check-6c0211bc',
  './Math-fc8cecf5',
  './Cartesian2-bddc1162',
  './WebGLConstants-76bb35d1',
  './ComponentDatatype-6d99a1ee',
  './GeometryAttribute-700c1da0',
  './EllipsoidRhumbLine-c704bf4c',
], function (e, L, t, D, G, n, O, T, W) {
  'use strict'
  function r(e, t, n) {
    n = n || 2
    var r,
      a,
      i,
      u,
      x,
      o,
      s,
      p = t && t.length,
      h = p ? t[0] * n : e.length,
      f = v(e, 0, h, n, !0),
      l = []
    if (!f || f.next === f.prev) return l
    if (
      (p &&
        (f = (function (e, t, n, r) {
          var a,
            i,
            u,
            x,
            o = []
          for (a = 0, i = t.length; a < i; a++)
            (u = t[a] * r),
              (x = a < i - 1 ? t[a + 1] * r : e.length),
              (x = v(e, u, x, r, !1)) === x.next && (x.steiner = !0),
              o.push(
                (function (e) {
                  var t = e,
                    n = e
                  for (
                    ;
                    (t.x < n.x || (t.x === n.x && t.y < n.y)) && (n = t),
                      (t = t.next),
                      t !== e;

                  );
                  return n
                })(x)
              )
          for (o.sort(m), a = 0; a < o.length; a++)
            !(function (e, t) {
              ;(t = (function (e, t) {
                var n,
                  r = t,
                  a = e.x,
                  i = e.y,
                  u = -1 / 0
                do {
                  if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
                    var x =
                      r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y)
                    if (x <= a && u < x) {
                      if ((u = x) === a) {
                        if (i === r.y) return r
                        if (i === r.next.y) return r.next
                      }
                      n = r.x < r.next.x ? r : r.next
                    }
                  }
                } while (((r = r.next), r !== t))
                if (!n) return null
                if (a === u) return n
                var o,
                  s = n,
                  p = n.x,
                  h = n.y,
                  f = 1 / 0
                r = n
                for (
                  ;
                  a >= r.x &&
                    r.x >= p &&
                    a !== r.x &&
                    g(i < h ? a : u, i, p, h, i < h ? u : a, i, r.x, r.y) &&
                    ((o = Math.abs(i - r.y) / (a - r.x)),
                    w(r, e) &&
                      (o < f ||
                        (o === f &&
                          (r.x > n.x ||
                            (r.x === n.x &&
                              (function (e, t) {
                                return (
                                  b(e.prev, e, t.prev) < 0 &&
                                  b(t.next, e, e.next) < 0
                                )
                              })(n, r))))) &&
                      ((n = r), (f = o))),
                    (r = r.next),
                    r !== s;

                );
                return n
              })(e, t)) && c((e = E(t, e)), e.next)
            })(o[a], n),
              (n = c(n, n.next))
          return n
        })(e, t, f, n)),
      e.length > 80 * n)
    ) {
      ;(r = i = e[0]), (a = u = e[1])
      for (var y = n; y < h; y += n)
        (x = e[y]) < r && (r = x),
          (o = e[y + 1]) < a && (a = o),
          i < x && (i = x),
          u < o && (u = o)
      s = 0 !== (s = Math.max(i - r, u - a)) ? 1 / s : 0
    }
    return d(f, l, n, r, a, s), l
  }
  function v(e, t, n, r, a) {
    var i, u
    if (a === 0 < M(e, t, n, r))
      for (i = t; i < n; i += r) u = x(i, e[i], e[i + 1], u)
    else for (i = n - r; t <= i; i -= r) u = x(i, e[i], e[i + 1], u)
    return u && p(u, u.next) && (f(u), (u = u.next)), u
  }
  function c(e, t) {
    if (!e) return e
    t = t || e
    var n,
      r = e
    do {
      if (
        ((n = !1), r.steiner || (!p(r, r.next) && 0 !== b(r.prev, r, r.next)))
      )
        r = r.next
      else {
        if ((f(r), (r = t = r.prev) === r.next)) break
        n = !0
      }
    } while (n || r !== t)
    return t
  }
  function d(e, t, n, r, a, i, u) {
    if (e) {
      !u &&
        i &&
        (function (e, t, n, r) {
          for (
            var a = e;
            null === a.z && (a.z = C(a.x, a.y, t, n, r)),
              (a.prevZ = a.prev),
              (a.nextZ = a.next),
              (a = a.next),
              a !== e;

          );
          ;(a.prevZ.nextZ = null),
            (a.prevZ = null),
            (function (e) {
              var t,
                n,
                r,
                a,
                i,
                u,
                x,
                o,
                s = 1
              do {
                for (n = e, i = e = null, u = 0; n; ) {
                  for (
                    u++, r = n, t = x = 0;
                    t < s && (x++, (r = r.nextZ));
                    t++
                  );
                  for (o = s; 0 < x || (0 < o && r); )
                    0 !== x && (0 === o || !r || n.z <= r.z)
                      ? ((n = (a = n).nextZ), x--)
                      : ((r = (a = r).nextZ), o--),
                      i ? (i.nextZ = a) : (e = a),
                      (a.prevZ = i),
                      (i = a)
                  n = r
                }
              } while (((i.nextZ = null), (s *= 2), 1 < u))
            })(a)
        })(e, r, a, i)
      for (var x, o, s = e; e.prev !== e.next; )
        if (
          ((x = e.prev),
          (o = e.next),
          i
            ? (function (e, t, n, r) {
                var a = e.prev,
                  i = e,
                  u = e.next
                if (0 <= b(a, i, u)) return !1
                var x = (a.x < i.x ? (a.x < u.x ? a : u) : i.x < u.x ? i : u).x,
                  o = (a.y < i.y ? (a.y < u.y ? a : u) : i.y < u.y ? i : u).y,
                  s = (a.x > i.x ? (a.x > u.x ? a : u) : i.x > u.x ? i : u).x,
                  p = (a.y > i.y ? (a.y > u.y ? a : u) : i.y > u.y ? i : u).y,
                  h = C(x, o, t, n, r),
                  f = C(s, p, t, n, r),
                  l = e.prevZ,
                  y = e.nextZ
                for (; l && l.z >= h && y && y.z <= f; ) {
                  if (
                    l !== e.prev &&
                    l !== e.next &&
                    g(a.x, a.y, i.x, i.y, u.x, u.y, l.x, l.y) &&
                    0 <= b(l.prev, l, l.next)
                  )
                    return !1
                  if (
                    ((l = l.prevZ),
                    y !== e.prev &&
                      y !== e.next &&
                      g(a.x, a.y, i.x, i.y, u.x, u.y, y.x, y.y) &&
                      0 <= b(y.prev, y, y.next))
                  )
                    return !1
                  y = y.nextZ
                }
                for (; l && l.z >= h; ) {
                  if (
                    l !== e.prev &&
                    l !== e.next &&
                    g(a.x, a.y, i.x, i.y, u.x, u.y, l.x, l.y) &&
                    0 <= b(l.prev, l, l.next)
                  )
                    return !1
                  l = l.prevZ
                }
                for (; y && y.z <= f; ) {
                  if (
                    y !== e.prev &&
                    y !== e.next &&
                    g(a.x, a.y, i.x, i.y, u.x, u.y, y.x, y.y) &&
                    0 <= b(y.prev, y, y.next)
                  )
                    return !1
                  y = y.nextZ
                }
                return !0
              })(e, r, a, i)
            : (function (e) {
                var t = e.prev,
                  n = e,
                  r = e.next
                if (0 <= b(t, n, r)) return !1
                var a = e.next.next
                for (; a !== e.prev; ) {
                  if (
                    g(t.x, t.y, n.x, n.y, r.x, r.y, a.x, a.y) &&
                    0 <= b(a.prev, a, a.next)
                  )
                    return !1
                  a = a.next
                }
                return !0
              })(e))
        )
          t.push(x.i / n),
            t.push(e.i / n),
            t.push(o.i / n),
            f(e),
            (e = o.next),
            (s = o.next)
        else if ((e = o) === s) {
          u
            ? 1 === u
              ? d(
                  (e = (function (e, t, n) {
                    var r = e
                    do {
                      var a = r.prev,
                        i = r.next.next
                    } while (
                      (!p(a, i) &&
                        h(a, r, r.next, i) &&
                        w(a, i) &&
                        w(i, a) &&
                        (t.push(a.i / n),
                        t.push(r.i / n),
                        t.push(i.i / n),
                        f(r),
                        f(r.next),
                        (r = e = i)),
                      (r = r.next),
                      r !== e)
                    )
                    return c(r)
                  })(c(e), t, n)),
                  t,
                  n,
                  r,
                  a,
                  i,
                  2
                )
              : 2 === u &&
                (function (e, t, n, r, a, i) {
                  var u = e
                  do {
                    for (var x = u.next.next; x !== u.prev; ) {
                      if (
                        u.i !== x.i &&
                        (function (e, t) {
                          return (
                            e.next.i !== t.i &&
                            e.prev.i !== t.i &&
                            !(function (e, t) {
                              var n = e
                              do {
                                if (
                                  n.i !== e.i &&
                                  n.next.i !== e.i &&
                                  n.i !== t.i &&
                                  n.next.i !== t.i &&
                                  h(n, n.next, e, t)
                                )
                                  return !0
                              } while (((n = n.next), n !== e))
                              return !1
                            })(e, t) &&
                            ((w(e, t) &&
                              w(t, e) &&
                              (function (e, t) {
                                var n = e,
                                  r = !1,
                                  a = (e.x + t.x) / 2,
                                  i = (e.y + t.y) / 2
                                for (
                                  ;
                                  n.y > i != n.next.y > i &&
                                    n.next.y !== n.y &&
                                    a <
                                      ((n.next.x - n.x) * (i - n.y)) /
                                        (n.next.y - n.y) +
                                        n.x &&
                                    (r = !r),
                                    (n = n.next),
                                    n !== e;

                                );
                                return r
                              })(e, t) &&
                              (b(e.prev, e, t.prev) || b(e, t.prev, t))) ||
                              (p(e, t) &&
                                0 < b(e.prev, e, e.next) &&
                                0 < b(t.prev, t, t.next)))
                          )
                        })(u, x)
                      ) {
                        var o = E(u, x)
                        return (
                          (u = c(u, u.next)),
                          (o = c(o, o.next)),
                          d(u, t, n, r, a, i),
                          d(o, t, n, r, a, i)
                        )
                      }
                      x = x.next
                    }
                  } while ((u = u.next) !== e)
                })(e, t, n, r, a, i)
            : d(c(e), t, n, r, a, i, 1)
          break
        }
    }
  }
  function m(e, t) {
    return e.x - t.x
  }
  function C(e, t, n, r, a) {
    return (
      (e =
        1431655765 &
        ((e =
          858993459 &
          ((e =
            252645135 &
            ((e = 16711935 & ((e = 32767 * (e - n) * a) | (e << 8))) |
              (e << 4))) |
            (e << 2))) |
          (e << 1))) |
      ((t =
        1431655765 &
        ((t =
          858993459 &
          ((t =
            252645135 &
            ((t = 16711935 & ((t = 32767 * (t - r) * a) | (t << 8))) |
              (t << 4))) |
            (t << 2))) |
          (t << 1))) <<
        1)
    )
  }
  function g(e, t, n, r, a, i, u, x) {
    return (
      0 <= (a - u) * (t - x) - (e - u) * (i - x) &&
      0 <= (e - u) * (r - x) - (n - u) * (t - x) &&
      0 <= (n - u) * (i - x) - (a - u) * (r - x)
    )
  }
  function b(e, t, n) {
    return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y)
  }
  function p(e, t) {
    return e.x === t.x && e.y === t.y
  }
  function h(e, t, n, r) {
    var a = s(b(e, t, n)),
      i = s(b(e, t, r)),
      u = s(b(n, r, e)),
      x = s(b(n, r, t))
    return (
      (a !== i && u !== x) ||
      (0 === a && o(e, n, t)) ||
      (0 === i && o(e, r, t)) ||
      (0 === u && o(n, e, r)) ||
      !(0 !== x || !o(n, t, r))
    )
  }
  function o(e, t, n) {
    return (
      t.x <= Math.max(e.x, n.x) &&
      t.x >= Math.min(e.x, n.x) &&
      t.y <= Math.max(e.y, n.y) &&
      t.y >= Math.min(e.y, n.y)
    )
  }
  function s(e) {
    return 0 < e ? 1 : e < 0 ? -1 : 0
  }
  function w(e, t) {
    return b(e.prev, e, e.next) < 0
      ? 0 <= b(e, t, e.next) && 0 <= b(e, e.prev, t)
      : b(e, t, e.prev) < 0 || b(e, e.next, t) < 0
  }
  function E(e, t) {
    var n = new u(e.i, e.x, e.y),
      r = new u(t.i, t.x, t.y),
      a = e.next,
      i = t.prev
    return (
      ((e.next = t).prev = e),
      ((n.next = a).prev = n),
      ((r.next = n).prev = r),
      ((i.next = r).prev = i),
      r
    )
  }
  function x(e, t, n, r) {
    n = new u(e, t, n)
    return (
      r
        ? ((n.next = r.next), ((n.prev = r).next.prev = n), (r.next = n))
        : ((n.prev = n).next = n),
      n
    )
  }
  function f(e) {
    ;(e.next.prev = e.prev),
      (e.prev.next = e.next),
      e.prevZ && (e.prevZ.nextZ = e.nextZ),
      e.nextZ && (e.nextZ.prevZ = e.prevZ)
  }
  function u(e, t, n) {
    ;(this.i = e),
      (this.x = t),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = null),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1)
  }
  function M(e, t, n, r) {
    for (var a = 0, i = t, u = n - r; i < n; i += r)
      (a += (e[u] - e[i]) * (e[i + 1] + e[u + 1])), (u = i)
    return a
  }
  ;(r.deviation = function (e, t, n, r) {
    var a = t && t.length,
      i = a ? t[0] * n : e.length,
      u = Math.abs(M(e, 0, i, n))
    if (a)
      for (var x = 0, o = t.length; x < o; x++) {
        var s = t[x] * n,
          p = x < o - 1 ? t[x + 1] * n : e.length
        u -= Math.abs(M(e, s, p, n))
      }
    for (var h = 0, x = 0; x < r.length; x += 3) {
      var f = r[x] * n,
        l = r[x + 1] * n,
        y = r[x + 2] * n
      h += Math.abs(
        (e[f] - e[y]) * (e[1 + l] - e[1 + f]) -
          (e[f] - e[l]) * (e[1 + y] - e[1 + f])
      )
    }
    return 0 === u && 0 === h ? 0 : Math.abs((h - u) / u)
  }),
    (r.flatten = function (e) {
      for (
        var t = e[0][0].length,
          n = { vertices: [], holes: [], dimensions: t },
          r = 0,
          a = 0;
        a < e.length;
        a++
      ) {
        for (var i = 0; i < e[a].length; i++)
          for (var u = 0; u < t; u++) n.vertices.push(e[a][i][u])
        0 < a && ((r += e[a - 1].length), n.holes.push(r))
      }
      return n
    })
  var a = {
      CLOCKWISE: n.WebGLConstants.CW,
      COUNTER_CLOCKWISE: n.WebGLConstants.CCW,
      validate: function (e) {
        return e === a.CLOCKWISE || e === a.COUNTER_CLOCKWISE
      },
    },
    i = Object.freeze(a),
    l = new G.Cartesian3(),
    y = new G.Cartesian3(),
    Z = {
      computeArea2D: function (e) {
        for (var t = e.length, n = 0, r = t - 1, a = 0; a < t; r = a++) {
          var i = e[r],
            u = e[a]
          n += i.x * u.y - u.x * i.y
        }
        return 0.5 * n
      },
      computeWindingOrder2D: function (e) {
        return 0 < Z.computeArea2D(e) ? i.COUNTER_CLOCKWISE : i.CLOCKWISE
      },
      triangulate: function (e, t) {
        return r(G.Cartesian2.packArray(e), t, 2)
      },
    },
    P = new G.Cartesian3(),
    I = new G.Cartesian3(),
    B = new G.Cartesian3(),
    S = new G.Cartesian3(),
    A = new G.Cartesian3(),
    z = new G.Cartesian3(),
    N = new G.Cartesian3()
  Z.computeSubdivision = function (e, t, n, r) {
    r = L.defaultValue(r, D.CesiumMath.RADIANS_PER_DEGREE)
    for (
      var a = n.slice(0), i = t.length, u = new Array(3 * i), x = 0, o = 0;
      o < i;
      o++
    ) {
      var s = t[o]
      ;(u[x++] = s.x), (u[x++] = s.y), (u[x++] = s.z)
    }
    for (
      var p = [],
        h = {},
        f = e.maximumRadius,
        r = D.CesiumMath.chordLength(r, f),
        l = r * r;
      0 < a.length;

    ) {
      var y,
        v,
        c = a.pop(),
        d = a.pop(),
        m = a.pop(),
        C = G.Cartesian3.fromArray(u, 3 * m, P),
        g = G.Cartesian3.fromArray(u, 3 * d, I),
        b = G.Cartesian3.fromArray(u, 3 * c, B),
        w = G.Cartesian3.multiplyByScalar(G.Cartesian3.normalize(C, S), f, S),
        E = G.Cartesian3.multiplyByScalar(G.Cartesian3.normalize(g, A), f, A),
        M = G.Cartesian3.multiplyByScalar(G.Cartesian3.normalize(b, z), f, z),
        Z = G.Cartesian3.magnitudeSquared(G.Cartesian3.subtract(w, E, N)),
        E = G.Cartesian3.magnitudeSquared(G.Cartesian3.subtract(E, M, N)),
        M = G.Cartesian3.magnitudeSquared(G.Cartesian3.subtract(M, w, N)),
        w = Math.max(Z, E, M)
      l < w
        ? Z === w
          ? ((o = h[(y = Math.min(m, d) + ' ' + Math.max(m, d))]),
            L.defined(o) ||
              ((v = G.Cartesian3.add(C, g, N)),
              G.Cartesian3.multiplyByScalar(v, 0.5, v),
              u.push(v.x, v.y, v.z),
              (o = u.length / 3 - 1),
              (h[y] = o)),
            a.push(m, o, c),
            a.push(o, d, c))
          : E === w
          ? ((o = h[(y = Math.min(d, c) + ' ' + Math.max(d, c))]),
            L.defined(o) ||
              ((v = G.Cartesian3.add(g, b, N)),
              G.Cartesian3.multiplyByScalar(v, 0.5, v),
              u.push(v.x, v.y, v.z),
              (o = u.length / 3 - 1),
              (h[y] = o)),
            a.push(d, o, m),
            a.push(o, c, m))
          : M === w &&
            ((o = h[(y = Math.min(c, m) + ' ' + Math.max(c, m))]),
            L.defined(o) ||
              ((v = G.Cartesian3.add(b, C, N)),
              G.Cartesian3.multiplyByScalar(v, 0.5, v),
              u.push(v.x, v.y, v.z),
              (o = u.length / 3 - 1),
              (h[y] = o)),
            a.push(c, o, d),
            a.push(o, m, d))
        : (p.push(m), p.push(d), p.push(c))
    }
    return new T.Geometry({
      attributes: {
        position: new T.GeometryAttribute({
          componentDatatype: O.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: u,
        }),
      },
      indices: p,
      primitiveType: T.PrimitiveType.TRIANGLES,
    })
  }
  var U = new G.Cartographic(),
    _ = new G.Cartographic(),
    K = new G.Cartographic(),
    V = new G.Cartographic()
  ;(Z.computeRhumbLineSubdivision = function (e, t, n, r) {
    r = L.defaultValue(r, D.CesiumMath.RADIANS_PER_DEGREE)
    for (
      var a = n.slice(0), i = t.length, u = new Array(3 * i), x = 0, o = 0;
      o < i;
      o++
    ) {
      var s = t[o]
      ;(u[x++] = s.x), (u[x++] = s.y), (u[x++] = s.z)
    }
    for (
      var p = [],
        h = {},
        n = e.maximumRadius,
        f = D.CesiumMath.chordLength(r, n),
        l = new W.EllipsoidRhumbLine(void 0, void 0, e),
        y = new W.EllipsoidRhumbLine(void 0, void 0, e),
        v = new W.EllipsoidRhumbLine(void 0, void 0, e);
      0 < a.length;

    ) {
      var c = a.pop(),
        d = a.pop(),
        m = a.pop(),
        C = G.Cartesian3.fromArray(u, 3 * m, P),
        g = G.Cartesian3.fromArray(u, 3 * d, I),
        b = G.Cartesian3.fromArray(u, 3 * c, B),
        w = e.cartesianToCartographic(C, U),
        E = e.cartesianToCartographic(g, _),
        M = e.cartesianToCartographic(b, K)
      l.setEndPoints(w, E)
      var Z = l.surfaceDistance
      y.setEndPoints(E, M)
      C = y.surfaceDistance
      v.setEndPoints(M, w)
      var S,
        A,
        z,
        R,
        g = v.surfaceDistance,
        b = Math.max(Z, C, g)
      f < b
        ? Z === b
          ? ((o = h[(S = Math.min(m, d) + ' ' + Math.max(m, d))]),
            L.defined(o) ||
              ((A = l.interpolateUsingFraction(0.5, V)),
              (z = 0.5 * (w.height + E.height)),
              (R = G.Cartesian3.fromRadians(A.longitude, A.latitude, z, e, N)),
              u.push(R.x, R.y, R.z),
              (o = u.length / 3 - 1),
              (h[S] = o)),
            a.push(m, o, c),
            a.push(o, d, c))
          : C === b
          ? ((o = h[(S = Math.min(d, c) + ' ' + Math.max(d, c))]),
            L.defined(o) ||
              ((A = y.interpolateUsingFraction(0.5, V)),
              (z = 0.5 * (E.height + M.height)),
              (R = G.Cartesian3.fromRadians(A.longitude, A.latitude, z, e, N)),
              u.push(R.x, R.y, R.z),
              (o = u.length / 3 - 1),
              (h[S] = o)),
            a.push(d, o, m),
            a.push(o, c, m))
          : g === b &&
            ((o = h[(S = Math.min(c, m) + ' ' + Math.max(c, m))]),
            L.defined(o) ||
              ((A = v.interpolateUsingFraction(0.5, V)),
              (z = 0.5 * (M.height + w.height)),
              (R = G.Cartesian3.fromRadians(A.longitude, A.latitude, z, e, N)),
              u.push(R.x, R.y, R.z),
              (o = u.length / 3 - 1),
              (h[S] = o)),
            a.push(c, o, d),
            a.push(o, m, d))
        : (p.push(m), p.push(d), p.push(c))
    }
    return new T.Geometry({
      attributes: {
        position: new T.GeometryAttribute({
          componentDatatype: O.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: u,
        }),
      },
      indices: p,
      primitiveType: T.PrimitiveType.TRIANGLES,
    })
  }),
    (Z.scaleToGeodeticHeight = function (e, t, n, r) {
      n = L.defaultValue(n, G.Ellipsoid.WGS84)
      var a = l,
        i = y
      if (
        ((t = L.defaultValue(t, 0)), (r = L.defaultValue(r, !0)), L.defined(e))
      )
        for (var u = e.length, x = 0; x < u; x += 3)
          G.Cartesian3.fromArray(e, x, i),
            r && (i = n.scaleToGeodeticSurface(i, i)),
            0 !== t &&
              ((a = n.geodeticSurfaceNormal(i, a)),
              G.Cartesian3.multiplyByScalar(a, t, a),
              G.Cartesian3.add(i, a, i)),
            (e[x] = i.x),
            (e[x + 1] = i.y),
            (e[x + 2] = i.z)
      return e
    }),
    (e.PolygonPipeline = Z),
    (e.WindingOrder = i)
})
