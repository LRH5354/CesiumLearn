define([
  "exports",
  "./when-cbf8cd21",
  "./Check-35e1a91d",
  "./Math-e66fad2a",
  "./Cartesian2-ec968a07",
  "./Transforms-a4b96eff",
  "./ComponentDatatype-7ee14e67",
  "./GeometryAttribute-3827e3e2",
  "./GeometryAttributes-90846c5f",
  "./GeometryPipeline-4cf8286d",
  "./IndexDatatype-66caba23",
  "./GeometryOffsetAttribute-84f7eff3",
  "./VertexFormat-cc24f342",
  "./EllipseGeometryLibrary-ea7f2141",
  "./GeometryInstance-b75d9687",
], function (e, L, t, p, R, j, k, z, B, m, y, Y, d, H, c) {
  "use strict";
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
    ee = new R.Cartesian3(),
    te = new R.Cartographic(),
    re = new R.Cartesian3(),
    ae = new R.Cartesian2(),
    ie = new R.Cartesian2();
  function f(e, t, r) {
    var a = t.vertexFormat,
      i = t.center,
      n = t.semiMajorAxis,
      o = t.semiMinorAxis,
      s = t.ellipsoid,
      u = t.stRotation,
      l = r ? (e.length / 3) * 2 : e.length / 3,
      m = t.shadowVolume,
      p = a.st ? new Float32Array(2 * l) : void 0,
      y = a.normal ? new Float32Array(3 * l) : void 0,
      c = a.tangent ? new Float32Array(3 * l) : void 0,
      d = a.bitangent ? new Float32Array(3 * l) : void 0,
      f = m ? new Float32Array(3 * l) : void 0,
      A = 0,
      h = X,
      x = $,
      g = ee,
      _ = new j.GeographicProjection(s),
      b = _.project(s.cartesianToCartographic(i, te), re),
      i = s.scaleToGeodeticSurface(i, U);
    s.geodeticSurfaceNormal(i, i);
    var C = q,
      v = Z;
    v =
      0 !== u
        ? ((S = j.Quaternion.fromAxisAngle(i, u, K)),
          (C = j.Matrix3.fromQuaternion(S, C)),
          (S = j.Quaternion.fromAxisAngle(i, -u, K)),
          j.Matrix3.fromQuaternion(S, v))
        : ((C = j.Matrix3.clone(j.Matrix3.IDENTITY, C)),
          j.Matrix3.clone(j.Matrix3.IDENTITY, v));
    for (
      var w = R.Cartesian2.fromElements(
          Number.POSITIVE_INFINITY,
          Number.POSITIVE_INFINITY,
          ae
        ),
        M = R.Cartesian2.fromElements(
          Number.NEGATIVE_INFINITY,
          Number.NEGATIVE_INFINITY,
          ie
        ),
        E = e.length,
        I = r ? E : 0,
        T = (I / 3) * 2,
        G = 0;
      G < E;
      G += 3
    ) {
      var N,
        P = G + 1,
        F = G + 2,
        V = R.Cartesian3.fromArray(e, G, U);
      a.st &&
        ((N = j.Matrix3.multiplyByVector(C, V, Q)),
        (N = _.project(s.cartesianToCartographic(N, te), W)),
        R.Cartesian3.subtract(N, b, N),
        (J.x = (N.x + n) / (2 * n)),
        (J.y = (N.y + o) / (2 * o)),
        (w.x = Math.min(J.x, w.x)),
        (w.y = Math.min(J.y, w.y)),
        (M.x = Math.max(J.x, M.x)),
        (M.y = Math.max(J.y, M.y)),
        r && ((p[A + T] = J.x), (p[A + 1 + T] = J.y)),
        (p[A++] = J.x),
        (p[A++] = J.y)),
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
              ((y[G] = h.x),
              (y[P] = h.y),
              (y[F] = h.z),
              r && ((y[G + I] = -h.x), (y[P + I] = -h.y), (y[F + I] = -h.z))),
            a.tangent &&
              ((c[G] = x.x),
              (c[P] = x.y),
              (c[F] = x.z),
              r && ((c[G + I] = -x.x), (c[P + I] = -x.y), (c[F + I] = -x.z))),
            a.bitangent &&
              ((g = R.Cartesian3.normalize(R.Cartesian3.cross(h, x, g), g)),
              (d[G] = g.x),
              (d[P] = g.y),
              (d[F] = g.z),
              r && ((d[G + I] = g.x), (d[P + I] = g.y), (d[F + I] = g.z)))));
    }
    if (a.st) {
      E = p.length;
      for (var D = 0; D < E; D += 2)
        (p[D] = (p[D] - w.x) / (M.x - w.x)),
          (p[D + 1] = (p[D + 1] - w.y) / (M.y - w.y));
    }
    var O,
      S = new B.GeometryAttributes();
    return (
      a.position &&
        ((O = H.EllipseGeometryLibrary.raisePositionsToHeight(e, t, r)),
        (S.position = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: O,
        }))),
      a.st &&
        (S.st = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: p,
        })),
      a.normal &&
        (S.normal = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: y,
        })),
      a.tangent &&
        (S.tangent = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: c,
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
        L.defined(t.offsetAttribute) &&
        ((O = new Uint8Array(l)),
        (O =
          t.offsetAttribute === Y.GeometryOffsetAttribute.TOP
            ? Y.arrayFill(O, 1, 0, l / 2)
            : ((t =
                t.offsetAttribute === Y.GeometryOffsetAttribute.NONE ? 0 : 1),
              Y.arrayFill(O, t))),
        (S.applyOffset = new z.GeometryAttribute({
          componentDatatype: k.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: O,
        }))),
      S
    );
  }
  function A(e) {
    for (
      var t, r, a = new Array(e * (e + 1) * 12 - 6), i = 0, n = 0, o = 1, s = 0;
      s < 3;
      s++
    )
      (a[i++] = o++), (a[i++] = n), (a[i++] = o);
    for (s = 2; s < e + 1; ++s) {
      for (
        o = s * (s + 1) - 1,
          n = (s - 1) * s - 1,
          a[i++] = o++,
          a[i++] = n,
          a[i++] = o,
          t = 2 * s,
          r = 0;
        r < t - 1;
        ++r
      )
        (a[i++] = o),
          (a[i++] = n++),
          (a[i++] = n),
          (a[i++] = o++),
          (a[i++] = n),
          (a[i++] = o);
      (a[i++] = o++), (a[i++] = n), (a[i++] = o);
    }
    for (t = 2 * e, ++o, ++n, s = 0; s < t - 1; ++s)
      (a[i++] = o),
        (a[i++] = n++),
        (a[i++] = n),
        (a[i++] = o++),
        (a[i++] = n),
        (a[i++] = o);
    for (
      a[i++] = o,
        a[i++] = n++,
        a[i++] = n,
        a[i++] = o++,
        a[i++] = n++,
        a[i++] = n,
        ++n,
        s = e - 1;
      1 < s;
      --s
    ) {
      for (
        a[i++] = n++, a[i++] = n, a[i++] = o, t = 2 * s, r = 0;
        r < t - 1;
        ++r
      )
        (a[i++] = o),
          (a[i++] = n++),
          (a[i++] = n),
          (a[i++] = o++),
          (a[i++] = n),
          (a[i++] = o);
      (a[i++] = n++), (a[i++] = n++), (a[i++] = o++);
    }
    for (s = 0; s < 3; s++) (a[i++] = n++), (a[i++] = n), (a[i++] = o);
    return a;
  }
  var n = new R.Cartesian3();
  var h = new j.BoundingSphere(),
    x = new j.BoundingSphere();
  function o(e) {
    var t = e.center,
      r = e.ellipsoid,
      a = e.semiMajorAxis,
      i = R.Cartesian3.multiplyByScalar(
        r.geodeticSurfaceNormal(t, U),
        e.height,
        U
      );
    (h.center = R.Cartesian3.add(t, i, h.center)),
      (h.radius = a),
      (i = R.Cartesian3.multiplyByScalar(
        r.geodeticSurfaceNormal(t, i),
        e.extrudedHeight,
        i
      )),
      (x.center = R.Cartesian3.add(t, i, x.center)),
      (x.radius = a);
    var n = H.EllipseGeometryLibrary.computeEllipsePositions(e, !0, !0),
      r = n.positions,
      t = n.numPts,
      i = n.outerPositions,
      a = j.BoundingSphere.union(h, x),
      n = f(r, e, !0),
      o = (l = A(t)).length;
    l.length = 2 * o;
    for (var s = r.length / 3, u = 0; u < o; u += 3)
      (l[u + o] = l[u + 2] + s),
        (l[u + 1 + o] = l[u + 1] + s),
        (l[u + 2 + o] = l[u] + s);
    var r = y.IndexDatatype.createTypedArray((2 * s) / 3, l),
      r = new z.Geometry({
        attributes: n,
        indices: r,
        primitiveType: z.PrimitiveType.TRIANGLES,
      }),
      e = (function (e, t) {
        var r = t.vertexFormat,
          a = t.center,
          i = t.semiMajorAxis,
          n = t.semiMinorAxis,
          o = t.ellipsoid,
          s = t.height,
          u = t.extrudedHeight,
          l = t.stRotation,
          m = (e.length / 3) * 2,
          p = new Float64Array(3 * m),
          y = r.st ? new Float32Array(2 * m) : void 0,
          c = r.normal ? new Float32Array(3 * m) : void 0,
          d = r.tangent ? new Float32Array(3 * m) : void 0,
          f = r.bitangent ? new Float32Array(3 * m) : void 0,
          A = t.shadowVolume,
          h = A ? new Float32Array(3 * m) : void 0,
          x = 0,
          g = X,
          _ = $,
          b = ee,
          C = new j.GeographicProjection(o),
          v = C.project(o.cartesianToCartographic(a, te), re),
          a = o.scaleToGeodeticSurface(a, U);
        o.geodeticSurfaceNormal(a, a);
        for (
          var a = j.Quaternion.fromAxisAngle(a, l, K),
            w = j.Matrix3.fromQuaternion(a, q),
            M = R.Cartesian2.fromElements(
              Number.POSITIVE_INFINITY,
              Number.POSITIVE_INFINITY,
              ae
            ),
            E = R.Cartesian2.fromElements(
              Number.NEGATIVE_INFINITY,
              Number.NEGATIVE_INFINITY,
              ie
            ),
            I = e.length,
            T = (I / 3) * 2,
            G = 0;
          G < I;
          G += 3
        ) {
          var N = G + 1,
            P = G + 2,
            F = R.Cartesian3.fromArray(e, G, U);
          r.st &&
            ((D = j.Matrix3.multiplyByVector(w, F, Q)),
            (V = C.project(o.cartesianToCartographic(D, te), W)),
            R.Cartesian3.subtract(V, v, V),
            (J.x = (V.x + i) / (2 * i)),
            (J.y = (V.y + n) / (2 * n)),
            (M.x = Math.min(J.x, M.x)),
            (M.y = Math.min(J.y, M.y)),
            (E.x = Math.max(J.x, E.x)),
            (E.y = Math.max(J.y, E.y)),
            (y[x + T] = J.x),
            (y[x + 1 + T] = J.y),
            (y[x++] = J.x),
            (y[x++] = J.y)),
            (F = o.scaleToGeodeticSurface(F, F)),
            (D = R.Cartesian3.clone(F, Q)),
            (g = o.geodeticSurfaceNormal(F, g)),
            A && ((h[G + I] = -g.x), (h[N + I] = -g.y), (h[P + I] = -g.z));
          var V = R.Cartesian3.multiplyByScalar(g, s, S),
            F = R.Cartesian3.add(F, V, F),
            V = R.Cartesian3.multiplyByScalar(g, u, V),
            D = R.Cartesian3.add(D, V, D);
          r.position &&
            ((p[G + I] = D.x),
            (p[N + I] = D.y),
            (p[P + I] = D.z),
            (p[G] = F.x),
            (p[N] = F.y),
            (p[P] = F.z)),
            (r.normal || r.tangent || r.bitangent) &&
              ((b = R.Cartesian3.clone(g, b)),
              (V = R.Cartesian3.fromArray(e, (G + 3) % I, S)),
              R.Cartesian3.subtract(V, F, V),
              (F = R.Cartesian3.subtract(D, F, W)),
              (g = R.Cartesian3.normalize(R.Cartesian3.cross(F, V, g), g)),
              r.normal &&
                ((c[G] = g.x),
                (c[N] = g.y),
                (c[P] = g.z),
                (c[G + I] = g.x),
                (c[N + I] = g.y),
                (c[P + I] = g.z)),
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
                (f[P + I] = b.z)));
        }
        if (r.st) {
          I = y.length;
          for (var O = 0; O < I; O += 2)
            (y[O] = (y[O] - M.x) / (E.x - M.x)),
              (y[O + 1] = (y[O + 1] - M.y) / (E.y - M.y));
        }
        return (
          (l = new B.GeometryAttributes()),
          r.position &&
            (l.position = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: p,
            })),
          r.st &&
            (l.st = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: y,
            })),
          r.normal &&
            (l.normal = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: c,
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
          L.defined(t.offsetAttribute) &&
            ((a = new Uint8Array(m)),
            (a =
              t.offsetAttribute === Y.GeometryOffsetAttribute.TOP
                ? Y.arrayFill(a, 1, 0, m / 2)
                : ((t =
                    t.offsetAttribute === Y.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1),
                  Y.arrayFill(a, t))),
            (l.applyOffset = new z.GeometryAttribute({
              componentDatatype: k.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: a,
            }))),
          l
        );
      })(i, e),
      l = (function (e) {
        for (
          var t = e.length / 3,
            r = y.IndexDatatype.createTypedArray(t, 6 * t),
            a = 0,
            i = 0;
          i < t;
          i++
        ) {
          var n = i + t,
            o = (i + 1) % t,
            s = o + t;
          (r[a++] = i),
            (r[a++] = n),
            (r[a++] = o),
            (r[a++] = o),
            (r[a++] = n),
            (r[a++] = s);
        }
        return r;
      })(i),
      i = y.IndexDatatype.createTypedArray((2 * i.length) / 3, l),
      i = new z.Geometry({
        attributes: e,
        indices: i,
        primitiveType: z.PrimitiveType.TRIANGLES,
      }),
      i = m.GeometryPipeline.combineInstances([
        new c.GeometryInstance({ geometry: r }),
        new c.GeometryInstance({ geometry: i }),
      ]);
    return {
      boundingSphere: a,
      attributes: i[0].attributes,
      indices: i[0].indices,
    };
  }
  function s(e, t, r, a, i, n, o) {
    for (
      var s = H.EllipseGeometryLibrary.computeEllipsePositions(
          {
            center: e,
            semiMajorAxis: t,
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
      l[m] = R.Cartesian3.fromArray(s, 3 * m);
    o = R.Rectangle.fromCartesianArray(l, n, o);
    return (
      o.width > p.CesiumMath.PI &&
        ((o.north =
          0 < o.north
            ? p.CesiumMath.PI_OVER_TWO - p.CesiumMath.EPSILON7
            : o.north),
        (o.south =
          o.south < 0
            ? p.CesiumMath.EPSILON7 - p.CesiumMath.PI_OVER_TWO
            : o.south),
        (o.east = p.CesiumMath.PI),
        (o.west = -p.CesiumMath.PI)),
      o
    );
  }
  function g(e) {
    var t = (e = L.defaultValue(e, L.defaultValue.EMPTY_OBJECT)).center,
      r = L.defaultValue(e.ellipsoid, R.Ellipsoid.WGS84),
      a = e.semiMajorAxis,
      i = e.semiMinorAxis,
      n = L.defaultValue(e.granularity, p.CesiumMath.RADIANS_PER_DEGREE),
      o = L.defaultValue(e.vertexFormat, d.VertexFormat.DEFAULT),
      s = L.defaultValue(e.height, 0),
      u = L.defaultValue(e.extrudedHeight, s);
    (this._center = R.Cartesian3.clone(t)),
      (this._semiMajorAxis = a),
      (this._semiMinorAxis = i),
      (this._ellipsoid = R.Ellipsoid.clone(r)),
      (this._rotation = L.defaultValue(e.rotation, 0)),
      (this._stRotation = L.defaultValue(e.stRotation, 0)),
      (this._height = Math.max(u, s)),
      (this._granularity = n),
      (this._vertexFormat = d.VertexFormat.clone(o)),
      (this._extrudedHeight = Math.min(u, s)),
      (this._shadowVolume = L.defaultValue(e.shadowVolume, !1)),
      (this._workerName = "createEllipseGeometry"),
      (this._offsetAttribute = e.offsetAttribute),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0);
  }
  (g.packedLength =
    R.Cartesian3.packedLength +
    R.Ellipsoid.packedLength +
    d.VertexFormat.packedLength +
    9),
    (g.pack = function (e, t, r) {
      return (
        (r = L.defaultValue(r, 0)),
        R.Cartesian3.pack(e._center, t, r),
        (r += R.Cartesian3.packedLength),
        R.Ellipsoid.pack(e._ellipsoid, t, r),
        (r += R.Ellipsoid.packedLength),
        d.VertexFormat.pack(e._vertexFormat, t, r),
        (r += d.VertexFormat.packedLength),
        (t[r++] = e._semiMajorAxis),
        (t[r++] = e._semiMinorAxis),
        (t[r++] = e._rotation),
        (t[r++] = e._stRotation),
        (t[r++] = e._height),
        (t[r++] = e._granularity),
        (t[r++] = e._extrudedHeight),
        (t[r++] = e._shadowVolume ? 1 : 0),
        (t[r] = L.defaultValue(e._offsetAttribute, -1)),
        t
      );
    });
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
    };
  (g.unpack = function (e, t, r) {
    t = L.defaultValue(t, 0);
    var a = R.Cartesian3.unpack(e, t, _);
    t += R.Cartesian3.packedLength;
    var i = R.Ellipsoid.unpack(e, t, b);
    t += R.Ellipsoid.packedLength;
    var n = d.VertexFormat.unpack(e, t, C);
    t += d.VertexFormat.packedLength;
    var o = e[t++],
      s = e[t++],
      u = e[t++],
      l = e[t++],
      m = e[t++],
      p = e[t++],
      y = e[t++],
      c = 1 === e[t++],
      t = e[t];
    return L.defined(r)
      ? ((r._center = R.Cartesian3.clone(a, r._center)),
        (r._ellipsoid = R.Ellipsoid.clone(i, r._ellipsoid)),
        (r._vertexFormat = d.VertexFormat.clone(n, r._vertexFormat)),
        (r._semiMajorAxis = o),
        (r._semiMinorAxis = s),
        (r._rotation = u),
        (r._stRotation = l),
        (r._height = m),
        (r._granularity = p),
        (r._extrudedHeight = y),
        (r._shadowVolume = c),
        (r._offsetAttribute = -1 === t ? void 0 : t),
        r)
      : ((v.height = m),
        (v.extrudedHeight = y),
        (v.granularity = p),
        (v.stRotation = l),
        (v.rotation = u),
        (v.semiMajorAxis = o),
        (v.semiMinorAxis = s),
        (v.shadowVolume = c),
        (v.offsetAttribute = -1 === t ? void 0 : t),
        new g(v));
  }),
    (g.computeRectangle = function (e, t) {
      var r = (e = L.defaultValue(e, L.defaultValue.EMPTY_OBJECT)).center,
        a = L.defaultValue(e.ellipsoid, R.Ellipsoid.WGS84),
        i = e.semiMajorAxis,
        n = e.semiMinorAxis,
        o = L.defaultValue(e.granularity, p.CesiumMath.RADIANS_PER_DEGREE);
      return s(r, i, n, L.defaultValue(e.rotation, 0), o, a, t);
    }),
    (g.createGeometry = function (e) {
      if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
        var t = e._height,
          r = e._extrudedHeight,
          a = !p.CesiumMath.equalsEpsilon(t, r, 0, p.CesiumMath.EPSILON2);
        e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center);
        var i,
          t = {
            center: e._center,
            semiMajorAxis: e._semiMajorAxis,
            semiMinorAxis: e._semiMinorAxis,
            ellipsoid: e._ellipsoid,
            rotation: e._rotation,
            height: t,
            granularity: e._granularity,
            vertexFormat: e._vertexFormat,
            stRotation: e._stRotation,
          };
        return (
          a
            ? ((t.extrudedHeight = r),
              (t.shadowVolume = e._shadowVolume),
              (t.offsetAttribute = e._offsetAttribute),
              (i = o(t)))
            : ((i = (function (e) {
                var t = e.center;
                (n = R.Cartesian3.multiplyByScalar(
                  e.ellipsoid.geodeticSurfaceNormal(t, n),
                  e.height,
                  n
                )),
                  (n = R.Cartesian3.add(t, n, n));
                var r = new j.BoundingSphere(n, e.semiMajorAxis),
                  t = (a = H.EllipseGeometryLibrary.computeEllipsePositions(
                    e,
                    !0,
                    !1
                  )).positions,
                  a = a.numPts,
                  e = f(t, e, !1),
                  a = A(a);
                return {
                  boundingSphere: r,
                  attributes: e,
                  indices: (a = y.IndexDatatype.createTypedArray(
                    t.length / 3,
                    a
                  )),
                };
              })(t)),
              L.defined(e._offsetAttribute) &&
                ((r = i.attributes.position.values.length),
                (t = new Uint8Array(r / 3)),
                (r =
                  e._offsetAttribute === Y.GeometryOffsetAttribute.NONE
                    ? 0
                    : 1),
                Y.arrayFill(t, r),
                (i.attributes.applyOffset = new z.GeometryAttribute({
                  componentDatatype: k.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: t,
                })))),
          new z.Geometry({
            attributes: i.attributes,
            indices: i.indices,
            primitiveType: z.PrimitiveType.TRIANGLES,
            boundingSphere: i.boundingSphere,
            offsetAttribute: e._offsetAttribute,
          })
        );
      }
    }),
    (g.createShadowVolume = function (e, t, r) {
      var a = e._granularity,
        i = e._ellipsoid,
        t = t(a, i),
        r = r(a, i);
      return new g({
        center: e._center,
        semiMajorAxis: e._semiMajorAxis,
        semiMinorAxis: e._semiMinorAxis,
        ellipsoid: i,
        rotation: e._rotation,
        stRotation: e._stRotation,
        granularity: a,
        extrudedHeight: t,
        height: r,
        vertexFormat: d.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
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
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            L.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                var t = -e._stRotation;
                if (0 == t) return [0, 0, 0, 1, 1, 0];
                for (
                  var r = H.EllipseGeometryLibrary.computeEllipsePositions(
                      {
                        center: e._center,
                        semiMajorAxis: e._semiMajorAxis,
                        semiMinorAxis: e._semiMinorAxis,
                        rotation: e._rotation,
                        granularity: e._granularity,
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
                  i[n] = R.Cartesian3.fromArray(r, 3 * n);
                var o = e._ellipsoid,
                  e = e.rectangle;
                return z.Geometry._textureCoordinateRotationPoints(i, t, o, e);
              })(this)),
            this._textureCoordinateRotationPoints
          );
        },
      },
    }),
    (e.EllipseGeometry = g);
});