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
  './GeometryOffsetAttribute-7350d9af',
  './VertexFormat-7572c785',
  './arrayRemoveDuplicates-ebc732b0',
  './EllipsoidTangentPlane-c3f203b0',
  './EllipsoidRhumbLine-c704bf4c',
  './PolygonPipeline-1aceedbc',
  './PolylineVolumeGeometryLibrary-0216ec14',
  './EllipsoidGeodesic-30fae80b',
  './PolylinePipeline-7685bebd',
  './CorridorGeometryLibrary-69ffa0db',
], function (
  rt,
  t,
  at,
  it,
  m,
  e,
  r,
  ot,
  nt,
  st,
  lt,
  a,
  i,
  E,
  V,
  y,
  o,
  n,
  F,
  f,
  s,
  l,
  dt
) {
  'use strict'
  var ut = new it.Cartesian3(),
    mt = new it.Cartesian3(),
    yt = new it.Cartesian3(),
    ft = new it.Cartesian3(),
    L = new it.Cartesian3(),
    ct = new it.Cartesian3(),
    pt = new it.Cartesian3(),
    ht = new it.Cartesian3()
  function c(t, e) {
    for (var r = 0; r < t.length; r++)
      t[r] = e.scaleToGeodeticSurface(t[r], t[r])
    return t
  }
  function gt(t, e, r, a, i, o) {
    var n = t.normals,
      s = t.tangents,
      l = t.bitangents,
      t = it.Cartesian3.normalize(it.Cartesian3.cross(r, e, pt), pt)
    o.normal && dt.CorridorGeometryLibrary.addAttribute(n, e, a, i),
      o.tangent && dt.CorridorGeometryLibrary.addAttribute(s, t, a, i),
      o.bitangent && dt.CorridorGeometryLibrary.addAttribute(l, r, a, i)
  }
  function P(t, e, r) {
    var a,
      i = t.positions,
      o = t.corners,
      n = t.endPositions,
      s = t.lefts,
      l = t.normals,
      d = new st.GeometryAttributes(),
      u = 0,
      m = 0,
      y = 0
    for (N = 0; N < i.length; N += 2)
      (u += a = i[N].length - 3), (y += 2 * a), (m += i[N + 1].length - 3)
    for (u += 3, m += 3, N = 0; N < o.length; N++) {
      H = o[N]
      var f = o[N].leftPositions
      rt.defined(f)
        ? (u += a = f.length)
        : (m += a = o[N].rightPositions.length),
        (y += a)
    }
    var c,
      p = rt.defined(n)
    p && ((u += c = n[0].length - 3), (m += c), (y += 6 * (c /= 3)))
    var h,
      g,
      b,
      C,
      v,
      A,
      t = u + m,
      _ = new Float64Array(t),
      w = {
        normals: e.normal ? new Float32Array(t) : void 0,
        tangents: e.tangent ? new Float32Array(t) : void 0,
        bitangents: e.bitangent ? new Float32Array(t) : void 0,
      },
      T = 0,
      G = t - 1,
      E = ut,
      V = mt,
      F = c / 2,
      L = lt.IndexDatatype.createTypedArray(t / 3, y),
      P = 0
    if (p) {
      ;(A = yt), (v = ft)
      for (
        var x = n[0],
          E = it.Cartesian3.fromArray(l, 0, E),
          V = it.Cartesian3.fromArray(s, 0, V),
          N = 0;
        N < F;
        N++
      )
        (A = it.Cartesian3.fromArray(x, 3 * (F - 1 - N), A)),
          (v = it.Cartesian3.fromArray(x, 3 * (F + N), v)),
          dt.CorridorGeometryLibrary.addAttribute(_, v, T),
          dt.CorridorGeometryLibrary.addAttribute(_, A, void 0, G),
          gt(w, E, V, T, G, e),
          (C = (g = T / 3) + 1),
          (b = (h = (G - 2) / 3) - 1),
          (L[P++] = h),
          (L[P++] = g),
          (L[P++] = b),
          (L[P++] = b),
          (L[P++] = g),
          (L[P++] = C),
          (T += 3),
          (G -= 3)
    }
    var D,
      M,
      O = 0,
      I = 0,
      S = i[O++],
      R = i[O++]
    for (
      _.set(S, T),
        _.set(R, G - R.length + 1),
        V = it.Cartesian3.fromArray(s, I, V),
        a = R.length - 3,
        N = 0;
      N < a;
      N += 3
    )
      (D = r.geodeticSurfaceNormal(it.Cartesian3.fromArray(S, N, pt), pt)),
        (M = r.geodeticSurfaceNormal(
          it.Cartesian3.fromArray(R, a - N, ht),
          ht
        )),
        gt(
          w,
          (E = it.Cartesian3.normalize(it.Cartesian3.add(D, M, E), E)),
          V,
          T,
          G,
          e
        ),
        (C = (g = T / 3) + 1),
        (b = (h = (G - 2) / 3) - 1),
        (L[P++] = h),
        (L[P++] = g),
        (L[P++] = b),
        (L[P++] = b),
        (L[P++] = g),
        (L[P++] = C),
        (T += 3),
        (G -= 3)
    for (
      D = r.geodeticSurfaceNormal(it.Cartesian3.fromArray(S, a, pt), pt),
        M = r.geodeticSurfaceNormal(it.Cartesian3.fromArray(R, a, ht), ht),
        E = it.Cartesian3.normalize(it.Cartesian3.add(D, M, E), E),
        I += 3,
        N = 0;
      N < o.length;
      N++
    ) {
      var k,
        H,
        z,
        U,
        B = (H = o[N]).leftPositions,
        Y = H.rightPositions,
        W = ct,
        q = yt,
        J = ft
      if (((E = it.Cartesian3.fromArray(l, I, E)), rt.defined(B))) {
        for (
          gt(w, E, V, void 0, G, e), G -= 3, z = C, U = b, k = 0;
          k < B.length / 3;
          k++
        )
          (W = it.Cartesian3.fromArray(B, 3 * k, W)),
            (L[P++] = z),
            (L[P++] = U - k - 1),
            (L[P++] = U - k),
            dt.CorridorGeometryLibrary.addAttribute(_, W, void 0, G),
            (q = it.Cartesian3.fromArray(_, 3 * (U - k - 1), q)),
            (J = it.Cartesian3.fromArray(_, 3 * z, J)),
            gt(
              w,
              E,
              (V = it.Cartesian3.normalize(it.Cartesian3.subtract(q, J, V), V)),
              void 0,
              G,
              e
            ),
            (G -= 3)
        ;(W = it.Cartesian3.fromArray(_, 3 * z, W)),
          (q = it.Cartesian3.subtract(
            it.Cartesian3.fromArray(_, 3 * U, q),
            W,
            q
          )),
          (J = it.Cartesian3.subtract(
            it.Cartesian3.fromArray(_, 3 * (U - k), J),
            W,
            J
          )),
          gt(
            w,
            E,
            (V = it.Cartesian3.normalize(it.Cartesian3.add(q, J, V), V)),
            T,
            void 0,
            e
          ),
          (T += 3)
      } else {
        for (
          gt(w, E, V, T, void 0, e), T += 3, z = b, U = C, k = 0;
          k < Y.length / 3;
          k++
        )
          (W = it.Cartesian3.fromArray(Y, 3 * k, W)),
            (L[P++] = z),
            (L[P++] = U + k),
            (L[P++] = U + k + 1),
            dt.CorridorGeometryLibrary.addAttribute(_, W, T),
            (q = it.Cartesian3.fromArray(_, 3 * z, q)),
            (J = it.Cartesian3.fromArray(_, 3 * (U + k), J)),
            gt(
              w,
              E,
              (V = it.Cartesian3.normalize(it.Cartesian3.subtract(q, J, V), V)),
              T,
              void 0,
              e
            ),
            (T += 3)
        ;(W = it.Cartesian3.fromArray(_, 3 * z, W)),
          (q = it.Cartesian3.subtract(
            it.Cartesian3.fromArray(_, 3 * (U + k), q),
            W,
            q
          )),
          (J = it.Cartesian3.subtract(
            it.Cartesian3.fromArray(_, 3 * U, J),
            W,
            J
          )),
          gt(
            w,
            E,
            (V = it.Cartesian3.normalize(
              it.Cartesian3.negate(it.Cartesian3.add(J, q, V), V),
              V
            )),
            void 0,
            G,
            e
          ),
          (G -= 3)
      }
      for (
        S = i[O++],
          R = i[O++],
          S.splice(0, 3),
          R.splice(R.length - 3, 3),
          _.set(S, T),
          _.set(R, G - R.length + 1),
          a = R.length - 3,
          I += 3,
          V = it.Cartesian3.fromArray(s, I, V),
          k = 0;
        k < R.length;
        k += 3
      )
        (D = r.geodeticSurfaceNormal(it.Cartesian3.fromArray(S, k, pt), pt)),
          (M = r.geodeticSurfaceNormal(
            it.Cartesian3.fromArray(R, a - k, ht),
            ht
          )),
          gt(
            w,
            (E = it.Cartesian3.normalize(it.Cartesian3.add(D, M, E), E)),
            V,
            T,
            G,
            e
          ),
          (g = (C = T / 3) - 1),
          (h = (b = (G - 2) / 3) + 1),
          (L[P++] = h),
          (L[P++] = g),
          (L[P++] = b),
          (L[P++] = b),
          (L[P++] = g),
          (L[P++] = C),
          (T += 3),
          (G -= 3)
      ;(T -= 3), (G += 3)
    }
    if (
      (gt(w, (E = it.Cartesian3.fromArray(l, l.length - 3, E)), V, T, G, e), p)
    ) {
      ;(T += 3), (G -= 3), (A = yt), (v = ft)
      var j = n[1]
      for (N = 0; N < F; N++)
        (A = it.Cartesian3.fromArray(j, 3 * (c - N - 1), A)),
          (v = it.Cartesian3.fromArray(j, 3 * N, v)),
          dt.CorridorGeometryLibrary.addAttribute(_, A, void 0, G),
          dt.CorridorGeometryLibrary.addAttribute(_, v, T),
          gt(w, E, V, T, G, e),
          (g = (C = T / 3) - 1),
          (h = (b = (G - 2) / 3) + 1),
          (L[P++] = h),
          (L[P++] = g),
          (L[P++] = b),
          (L[P++] = b),
          (L[P++] = g),
          (L[P++] = C),
          (T += 3),
          (G -= 3)
    }
    if (
      ((d.position = new nt.GeometryAttribute({
        componentDatatype: ot.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: _,
      })),
      e.st)
    ) {
      var K = new Float32Array((t / 3) * 2),
        Q = 0
      if (p) {
        ;(u /= 3), (m /= 3)
        var X,
          Z = Math.PI / (c + 1),
          $ = 1 / (u - c + 1),
          tt = 1 / (m - c + 1),
          et = c / 2
        for (N = 1 + et; N < c + 1; N++)
          (X = at.CesiumMath.PI_OVER_TWO + Z * N),
            (K[Q++] = tt * (1 + Math.cos(X))),
            (K[Q++] = 0.5 * (1 + Math.sin(X)))
        for (N = 1; N < m - c + 1; N++) (K[Q++] = N * tt), (K[Q++] = 0)
        for (N = c; et < N; N--)
          (X = at.CesiumMath.PI_OVER_TWO - N * Z),
            (K[Q++] = 1 - tt * (1 + Math.cos(X))),
            (K[Q++] = 0.5 * (1 + Math.sin(X)))
        for (N = et; 0 < N; N--)
          (X = at.CesiumMath.PI_OVER_TWO - Z * N),
            (K[Q++] = 1 - $ * (1 + Math.cos(X))),
            (K[Q++] = 0.5 * (1 + Math.sin(X)))
        for (N = u - c; 0 < N; N--) (K[Q++] = N * $), (K[Q++] = 1)
        for (N = 1; N < 1 + et; N++)
          (X = at.CesiumMath.PI_OVER_TWO + Z * N),
            (K[Q++] = $ * (1 + Math.cos(X))),
            (K[Q++] = 0.5 * (1 + Math.sin(X)))
      } else {
        for ($ = 1 / ((u /= 3) - 1), tt = 1 / ((m /= 3) - 1), N = 0; N < m; N++)
          (K[Q++] = N * tt), (K[Q++] = 0)
        for (N = u; 0 < N; N--) (K[Q++] = (N - 1) * $), (K[Q++] = 1)
      }
      d.st = new nt.GeometryAttribute({
        componentDatatype: ot.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: K,
      })
    }
    return (
      e.normal &&
        (d.normal = new nt.GeometryAttribute({
          componentDatatype: ot.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: w.normals,
        })),
      e.tangent &&
        (d.tangent = new nt.GeometryAttribute({
          componentDatatype: ot.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: w.tangents,
        })),
      e.bitangent &&
        (d.bitangent = new nt.GeometryAttribute({
          componentDatatype: ot.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: w.bitangents,
        })),
      { attributes: d, indices: L }
    )
  }
  function x(t, e, r) {
    ;(r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2])
    for (var a = 3; a < t.length; a += 3) {
      var i = t[a],
        o = t[a + 1],
        n = t[a + 2]
      ;(r[e++] = i),
        (r[e++] = o),
        (r[e++] = n),
        (r[e++] = i),
        (r[e++] = o),
        (r[e++] = n)
    }
    return (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]), r
  }
  function p(t, e) {
    var r = new V.VertexFormat({
        position: e.position,
        normal: e.normal || e.bitangent || t.shadowVolume,
        tangent: e.tangent,
        bitangent: e.normal || e.bitangent,
        st: e.st,
      }),
      a = t.ellipsoid,
      i = P(dt.CorridorGeometryLibrary.computePositions(t), r, a),
      o = t.height,
      n = t.extrudedHeight,
      s = i.attributes,
      l = i.indices,
      d = s.position.values,
      u = d.length,
      m = new Float64Array(6 * u),
      r = new Float64Array(u)
    r.set(d)
    ;(i = new Float64Array(4 * u)),
      (i = x((d = F.PolygonPipeline.scaleToGeodeticHeight(d, o, a)), 0, i))
    ;(i = x((r = F.PolygonPipeline.scaleToGeodeticHeight(r, n, a)), 2 * u, i)),
      m.set(d),
      m.set(r, u),
      m.set(i, 2 * u),
      (s.position.values = m),
      (s = (function (t, e) {
        if (!(e.normal || e.tangent || e.bitangent || e.st)) return t
        var r,
          a = t.position.values
        ;(e.normal || e.bitangent) &&
          ((r = t.normal.values), (l = t.bitangent.values))
        var i = t.position.values.length / 18,
          o = 3 * i,
          n = 2 * i,
          s = 2 * o
        if (e.normal || e.bitangent || e.tangent) {
          for (
            var l,
              d = e.normal ? new Float32Array(6 * o) : void 0,
              u = e.tangent ? new Float32Array(6 * o) : void 0,
              m = e.bitangent ? new Float32Array(6 * o) : void 0,
              y = ut,
              f = mt,
              c = yt,
              p = ft,
              h = L,
              g = ct,
              b = s,
              C = 0;
            C < o;
            C += 3
          ) {
            var v = b + s,
              y = it.Cartesian3.fromArray(a, C, y),
              f = it.Cartesian3.fromArray(a, C + o, f),
              c = it.Cartesian3.fromArray(a, (C + 3) % o, c)
            ;(f = it.Cartesian3.subtract(f, y, f)),
              (c = it.Cartesian3.subtract(c, y, c)),
              (p = it.Cartesian3.normalize(it.Cartesian3.cross(f, c, p), p)),
              e.normal &&
                (dt.CorridorGeometryLibrary.addAttribute(d, p, v),
                dt.CorridorGeometryLibrary.addAttribute(d, p, v + 3),
                dt.CorridorGeometryLibrary.addAttribute(d, p, b),
                dt.CorridorGeometryLibrary.addAttribute(d, p, b + 3)),
              (e.tangent || e.bitangent) &&
                ((g = it.Cartesian3.fromArray(r, C, g)),
                e.bitangent &&
                  (dt.CorridorGeometryLibrary.addAttribute(m, g, v),
                  dt.CorridorGeometryLibrary.addAttribute(m, g, v + 3),
                  dt.CorridorGeometryLibrary.addAttribute(m, g, b),
                  dt.CorridorGeometryLibrary.addAttribute(m, g, b + 3)),
                e.tangent &&
                  ((h = it.Cartesian3.normalize(
                    it.Cartesian3.cross(g, p, h),
                    h
                  )),
                  dt.CorridorGeometryLibrary.addAttribute(u, h, v),
                  dt.CorridorGeometryLibrary.addAttribute(u, h, v + 3),
                  dt.CorridorGeometryLibrary.addAttribute(u, h, b),
                  dt.CorridorGeometryLibrary.addAttribute(u, h, b + 3))),
              (b += 6)
          }
          if (e.normal) {
            for (d.set(r), C = 0; C < o; C += 3)
              (d[C + o] = -r[C]),
                (d[C + o + 1] = -r[C + 1]),
                (d[C + o + 2] = -r[C + 2])
            t.normal.values = d
          } else t.normal = void 0
          e.bitangent
            ? (m.set(l), m.set(l, o), (t.bitangent.values = m))
            : (t.bitangent = void 0),
            e.tangent &&
              ((l = t.tangent.values),
              u.set(l),
              u.set(l, o),
              (t.tangent.values = u))
        }
        if (e.st) {
          var A = t.st.values,
            _ = new Float32Array(6 * n)
          _.set(A), _.set(A, n)
          for (var w = 2 * n, T = 0; T < 2; T++) {
            for (_[w++] = A[0], _[w++] = A[1], C = 2; C < n; C += 2) {
              var G = A[C],
                E = A[C + 1]
              ;(_[w++] = G), (_[w++] = E), (_[w++] = G), (_[w++] = E)
            }
            ;(_[w++] = A[0]), (_[w++] = A[1])
          }
          t.st.values = _
        }
        return t
      })(s, e))
    var y = u / 3
    if (t.shadowVolume) {
      for (
        var f = s.normal.values,
          u = f.length,
          i = new Float32Array(6 * u),
          c = 0;
        c < u;
        c++
      )
        f[c] = -f[c]
      i.set(f, u),
        (i = x(f, 4 * u, i)),
        (s.extrudeDirection = new nt.GeometryAttribute({
          componentDatatype: ot.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: i,
        })),
        e.normal || (s.normal = void 0)
    }
    rt.defined(t.offsetAttribute) &&
      ((e = new Uint8Array(6 * y)),
      (e =
        t.offsetAttribute === E.GeometryOffsetAttribute.TOP
          ? ((e = E.arrayFill(e, 1, 0, y)), E.arrayFill(e, 1, 2 * y, 4 * y))
          : ((t = t.offsetAttribute === E.GeometryOffsetAttribute.NONE ? 0 : 1),
            E.arrayFill(e, t))),
      (s.applyOffset = new nt.GeometryAttribute({
        componentDatatype: ot.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: e,
      })))
    var p = l.length,
      h = y + y,
      g = lt.IndexDatatype.createTypedArray(m.length / 3, 2 * p + 3 * h)
    g.set(l)
    var b,
      C,
      v,
      A,
      _ = p
    for (c = 0; c < p; c += 3) {
      var w = l[c],
        T = l[c + 1],
        G = l[c + 2]
      ;(g[_++] = G + y), (g[_++] = T + y), (g[_++] = w + y)
    }
    for (c = 0; c < h; c += 2)
      (v = (b = c + h) + 1),
        (A = (C = b + h) + 1),
        (g[_++] = b),
        (g[_++] = C),
        (g[_++] = v),
        (g[_++] = v),
        (g[_++] = C),
        (g[_++] = A)
    return { attributes: s, indices: g }
  }
  var h = new it.Cartesian3(),
    g = new it.Cartesian3(),
    b = new it.Cartographic()
  function C(t, e, r, a, i, o) {
    var n = it.Cartesian3.subtract(e, t, h)
    it.Cartesian3.normalize(n, n)
    var s = r.geodeticSurfaceNormal(t, g),
      l = it.Cartesian3.cross(n, s, h)
    it.Cartesian3.multiplyByScalar(l, a, l)
    var d = i.latitude,
      u = i.longitude,
      e = o.latitude,
      n = o.longitude
    it.Cartesian3.add(t, l, g), r.cartesianToCartographic(g, b)
    ;(s = b.latitude),
      (a = b.longitude),
      (d = Math.min(d, s)),
      (u = Math.min(u, a)),
      (e = Math.max(e, s)),
      (n = Math.max(n, a))
    it.Cartesian3.subtract(t, l, g),
      r.cartesianToCartographic(g, b),
      (s = b.latitude),
      (a = b.longitude),
      (d = Math.min(d, s)),
      (u = Math.min(u, a)),
      (e = Math.max(e, s)),
      (n = Math.max(n, a)),
      (i.latitude = d),
      (i.longitude = u),
      (o.latitude = e),
      (o.longitude = n)
  }
  var v = new it.Cartesian3(),
    A = new it.Cartesian3(),
    _ = new it.Cartographic(),
    w = new it.Cartographic()
  function d(t, e, r, a, i) {
    t = c(t, e)
    var o = y.arrayRemoveDuplicates(t, it.Cartesian3.equalsEpsilon),
      n = o.length
    if (n < 2 || r <= 0) return new it.Rectangle()
    var s,
      l,
      d = 0.5 * r
    ;(_.latitude = Number.POSITIVE_INFINITY),
      (_.longitude = Number.POSITIVE_INFINITY),
      (w.latitude = Number.NEGATIVE_INFINITY),
      (w.longitude = Number.NEGATIVE_INFINITY),
      a === f.CornerType.ROUNDED &&
        ((m = o[0]),
        it.Cartesian3.subtract(m, o[1], v),
        it.Cartesian3.normalize(v, v),
        it.Cartesian3.multiplyByScalar(v, d, v),
        it.Cartesian3.add(m, v, A),
        e.cartesianToCartographic(A, b),
        (s = b.latitude),
        (l = b.longitude),
        (_.latitude = Math.min(_.latitude, s)),
        (_.longitude = Math.min(_.longitude, l)),
        (w.latitude = Math.max(w.latitude, s)),
        (w.longitude = Math.max(w.longitude, l)))
    for (var u = 0; u < n - 1; ++u) C(o[u], o[u + 1], e, d, _, w)
    var m = o[n - 1]
    it.Cartesian3.subtract(m, o[n - 2], v),
      it.Cartesian3.normalize(v, v),
      it.Cartesian3.multiplyByScalar(v, d, v),
      it.Cartesian3.add(m, v, A),
      C(m, A, e, d, _, w),
      a === f.CornerType.ROUNDED &&
        (e.cartesianToCartographic(A, b),
        (s = b.latitude),
        (l = b.longitude),
        (_.latitude = Math.min(_.latitude, s)),
        (_.longitude = Math.min(_.longitude, l)),
        (w.latitude = Math.max(w.latitude, s)),
        (w.longitude = Math.max(w.longitude, l)))
    i = rt.defined(i) ? i : new it.Rectangle()
    return (
      (i.north = w.latitude),
      (i.south = _.latitude),
      (i.east = w.longitude),
      (i.west = _.longitude),
      i
    )
  }
  function T(t) {
    var e = (t = rt.defaultValue(t, rt.defaultValue.EMPTY_OBJECT)).positions,
      r = t.width,
      a = rt.defaultValue(t.height, 0),
      i = rt.defaultValue(t.extrudedHeight, a)
    ;(this._positions = e),
      (this._ellipsoid = it.Ellipsoid.clone(
        rt.defaultValue(t.ellipsoid, it.Ellipsoid.WGS84)
      )),
      (this._vertexFormat = V.VertexFormat.clone(
        rt.defaultValue(t.vertexFormat, V.VertexFormat.DEFAULT)
      )),
      (this._width = r),
      (this._height = Math.max(a, i)),
      (this._extrudedHeight = Math.min(a, i)),
      (this._cornerType = rt.defaultValue(t.cornerType, f.CornerType.ROUNDED)),
      (this._granularity = rt.defaultValue(
        t.granularity,
        at.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._shadowVolume = rt.defaultValue(t.shadowVolume, !1)),
      (this._workerName = 'createCorridorGeometry'),
      (this._offsetAttribute = t.offsetAttribute),
      (this._rectangle = void 0),
      (this.packedLength =
        1 +
        e.length * it.Cartesian3.packedLength +
        it.Ellipsoid.packedLength +
        V.VertexFormat.packedLength +
        7)
  }
  T.pack = function (t, e, r) {
    r = rt.defaultValue(r, 0)
    var a = t._positions,
      i = a.length
    e[r++] = i
    for (var o = 0; o < i; ++o, r += it.Cartesian3.packedLength)
      it.Cartesian3.pack(a[o], e, r)
    return (
      it.Ellipsoid.pack(t._ellipsoid, e, r),
      (r += it.Ellipsoid.packedLength),
      V.VertexFormat.pack(t._vertexFormat, e, r),
      (r += V.VertexFormat.packedLength),
      (e[r++] = t._width),
      (e[r++] = t._height),
      (e[r++] = t._extrudedHeight),
      (e[r++] = t._cornerType),
      (e[r++] = t._granularity),
      (e[r++] = t._shadowVolume ? 1 : 0),
      (e[r] = rt.defaultValue(t._offsetAttribute, -1)),
      e
    )
  }
  var G = it.Ellipsoid.clone(it.Ellipsoid.UNIT_SPHERE),
    N = new V.VertexFormat(),
    D = {
      positions: void 0,
      ellipsoid: G,
      vertexFormat: N,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    }
  return (
    (T.unpack = function (t, e, r) {
      e = rt.defaultValue(e, 0)
      for (
        var a = t[e++], i = new Array(a), o = 0;
        o < a;
        ++o, e += it.Cartesian3.packedLength
      )
        i[o] = it.Cartesian3.unpack(t, e)
      var n = it.Ellipsoid.unpack(t, e, G)
      e += it.Ellipsoid.packedLength
      var s = V.VertexFormat.unpack(t, e, N)
      e += V.VertexFormat.packedLength
      var l = t[e++],
        d = t[e++],
        u = t[e++],
        m = t[e++],
        y = t[e++],
        f = 1 === t[e++],
        c = t[e]
      return rt.defined(r)
        ? ((r._positions = i),
          (r._ellipsoid = it.Ellipsoid.clone(n, r._ellipsoid)),
          (r._vertexFormat = V.VertexFormat.clone(s, r._vertexFormat)),
          (r._width = l),
          (r._height = d),
          (r._extrudedHeight = u),
          (r._cornerType = m),
          (r._granularity = y),
          (r._shadowVolume = f),
          (r._offsetAttribute = -1 === c ? void 0 : c),
          r)
        : ((D.positions = i),
          (D.width = l),
          (D.height = d),
          (D.extrudedHeight = u),
          (D.cornerType = m),
          (D.granularity = y),
          (D.shadowVolume = f),
          (D.offsetAttribute = -1 === c ? void 0 : c),
          new T(D))
    }),
    (T.computeRectangle = function (t, e) {
      var r = (t = rt.defaultValue(t, rt.defaultValue.EMPTY_OBJECT)).positions,
        a = t.width
      return d(
        r,
        rt.defaultValue(t.ellipsoid, it.Ellipsoid.WGS84),
        a,
        rt.defaultValue(t.cornerType, f.CornerType.ROUNDED),
        e
      )
    }),
    (T.createGeometry = function (t) {
      var e = t._positions,
        r = t._width,
        a = t._ellipsoid,
        e = c(e, a),
        i = y.arrayRemoveDuplicates(e, it.Cartesian3.equalsEpsilon)
      if (!(i.length < 2 || r <= 0)) {
        var o,
          n = t._height,
          s = t._extrudedHeight,
          l = !at.CesiumMath.equalsEpsilon(n, s, 0, at.CesiumMath.EPSILON2),
          e = t._vertexFormat,
          r = {
            ellipsoid: a,
            positions: i,
            width: r,
            cornerType: t._cornerType,
            granularity: t._granularity,
            saveAttributes: !0,
          }
        l
          ? ((r.height = n),
            (r.extrudedHeight = s),
            (r.shadowVolume = t._shadowVolume),
            (r.offsetAttribute = t._offsetAttribute),
            (o = p(r, e)))
          : (((o = P(
              dt.CorridorGeometryLibrary.computePositions(r),
              e,
              a
            )).attributes.position.values = F.PolygonPipeline.scaleToGeodeticHeight(
              o.attributes.position.values,
              n,
              a
            )),
            rt.defined(t._offsetAttribute) &&
              ((d =
                t._offsetAttribute === E.GeometryOffsetAttribute.NONE ? 0 : 1),
              (u = o.attributes.position.values.length),
              (u = new Uint8Array(u / 3)),
              E.arrayFill(u, d),
              (o.attributes.applyOffset = new nt.GeometryAttribute({
                componentDatatype: ot.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: u,
              }))))
        var d = o.attributes,
          u = m.BoundingSphere.fromVertices(d.position.values, void 0, 3)
        return (
          e.position || (o.attributes.position.values = void 0),
          new nt.Geometry({
            attributes: d,
            indices: o.indices,
            primitiveType: nt.PrimitiveType.TRIANGLES,
            boundingSphere: u,
            offsetAttribute: t._offsetAttribute,
          })
        )
      }
    }),
    (T.createShadowVolume = function (t, e, r) {
      var a = t._granularity,
        i = t._ellipsoid,
        e = e(a, i),
        r = r(a, i)
      return new T({
        positions: t._positions,
        width: t._width,
        cornerType: t._cornerType,
        ellipsoid: i,
        granularity: a,
        extrudedHeight: e,
        height: r,
        vertexFormat: V.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      })
    }),
    Object.defineProperties(T.prototype, {
      rectangle: {
        get: function () {
          return (
            rt.defined(this._rectangle) ||
              (this._rectangle = d(
                this._positions,
                this._ellipsoid,
                this._width,
                this._cornerType
              )),
            this._rectangle
          )
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return [0, 0, 0, 1, 1, 0]
        },
      },
    }),
    function (t, e) {
      return (
        rt.defined(e) && (t = T.unpack(t, e)),
        (t._ellipsoid = it.Ellipsoid.clone(t._ellipsoid)),
        T.createGeometry(t)
      )
    }
  )
})
