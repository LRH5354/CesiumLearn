define([
  'exports',
  './when-54c2dc71',
  './Check-6c0211bc',
  './Math-fc8cecf5',
  './Cartesian2-bddc1162',
  './Transforms-6f81ad4c',
  './ComponentDatatype-6d99a1ee',
  './GeometryAttribute-700c1da0',
  './GeometryAttributes-4fcfcf40',
  './GeometryPipeline-e6a15a43',
  './IndexDatatype-53503fee',
  './GeometryOffsetAttribute-7350d9af',
  './VertexFormat-7572c785',
  './EllipseGeometryLibrary-8006bb76',
  './GeometryInstance-bee96382',
], function (t, L, e, c, R, j, k, z, B, m, p, Y, d, H, y) {
  'use strict'
  var U = new R.Cartesian3(),
    Q = new R.Cartesian3(),
    W = new R.Cartesian3(),
    S = new R.Cartesian3(),
    J = new R.Cartesian2(),
    q = new j.Matrix3(),
    Z = new j.Matrix3(),
    K = new j.Quaternion(),
    X = new R.Cartesian3(),
    $ = new R.Cartesian3(),
    tt = new R.Cartesian3(),
    et = new R.Cartographic(),
    rt = new R.Cartesian3(),
    at = new R.Cartesian2(),
    it = new R.Cartesian2()
  function f(t, e, r) {
    var a = e.vertexFormat,
      i = e.center,
      n = e.semiMajorAxis,
      o = e.semiMinorAxis,
      s = e.ellipsoid,
      u = e.stRotation,
      l = r ? (t.length / 3) * 2 : t.length / 3,
      m = e.shadowVolume,
      c = a.st ? new Float32Array(2 * l) : void 0,
      p = a.normal ? new Float32Array(3 * l) : void 0,
      y = a.tangent ? new Float32Array(3 * l) : void 0,
      d = a.bitangent ? new Float32Array(3 * l) : void 0,
      f = m ? new Float32Array(3 * l) : void 0,
      A = 0,
      h = X,
      x = $,
      g = tt,
      _ = new j.GeographicProjection(s),
      b = _.project(s.cartesianToCartographic(i, et), rt),
      i = s.scaleToGeodeticSurface(i, U)
    s.geodeticSurfaceNormal(i, i)
    var C = q,
      v = Z
    v =
      0 !== u
        ? ((S = j.Quaternion.fromAxisAngle(i, u, K)),
          (C = j.Matrix3.fromQuaternion(S, C)),
          (S = j.Quaternion.fromAxisAngle(i, -u, K)),
          j.Matrix3.fromQuaternion(S, v))
        : ((C = j.Matrix3.clone(j.Matrix3.IDENTITY, C)),
          j.Matrix3.clone(j.Matrix3.IDENTITY, v))
    for (
      var w = R.Cartesian2.fromElements(
          Number.POSITIVE_INFINITY,
          Number.POSITIVE_INFINITY,
          at
        ),
        M = R.Cartesian2.fromElements(
          Number.NEGATIVE_INFINITY,
          Number.NEGATIVE_INFINITY,
          it
        ),
        E = t.length,
        I = r ? E : 0,
        T = (I / 3) * 2,
        G = 0;
      G < E;
      G += 3
    ) {
      var N,
        P = G + 1,
        F = G + 2,
        V = R.Cartesian3.fromArray(t, G, U)
      a.st &&
        ((N = j.Matrix3.multiplyByVector(C, V, Q)),
        (N = _.project(s.cartesianToCartographic(N, et), W)),
        R.Cartesian3.subtract(N, b, N),
        (J.x = (N.x + n) / (2 * n)),
        (J.y = (N.y + o) / (2 * o)),
        (w.x = Math.min(J.x, w.x)),
        (w.y = Math.min(J.y, w.y)),
        (M.x = Math.max(J.x, M.x)),
        (M.y = Math.max(J.y, M.y)),
        r && ((c[A + T] = J.x), (c[A + 1 + T] = J.y)),
        (c[A++] = J.x),
        (c[A++] = J.y)),
        (a.normal || a.tangent || a.bitangent || m) &&
          ((h = s.geodeticSurfaceNormal(V, h)),
          m && ((f[G + I] = -h.x), (f[P + I] = -h.y), (f[F + I] = -h.z)),
          (a.normal || a.tangent || a.bitangent) &&
            ((a.tangent || a.bitangent) &&
              ((x = R.Cartesian3.normalize(
                R.Cartesian3.cross(R.Cartesian3.UNIT_Z, h, x),
                x
              )),
              j.Matrix3.multiplyByVector(v, x, x)),
            a.normal &&
              ((p[G] = h.x),
              (p[P] = h.y),
              (p[F] = h.z),
              r && ((p[G + I] = -h.x), (p[P + I] = -h.y), (p[F + I] = -h.z))),
            a.tangent &&
              ((y[G] = x.x),
              (y[P] = x.y),
              (y[F] = x.z),
              r && ((y[G + I] = -x.x), (y[P + I] = -x.y), (y[F + I] = -x.z))),
            a.bitangent &&
              ((g = R.Cartesian3.normalize(R.Cartesian3.cross(h, x, g), g)),
              (d[G] = g.x),
              (d[P] = g.y),
              (d[F] = g.z),
              r && ((d[G + I] = g.x), (d[P + I] = g.y), (d[F + I] = g.z)))))
    }
    if (a.st) {
      E = c.length
      for (var D = 0; D < E; D += 2)
        (c[D] = (c[D] - w.x) / (M.x - w.x)),
          (c[D + 1] = (c[D + 1] - w.y) / (M.y - w.y))
    }
    var O,
      S = new B.GeometryAttributes()
    return (
      a.position &&
        ((O = H.EllipseGeometryLibrary.raisePositionsToHeight(t, e, r)),
        (S.position = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: O,
        }))),
      a.st &&
        (S.st = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: c,
        })),
      a.normal &&
        (S.normal = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: p,
        })),
      a.tangent &&
        (S.tangent = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: y,
        })),
      a.bitangent &&
        (S.bitangent = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: d,
        })),
      m &&
        (S.extrudeDirection = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: f,
        })),
      r &&
        L.defined(e.offsetAttribute) &&
        ((O = new Uint8Array(l)),
        (O =
          e.offsetAttribute === Y.GeometryOffsetAttribute.TOP
            ? Y.arrayFill(O, 1, 0, l / 2)
            : ((e =
                e.offsetAttribute === Y.GeometryOffsetAttribute.NONE ? 0 : 1),
              Y.arrayFill(O, e))),
        (S.applyOffset = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: O,
        }))),
      S
    )
  }
  function A(t) {
    for (
      var e, r, a = new Array(t * (t + 1) * 12 - 6), i = 0, n = 0, o = 1, s = 0;
      s < 3;
      s++
    )
      (a[i++] = o++), (a[i++] = n), (a[i++] = o)
    for (s = 2; s < t + 1; ++s) {
      for (
        o = s * (s + 1) - 1,
          n = (s - 1) * s - 1,
          a[i++] = o++,
          a[i++] = n,
          a[i++] = o,
          e = 2 * s,
          r = 0;
        r < e - 1;
        ++r
      )
        (a[i++] = o),
          (a[i++] = n++),
          (a[i++] = n),
          (a[i++] = o++),
          (a[i++] = n),
          (a[i++] = o)
      ;(a[i++] = o++), (a[i++] = n), (a[i++] = o)
    }
    for (e = 2 * t, ++o, ++n, s = 0; s < e - 1; ++s)
      (a[i++] = o),
        (a[i++] = n++),
        (a[i++] = n),
        (a[i++] = o++),
        (a[i++] = n),
        (a[i++] = o)
    for (
      a[i++] = o,
        a[i++] = n++,
        a[i++] = n,
        a[i++] = o++,
        a[i++] = n++,
        a[i++] = n,
        ++n,
        s = t - 1;
      1 < s;
      --s
    ) {
      for (
        a[i++] = n++, a[i++] = n, a[i++] = o, e = 2 * s, r = 0;
        r < e - 1;
        ++r
      )
        (a[i++] = o),
          (a[i++] = n++),
          (a[i++] = n),
          (a[i++] = o++),
          (a[i++] = n),
          (a[i++] = o)
      ;(a[i++] = n++), (a[i++] = n++), (a[i++] = o++)
    }
    for (s = 0; s < 3; s++) (a[i++] = n++), (a[i++] = n), (a[i++] = o)
    return a
  }
  var n = new R.Cartesian3()
  var h = new j.BoundingSphere(),
    x = new j.BoundingSphere()
  function o(t) {
    var e = t.center,
      r = t.ellipsoid,
      a = t.semiMajorAxis,
      i = R.Cartesian3.multiplyByScalar(
        r.geodeticSurfaceNormal(e, U),
        t.height,
        U
      )
    ;(h.center = R.Cartesian3.add(e, i, h.center)),
      (h.radius = a),
      (i = R.Cartesian3.multiplyByScalar(
        r.geodeticSurfaceNormal(e, i),
        t.extrudedHeight,
        i
      )),
      (x.center = R.Cartesian3.add(e, i, x.center)),
      (x.radius = a)
    var n = H.EllipseGeometryLibrary.computeEllipsePositions(t, !0, !0),
      r = n.positions,
      e = n.numPts,
      i = n.outerPositions,
      a = j.BoundingSphere.union(h, x),
      n = f(r, t, !0),
      o = (l = A(e)).length
    l.length = 2 * o
    for (var s = r.length / 3, u = 0; u < o; u += 3)
      (l[u + o] = l[u + 2] + s),
        (l[u + 1 + o] = l[u + 1] + s),
        (l[u + 2 + o] = l[u] + s)
    var r = p.IndexDatatype.createTypedArray((2 * s) / 3, l),
      r = new z.Geometry({
        attributes: n,
        indices: r,
        primitiveType: z.PrimitiveType.TRIANGLES,
      }),
      t = (function (t, e) {
        var r = e.vertexFormat,
          a = e.center,
          i = e.semiMajorAxis,
          n = e.semiMinorAxis,
          o = e.ellipsoid,
          s = e.height,
          u = e.extrudedHeight,
          l = e.stRotation,
          m = (t.length / 3) * 2,
          c = new Float64Array(3 * m),
          p = r.st ? new Float32Array(2 * m) : void 0,
          y = r.normal ? new Float32Array(3 * m) : void 0,
          d = r.tangent ? new Float32Array(3 * m) : void 0,
          f = r.bitangent ? new Float32Array(3 * m) : void 0,
          A = e.shadowVolume,
          h = A ? new Float32Array(3 * m) : void 0,
          x = 0,
          g = X,
          _ = $,
          b = tt,
          C = new j.GeographicProjection(o),
          v = C.project(o.cartesianToCartographic(a, et), rt),
          a = o.scaleToGeodeticSurface(a, U)
        o.geodeticSurfaceNormal(a, a)
        for (
          var a = j.Quaternion.fromAxisAngle(a, l, K),
            w = j.Matrix3.fromQuaternion(a, q),
            M = R.Cartesian2.fromElements(
              Number.POSITIVE_INFINITY,
              Number.POSITIVE_INFINITY,
              at
            ),
            E = R.Cartesian2.fromElements(
              Number.NEGATIVE_INFINITY,
              Number.NEGATIVE_INFINITY,
              it
            ),
            I = t.length,
            T = (I / 3) * 2,
            G = 0;
          G < I;
          G += 3
        ) {
          var N = G + 1,
            P = G + 2,
            F = R.Cartesian3.fromArray(t, G, U)
          r.st &&
            ((D = j.Matrix3.multiplyByVector(w, F, Q)),
            (V = C.project(o.cartesianToCartographic(D, et), W)),
            R.Cartesian3.subtract(V, v, V),
            (J.x = (V.x + i) / (2 * i)),
            (J.y = (V.y + n) / (2 * n)),
            (M.x = Math.min(J.x, M.x)),
            (M.y = Math.min(J.y, M.y)),
            (E.x = Math.max(J.x, E.x)),
            (E.y = Math.max(J.y, E.y)),
            (p[x + T] = J.x),
            (p[x + 1 + T] = J.y),
            (p[x++] = J.x),
            (p[x++] = J.y)),
            (F = o.scaleToGeodeticSurface(F, F)),
            (D = R.Cartesian3.clone(F, Q)),
            (g = o.geodeticSurfaceNormal(F, g)),
            A && ((h[G + I] = -g.x), (h[N + I] = -g.y), (h[P + I] = -g.z))
          var V = R.Cartesian3.multiplyByScalar(g, s, S),
            F = R.Cartesian3.add(F, V, F),
            V = R.Cartesian3.multiplyByScalar(g, u, V),
            D = R.Cartesian3.add(D, V, D)
          r.position &&
            ((c[G + I] = D.x),
            (c[N + I] = D.y),
            (c[P + I] = D.z),
            (c[G] = F.x),
            (c[N] = F.y),
            (c[P] = F.z)),
            (r.normal || r.tangent || r.bitangent) &&
              ((b = R.Cartesian3.clone(g, b)),
              (V = R.Cartesian3.fromArray(t, (G + 3) % I, S)),
              R.Cartesian3.subtract(V, F, V),
              (F = R.Cartesian3.subtract(D, F, W)),
              (g = R.Cartesian3.normalize(R.Cartesian3.cross(F, V, g), g)),
              r.normal &&
                ((y[G] = g.x),
                (y[N] = g.y),
                (y[P] = g.z),
                (y[G + I] = g.x),
                (y[N + I] = g.y),
                (y[P + I] = g.z)),
              r.tangent &&
                ((_ = R.Cartesian3.normalize(R.Cartesian3.cross(b, g, _), _)),
                (d[G] = _.x),
                (d[N] = _.y),
                (d[P] = _.z),
                (d[G + I] = _.x),
                (d[G + 1 + I] = _.y),
                (d[G + 2 + I] = _.z)),
              r.bitangent &&
                ((f[G] = b.x),
                (f[N] = b.y),
                (f[P] = b.z),
                (f[G + I] = b.x),
                (f[N + I] = b.y),
                (f[P + I] = b.z)))
        }
        if (r.st) {
          I = p.length
          for (var O = 0; O < I; O += 2)
            (p[O] = (p[O] - M.x) / (E.x - M.x)),
              (p[O + 1] = (p[O + 1] - M.y) / (E.y - M.y))
        }
        return (
          (l = new B.GeometryAttributes()),
          r.position &&
            (l.position = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: c,
            })),
          r.st &&
            (l.st = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: p,
            })),
          r.normal &&
            (l.normal = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: y,
            })),
          r.tangent &&
            (l.tangent = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: d,
            })),
          r.bitangent &&
            (l.bitangent = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: f,
            })),
          A &&
            (l.extrudeDirection = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: h,
            })),
          L.defined(e.offsetAttribute) &&
            ((a = new Uint8Array(m)),
            (a =
              e.offsetAttribute === Y.GeometryOffsetAttribute.TOP
                ? Y.arrayFill(a, 1, 0, m / 2)
                : ((e =
                    e.offsetAttribute === Y.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1),
                  Y.arrayFill(a, e))),
            (l.applyOffset = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: a,
            }))),
          l
        )
      })(i, t),
      l = (function (t) {
        for (
          var e = t.length / 3,
            r = p.IndexDatatype.createTypedArray(e, 6 * e),
            a = 0,
            i = 0;
          i < e;
          i++
        ) {
          var n = i + e,
            o = (i + 1) % e,
            s = o + e
          ;(r[a++] = i),
            (r[a++] = n),
            (r[a++] = o),
            (r[a++] = o),
            (r[a++] = n),
            (r[a++] = s)
        }
        return r
      })(i),
      i = p.IndexDatatype.createTypedArray((2 * i.length) / 3, l),
      i = new z.Geometry({
        attributes: t,
        indices: i,
        primitiveType: z.PrimitiveType.TRIANGLES,
      }),
      i = m.GeometryPipeline.combineInstances([
        new y.GeometryInstance({ geometry: r }),
        new y.GeometryInstance({ geometry: i }),
      ])
    return {
      boundingSphere: a,
      attributes: i[0].attributes,
      indices: i[0].indices,
    }
  }
  function s(t, e, r, a, i, n, o) {
    for (
      var s = H.EllipseGeometryLibrary.computeEllipsePositions(
          {
            center: t,
            semiMajorAxis: e,
            semiMinorAxis: r,
            rotation: a,
            granularity: i,
          },
          !1,
          !0
        ).outerPositions,
        u = s.length / 3,
        l = new Array(u),
        m = 0;
      m < u;
      ++m
    )
      l[m] = R.Cartesian3.fromArray(s, 3 * m)
    o = R.Rectangle.fromCartesianArray(l, n, o)
    return (
      o.width > c.CesiumMath.PI &&
        ((o.north =
          0 < o.north
            ? c.CesiumMath.PI_OVER_TWO - c.CesiumMath.EPSILON7
            : o.north),
        (o.south =
          o.south < 0
            ? c.CesiumMath.EPSILON7 - c.CesiumMath.PI_OVER_TWO
            : o.south),
        (o.east = c.CesiumMath.PI),
        (o.west = -c.CesiumMath.PI)),
      o
    )
  }
  function g(t) {
    var e = (t = L.defaultValue(t, L.defaultValue.EMPTY_OBJECT)).center,
      r = L.defaultValue(t.ellipsoid, R.Ellipsoid.WGS84),
      a = t.semiMajorAxis,
      i = t.semiMinorAxis,
      n = L.defaultValue(t.granularity, c.CesiumMath.RADIANS_PER_DEGREE),
      o = L.defaultValue(t.vertexFormat, d.VertexFormat.DEFAULT),
      s = L.defaultValue(t.height, 0),
      u = L.defaultValue(t.extrudedHeight, s)
    ;(this._center = R.Cartesian3.clone(e)),
      (this._semiMajorAxis = a),
      (this._semiMinorAxis = i),
      (this._ellipsoid = R.Ellipsoid.clone(r)),
      (this._rotation = L.defaultValue(t.rotation, 0)),
      (this._stRotation = L.defaultValue(t.stRotation, 0)),
      (this._height = Math.max(u, s)),
      (this._granularity = n),
      (this._vertexFormat = d.VertexFormat.clone(o)),
      (this._extrudedHeight = Math.min(u, s)),
      (this._shadowVolume = L.defaultValue(t.shadowVolume, !1)),
      (this._workerName = 'createEllipseGeometry'),
      (this._offsetAttribute = t.offsetAttribute),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0)
  }
  ;(g.packedLength =
    R.Cartesian3.packedLength +
    R.Ellipsoid.packedLength +
    d.VertexFormat.packedLength +
    9),
    (g.pack = function (t, e, r) {
      return (
        (r = L.defaultValue(r, 0)),
        R.Cartesian3.pack(t._center, e, r),
        (r += R.Cartesian3.packedLength),
        R.Ellipsoid.pack(t._ellipsoid, e, r),
        (r += R.Ellipsoid.packedLength),
        d.VertexFormat.pack(t._vertexFormat, e, r),
        (r += d.VertexFormat.packedLength),
        (e[r++] = t._semiMajorAxis),
        (e[r++] = t._semiMinorAxis),
        (e[r++] = t._rotation),
        (e[r++] = t._stRotation),
        (e[r++] = t._height),
        (e[r++] = t._granularity),
        (e[r++] = t._extrudedHeight),
        (e[r++] = t._shadowVolume ? 1 : 0),
        (e[r] = L.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  var _ = new R.Cartesian3(),
    b = new R.Ellipsoid(),
    C = new d.VertexFormat(),
    v = {
      center: _,
      ellipsoid: b,
      vertexFormat: C,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      stRotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    }
  ;(g.unpack = function (t, e, r) {
    e = L.defaultValue(e, 0)
    var a = R.Cartesian3.unpack(t, e, _)
    e += R.Cartesian3.packedLength
    var i = R.Ellipsoid.unpack(t, e, b)
    e += R.Ellipsoid.packedLength
    var n = d.VertexFormat.unpack(t, e, C)
    e += d.VertexFormat.packedLength
    var o = t[e++],
      s = t[e++],
      u = t[e++],
      l = t[e++],
      m = t[e++],
      c = t[e++],
      p = t[e++],
      y = 1 === t[e++],
      e = t[e]
    return L.defined(r)
      ? ((r._center = R.Cartesian3.clone(a, r._center)),
        (r._ellipsoid = R.Ellipsoid.clone(i, r._ellipsoid)),
        (r._vertexFormat = d.VertexFormat.clone(n, r._vertexFormat)),
        (r._semiMajorAxis = o),
        (r._semiMinorAxis = s),
        (r._rotation = u),
        (r._stRotation = l),
        (r._height = m),
        (r._granularity = c),
        (r._extrudedHeight = p),
        (r._shadowVolume = y),
        (r._offsetAttribute = -1 === e ? void 0 : e),
        r)
      : ((v.height = m),
        (v.extrudedHeight = p),
        (v.granularity = c),
        (v.stRotation = l),
        (v.rotation = u),
        (v.semiMajorAxis = o),
        (v.semiMinorAxis = s),
        (v.shadowVolume = y),
        (v.offsetAttribute = -1 === e ? void 0 : e),
        new g(v))
  }),
    (g.computeRectangle = function (t, e) {
      var r = (t = L.defaultValue(t, L.defaultValue.EMPTY_OBJECT)).center,
        a = L.defaultValue(t.ellipsoid, R.Ellipsoid.WGS84),
        i = t.semiMajorAxis,
        n = t.semiMinorAxis,
        o = L.defaultValue(t.granularity, c.CesiumMath.RADIANS_PER_DEGREE)
      return s(r, i, n, L.defaultValue(t.rotation, 0), o, a, e)
    }),
    (g.createGeometry = function (t) {
      if (!(t._semiMajorAxis <= 0 || t._semiMinorAxis <= 0)) {
        var e = t._height,
          r = t._extrudedHeight,
          a = !c.CesiumMath.equalsEpsilon(e, r, 0, c.CesiumMath.EPSILON2)
        t._center = t._ellipsoid.scaleToGeodeticSurface(t._center, t._center)
        var i,
          e = {
            center: t._center,
            semiMajorAxis: t._semiMajorAxis,
            semiMinorAxis: t._semiMinorAxis,
            ellipsoid: t._ellipsoid,
            rotation: t._rotation,
            height: e,
            granularity: t._granularity,
            vertexFormat: t._vertexFormat,
            stRotation: t._stRotation,
          }
        return (
          a
            ? ((e.extrudedHeight = r),
              (e.shadowVolume = t._shadowVolume),
              (e.offsetAttribute = t._offsetAttribute),
              (i = o(e)))
            : ((i = (function (t) {
                var e = t.center
                ;(n = R.Cartesian3.multiplyByScalar(
                  t.ellipsoid.geodeticSurfaceNormal(e, n),
                  t.height,
                  n
                )),
                  (n = R.Cartesian3.add(e, n, n))
                var r = new j.BoundingSphere(n, t.semiMajorAxis),
                  e = (a = H.EllipseGeometryLibrary.computeEllipsePositions(
                    t,
                    !0,
                    !1
                  )).positions,
                  a = a.numPts,
                  t = f(e, t, !1),
                  a = A(a)
                return {
                  boundingSphere: r,
                  attributes: t,
                  indices: (a = p.IndexDatatype.createTypedArray(
                    e.length / 3,
                    a
                  )),
                }
              })(e)),
              L.defined(t._offsetAttribute) &&
                ((r = i.attributes.position.values.length),
                (e = new Uint8Array(r / 3)),
                (r =
                  t._offsetAttribute === Y.GeometryOffsetAttribute.NONE
                    ? 0
                    : 1),
                Y.arrayFill(e, r),
                (i.attributes.applyOffset = new z.GeometryAttribute({
                  componentDatatype: k.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: e,
                })))),
          new z.Geometry({
            attributes: i.attributes,
            indices: i.indices,
            primitiveType: z.PrimitiveType.TRIANGLES,
            boundingSphere: i.boundingSphere,
            offsetAttribute: t._offsetAttribute,
          })
        )
      }
    }),
    (g.createShadowVolume = function (t, e, r) {
      var a = t._granularity,
        i = t._ellipsoid,
        e = e(a, i),
        r = r(a, i)
      return new g({
        center: t._center,
        semiMajorAxis: t._semiMajorAxis,
        semiMinorAxis: t._semiMinorAxis,
        ellipsoid: i,
        rotation: t._rotation,
        stRotation: t._stRotation,
        granularity: a,
        extrudedHeight: e,
        height: r,
        vertexFormat: d.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      })
    }),
    Object.defineProperties(g.prototype, {
      rectangle: {
        get: function () {
          return (
            L.defined(this._rectangle) ||
              (this._rectangle = s(
                this._center,
                this._semiMajorAxis,
                this._semiMinorAxis,
                this._rotation,
                this._granularity,
                this._ellipsoid
              )),
            this._rectangle
          )
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            L.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (t) {
                var e = -t._stRotation
                if (0 == e) return [0, 0, 0, 1, 1, 0]
                for (
                  var r = H.EllipseGeometryLibrary.computeEllipsePositions(
                      {
                        center: t._center,
                        semiMajorAxis: t._semiMajorAxis,
                        semiMinorAxis: t._semiMinorAxis,
                        rotation: t._rotation,
                        granularity: t._granularity,
                      },
                      !1,
                      !0
                    ).outerPositions,
                    a = r.length / 3,
                    i = new Array(a),
                    n = 0;
                  n < a;
                  ++n
                )
                  i[n] = R.Cartesian3.fromArray(r, 3 * n)
                var o = t._ellipsoid,
                  t = t.rectangle
                return z.Geometry._textureCoordinateRotationPoints(i, e, o, t)
              })(this)),
            this._textureCoordinateRotationPoints
          )
        },
      },
    }),
    (t.EllipseGeometry = g)
})
