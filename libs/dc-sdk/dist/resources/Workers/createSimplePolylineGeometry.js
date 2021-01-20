define([
  './when-54c2dc71',
  './Check-6c0211bc',
  './Math-fc8cecf5',
  './Cartesian2-bddc1162',
  './Transforms-6f81ad4c',
  './RuntimeError-2109023a',
  './WebGLConstants-76bb35d1',
  './ComponentDatatype-6d99a1ee',
  './GeometryAttribute-700c1da0',
  './GeometryAttributes-4fcfcf40',
  './IndexDatatype-53503fee',
  './IntersectionTests-7f3bcd5c',
  './Plane-b6058d9b',
  './ArcType-dc1c5aee',
  './EllipsoidRhumbLine-c704bf4c',
  './EllipsoidGeodesic-30fae80b',
  './PolylinePipeline-7685bebd',
  './Color-6328388f',
], function (L, e, V, x, S, o, t, I, R, O, M, r, a, U, l, i, N, F) {
  'use strict'
  function d(e) {
    var o = (e = L.defaultValue(e, L.defaultValue.EMPTY_OBJECT)).positions,
      t = e.colors,
      r = L.defaultValue(e.colorsPerVertex, !1)
    ;(this._positions = o),
      (this._colors = t),
      (this._colorsPerVertex = r),
      (this._arcType = L.defaultValue(e.arcType, U.ArcType.GEODESIC)),
      (this._granularity = L.defaultValue(
        e.granularity,
        V.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._ellipsoid = L.defaultValue(e.ellipsoid, x.Ellipsoid.WGS84)),
      (this._workerName = 'createSimplePolylineGeometry')
    o = 1 + o.length * x.Cartesian3.packedLength
    ;(o += L.defined(t) ? 1 + t.length * F.Color.packedLength : 1),
      (this.packedLength = o + x.Ellipsoid.packedLength + 3)
  }
  ;(d.pack = function (e, o, t) {
    var r
    t = L.defaultValue(t, 0)
    var a = e._positions,
      l = a.length
    for (o[t++] = l, r = 0; r < l; ++r, t += x.Cartesian3.packedLength)
      x.Cartesian3.pack(a[r], o, t)
    var i = e._colors,
      l = L.defined(i) ? i.length : 0
    for (o[t++] = l, r = 0; r < l; ++r, t += F.Color.packedLength)
      F.Color.pack(i[r], o, t)
    return (
      x.Ellipsoid.pack(e._ellipsoid, o, t),
      (t += x.Ellipsoid.packedLength),
      (o[t++] = e._colorsPerVertex ? 1 : 0),
      (o[t++] = e._arcType),
      (o[t] = e._granularity),
      o
    )
  }),
    (d.unpack = function (e, o, t) {
      o = L.defaultValue(o, 0)
      for (
        var r = e[o++], a = new Array(r), l = 0;
        l < r;
        ++l, o += x.Cartesian3.packedLength
      )
        a[l] = x.Cartesian3.unpack(e, o)
      var i = 0 < (r = e[o++]) ? new Array(r) : void 0
      for (l = 0; l < r; ++l, o += F.Color.packedLength)
        i[l] = F.Color.unpack(e, o)
      var n = x.Ellipsoid.unpack(e, o)
      o += x.Ellipsoid.packedLength
      var s = 1 === e[o++],
        p = e[o++],
        c = e[o]
      return L.defined(t)
        ? ((t._positions = a),
          (t._colors = i),
          (t._ellipsoid = n),
          (t._colorsPerVertex = s),
          (t._arcType = p),
          (t._granularity = c),
          t)
        : new d({
            positions: a,
            colors: i,
            ellipsoid: n,
            colorsPerVertex: s,
            arcType: p,
            granularity: c,
          })
    })
  var H = new Array(2),
    W = new Array(2),
    Y = {
      positions: H,
      height: W,
      ellipsoid: void 0,
      minDistance: void 0,
      granularity: void 0,
    }
  return (
    (d.createGeometry = function (e) {
      var o,
        t,
        r,
        a = e._positions,
        l = e._colors,
        i = e._colorsPerVertex,
        n = e._arcType,
        s = e._granularity,
        e = e._ellipsoid,
        p = V.CesiumMath.chordLength(s, e.maximumRadius),
        c = L.defined(l) && !i,
        d = a.length,
        f = 0
      if (n === U.ArcType.GEODESIC || n === U.ArcType.RHUMB) {
        var y,
          u,
          h =
            n === U.ArcType.GEODESIC
              ? ((y = V.CesiumMath.chordLength(s, e.maximumRadius)),
                (u = N.PolylinePipeline.numberOfPoints),
                N.PolylinePipeline.generateArc)
              : ((y = s),
                (u = N.PolylinePipeline.numberOfPointsRhumbLine),
                N.PolylinePipeline.generateRhumbArc),
          C = N.PolylinePipeline.extractHeights(a, e),
          T = Y
        if (
          (n === U.ArcType.GEODESIC ? (T.minDistance = p) : (T.granularity = s),
          (T.ellipsoid = e),
          c)
        ) {
          for (var g = 0, m = 0; m < d - 1; m++) g += u(a[m], a[m + 1], y) + 1
          ;(o = new Float64Array(3 * g)),
            (r = new Uint8Array(4 * g)),
            (T.positions = H),
            (T.height = W)
          var b = 0
          for (m = 0; m < d - 1; ++m) {
            ;(H[0] = a[m]), (H[1] = a[m + 1]), (W[0] = C[m]), (W[1] = C[m + 1])
            var P = h(T)
            if (L.defined(l))
              for (var _ = P.length / 3, v = l[m], B = 0; B < _; ++B)
                (r[b++] = F.Color.floatToByte(v.red)),
                  (r[b++] = F.Color.floatToByte(v.green)),
                  (r[b++] = F.Color.floatToByte(v.blue)),
                  (r[b++] = F.Color.floatToByte(v.alpha))
            o.set(P, f), (f += P.length)
          }
        } else if (
          ((T.positions = a),
          (T.height = C),
          (o = new Float64Array(h(T))),
          L.defined(l))
        ) {
          for (r = new Uint8Array((o.length / 3) * 4), m = 0; m < d - 1; ++m)
            f = (function (e, o, t, r, a, l, i) {
              var n = N.PolylinePipeline.numberOfPoints(e, o, a),
                s = t.red,
                p = t.green,
                c = t.blue,
                d = t.alpha,
                f = r.red,
                e = r.green,
                o = r.blue,
                a = r.alpha
              if (F.Color.equals(t, r)) {
                for (g = 0; g < n; g++)
                  (l[i++] = F.Color.floatToByte(s)),
                    (l[i++] = F.Color.floatToByte(p)),
                    (l[i++] = F.Color.floatToByte(c)),
                    (l[i++] = F.Color.floatToByte(d))
                return i
              }
              for (
                var y = (f - s) / n,
                  u = (e - p) / n,
                  h = (o - c) / n,
                  C = (a - d) / n,
                  T = i,
                  g = 0;
                g < n;
                g++
              )
                (l[T++] = F.Color.floatToByte(s + g * y)),
                  (l[T++] = F.Color.floatToByte(p + g * u)),
                  (l[T++] = F.Color.floatToByte(c + g * h)),
                  (l[T++] = F.Color.floatToByte(d + g * C))
              return T
            })(a[m], a[m + 1], l[m], l[m + 1], p, r, f)
          var A = l[d - 1]
          ;(r[f++] = F.Color.floatToByte(A.red)),
            (r[f++] = F.Color.floatToByte(A.green)),
            (r[f++] = F.Color.floatToByte(A.blue)),
            (r[f++] = F.Color.floatToByte(A.alpha))
        }
      } else {
        ;(t = c ? 2 * d - 2 : d),
          (o = new Float64Array(3 * t)),
          (r = L.defined(l) ? new Uint8Array(4 * t) : void 0)
        var E = 0,
          k = 0
        for (m = 0; m < d; ++m) {
          var G = a[m]
          if (
            (c &&
              0 < m &&
              (x.Cartesian3.pack(G, o, E),
              (E += 3),
              (v = l[m - 1]),
              (r[k++] = F.Color.floatToByte(v.red)),
              (r[k++] = F.Color.floatToByte(v.green)),
              (r[k++] = F.Color.floatToByte(v.blue)),
              (r[k++] = F.Color.floatToByte(v.alpha))),
            c && m === d - 1)
          )
            break
          x.Cartesian3.pack(G, o, E),
            (E += 3),
            L.defined(l) &&
              ((v = l[m]),
              (r[k++] = F.Color.floatToByte(v.red)),
              (r[k++] = F.Color.floatToByte(v.green)),
              (r[k++] = F.Color.floatToByte(v.blue)),
              (r[k++] = F.Color.floatToByte(v.alpha)))
        }
      }
      e = new O.GeometryAttributes()
      ;(e.position = new R.GeometryAttribute({
        componentDatatype: I.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: o,
      })),
        L.defined(l) &&
          (e.color = new R.GeometryAttribute({
            componentDatatype: I.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: r,
            normalize: !0,
          }))
      var A = 2 * ((t = o.length / 3) - 1),
        w = M.IndexDatatype.createTypedArray(t, A),
        D = 0
      for (m = 0; m < t - 1; ++m) (w[D++] = m), (w[D++] = m + 1)
      return new R.Geometry({
        attributes: e,
        indices: w,
        primitiveType: R.PrimitiveType.LINES,
        boundingSphere: S.BoundingSphere.fromPoints(a),
      })
    }),
    function (e, o) {
      return (
        L.defined(o) && (e = d.unpack(e, o)),
        (e._ellipsoid = x.Ellipsoid.clone(e._ellipsoid)),
        d.createGeometry(e)
      )
    }
  )
})
