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
  './AttributeCompression-9fc99391',
  './GeometryPipeline-e6a15a43',
  './EncodedCartesian3-4df2eabb',
  './IndexDatatype-53503fee',
  './IntersectionTests-7f3bcd5c',
  './Plane-b6058d9b',
  './GeometryOffsetAttribute-7350d9af',
  './VertexFormat-7572c785',
  './GeometryInstance-bee96382',
  './arrayRemoveDuplicates-ebc732b0',
  './BoundingRectangle-4f9baeda',
  './EllipsoidTangentPlane-c3f203b0',
  './ArcType-dc1c5aee',
  './EllipsoidRhumbLine-c704bf4c',
  './PolygonPipeline-1aceedbc',
  './PolygonGeometryLibrary-82c2c5a4',
  './EllipsoidGeodesic-30fae80b',
], function (
  z,
  e,
  W,
  Y,
  U,
  t,
  r,
  j,
  Q,
  o,
  a,
  A,
  i,
  E,
  n,
  s,
  q,
  f,
  G,
  l,
  u,
  O,
  p,
  c,
  V,
  F,
  y
) {
  'use strict'
  var K = new Y.Cartographic(),
    Z = new Y.Cartographic()
  var D = new u.BoundingRectangle(),
    J = new Y.Cartesian3(),
    X = new Y.Cartesian3(),
    $ = new Y.Cartesian3(),
    ee = new Y.Cartesian3(),
    te = new Y.Cartesian3(),
    re = new Y.Cartesian3(),
    oe = new Y.Cartesian3(),
    ae = new Y.Cartesian3(),
    ie = new Y.Cartesian3(),
    ne = new Y.Cartesian2(),
    se = new Y.Cartesian2(),
    le = new Y.Cartesian3(),
    ue = new U.Quaternion(),
    ce = new U.Matrix3(),
    pe = new U.Matrix3()
  function L(e) {
    var t,
      r = e.vertexFormat,
      o = e.geometry,
      a = e.shadowVolume,
      i = o.attributes.position.values,
      n = i.length,
      s = e.wall,
      l = e.top || s,
      u = e.bottom || s
    if (r.st || r.normal || r.tangent || r.bitangent || a) {
      var c = e.boundingRectangle,
        p = e.tangentPlane,
        y = e.ellipsoid,
        m = e.stRotation,
        g = e.perPositionHeight,
        d = ne
      ;(d.x = c.x), (d.y = c.y)
      var h,
        f = r.st ? new Float32Array((n / 3) * 2) : void 0
      r.normal &&
        (h = g && l && !s ? o.attributes.normal.values : new Float32Array(n))
      var b,
        _ = r.tangent ? new Float32Array(n) : void 0,
        v = r.bitangent ? new Float32Array(n) : void 0,
        P = a ? new Float32Array(n) : void 0,
        C = 0,
        w = 0,
        x = X,
        T = $,
        I = ee,
        A = !0,
        E = ce,
        G = pe
      G =
        0 !== m
          ? ((b = U.Quaternion.fromAxisAngle(p._plane.normal, m, ue)),
            (E = U.Matrix3.fromQuaternion(b, E)),
            (b = U.Quaternion.fromAxisAngle(p._plane.normal, -m, ue)),
            U.Matrix3.fromQuaternion(b, G))
          : ((E = U.Matrix3.clone(U.Matrix3.IDENTITY, E)),
            U.Matrix3.clone(U.Matrix3.IDENTITY, G))
      var O = 0,
        V = 0
      l && u && ((O = n / 2), (V = n / 3), (n /= 2))
      for (var F = 0; F < n; F += 3) {
        var D,
          L,
          N,
          H,
          R,
          M,
          S,
          B,
          k = Y.Cartesian3.fromArray(i, F, le)
        r.st &&
          ((D = U.Matrix3.multiplyByVector(E, k, J)),
          (D = y.scaleToGeodeticSurface(D, D)),
          (L = p.projectPointOntoPlane(D, se)),
          Y.Cartesian2.subtract(L, d, L),
          (N = W.CesiumMath.clamp(L.x / c.width, 0, 1)),
          (H = W.CesiumMath.clamp(L.y / c.height, 0, 1)),
          u && ((f[C + V] = N), (f[C + 1 + V] = H)),
          l && ((f[C] = N), (f[C + 1] = H)),
          (C += 2)),
          (r.normal || r.tangent || r.bitangent || a) &&
            ((R = w + 1),
            (M = w + 2),
            s
              ? (F + 3 < n &&
                  ((S = Y.Cartesian3.fromArray(i, F + 3, te)),
                  A &&
                    ((B = Y.Cartesian3.fromArray(i, F + n, re)),
                    g &&
                      ((t = k),
                      (D = S),
                      (L = B),
                      (N = void 0),
                      (N = (H = y).cartesianToCartographic(t, K).height),
                      ((t = H.cartesianToCartographic(D, Z)).height = N),
                      H.cartographicToCartesian(t, D),
                      ((D = H.cartesianToCartographic(L, Z)).height = N - 100),
                      H.cartographicToCartesian(D, L)),
                    Y.Cartesian3.subtract(S, k, S),
                    Y.Cartesian3.subtract(B, k, B),
                    (x = Y.Cartesian3.normalize(
                      Y.Cartesian3.cross(B, S, x),
                      x
                    )),
                    (A = !1)),
                  Y.Cartesian3.equalsEpsilon(S, k, W.CesiumMath.EPSILON10) &&
                    (A = !0)),
                (r.tangent || r.bitangent) &&
                  ((I = y.geodeticSurfaceNormal(k, I)),
                  r.tangent &&
                    (T = Y.Cartesian3.normalize(
                      Y.Cartesian3.cross(I, x, T),
                      T
                    ))))
              : ((x = y.geodeticSurfaceNormal(k, x)),
                (r.tangent || r.bitangent) &&
                  (g &&
                    ((oe = Y.Cartesian3.fromArray(h, w, oe)),
                    (ae = Y.Cartesian3.cross(Y.Cartesian3.UNIT_Z, oe, ae)),
                    (ae = Y.Cartesian3.normalize(
                      U.Matrix3.multiplyByVector(G, ae, ae),
                      ae
                    )),
                    r.bitangent &&
                      (ie = Y.Cartesian3.normalize(
                        Y.Cartesian3.cross(oe, ae, ie),
                        ie
                      ))),
                  (T = Y.Cartesian3.cross(Y.Cartesian3.UNIT_Z, x, T)),
                  (T = Y.Cartesian3.normalize(
                    U.Matrix3.multiplyByVector(G, T, T),
                    T
                  )),
                  r.bitangent &&
                    (I = Y.Cartesian3.normalize(
                      Y.Cartesian3.cross(x, T, I),
                      I
                    )))),
            r.normal &&
              (e.wall
                ? ((h[w + O] = x.x), (h[R + O] = x.y), (h[M + O] = x.z))
                : u &&
                  ((h[w + O] = -x.x), (h[R + O] = -x.y), (h[M + O] = -x.z)),
              ((l && !g) || s) && ((h[w] = x.x), (h[R] = x.y), (h[M] = x.z))),
            a &&
              (s && (x = y.geodeticSurfaceNormal(k, x)),
              (P[w + O] = -x.x),
              (P[R + O] = -x.y),
              (P[M + O] = -x.z)),
            r.tangent &&
              (e.wall
                ? ((_[w + O] = T.x), (_[R + O] = T.y), (_[M + O] = T.z))
                : u &&
                  ((_[w + O] = -T.x), (_[R + O] = -T.y), (_[M + O] = -T.z)),
              l &&
                (g
                  ? ((_[w] = ae.x), (_[R] = ae.y), (_[M] = ae.z))
                  : ((_[w] = T.x), (_[R] = T.y), (_[M] = T.z)))),
            r.bitangent &&
              (u && ((v[w + O] = I.x), (v[R + O] = I.y), (v[M + O] = I.z)),
              l &&
                (g
                  ? ((v[w] = ie.x), (v[R] = ie.y), (v[M] = ie.z))
                  : ((v[w] = I.x), (v[R] = I.y), (v[M] = I.z)))),
            (w += 3))
      }
      r.st &&
        (o.attributes.st = new Q.GeometryAttribute({
          componentDatatype: j.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: f,
        })),
        r.normal &&
          (o.attributes.normal = new Q.GeometryAttribute({
            componentDatatype: j.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: h,
          })),
        r.tangent &&
          (o.attributes.tangent = new Q.GeometryAttribute({
            componentDatatype: j.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: _,
          })),
        r.bitangent &&
          (o.attributes.bitangent = new Q.GeometryAttribute({
            componentDatatype: j.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: v,
          })),
        a &&
          (o.attributes.extrudeDirection = new Q.GeometryAttribute({
            componentDatatype: j.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: P,
          }))
    }
    return (
      e.extrude &&
        z.defined(e.offsetAttribute) &&
        ((m = i.length / 3),
        (b = new Uint8Array(m)),
        e.offsetAttribute === q.GeometryOffsetAttribute.TOP
          ? (l && u) || s
            ? (b = q.arrayFill(b, 1, 0, m / 2))
            : l && (b = q.arrayFill(b, 1))
          : ((m = e.offsetAttribute === q.GeometryOffsetAttribute.NONE ? 0 : 1),
            (b = q.arrayFill(b, m))),
        (o.attributes.applyOffset = new Q.GeometryAttribute({
          componentDatatype: j.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: b,
        }))),
      o
    )
  }
  var m = new Y.Cartographic(),
    g = new Y.Cartographic(),
    d = { westOverIDL: 0, eastOverIDL: 0 },
    h = new y.EllipsoidGeodesic()
  function b(e, t, r, o, a) {
    if (
      ((a = z.defaultValue(a, new Y.Rectangle())),
      !z.defined(e) || e.length < 3)
    )
      return (a.west = 0), (a.north = 0), (a.south = 0), (a.east = 0), a
    if (r === p.ArcType.RHUMB) return Y.Rectangle.fromCartesianArray(e, t, a)
    h.ellipsoid.equals(t) || (h = new y.EllipsoidGeodesic(void 0, void 0, t)),
      (a.west = Number.POSITIVE_INFINITY),
      (a.east = Number.NEGATIVE_INFINITY),
      (a.south = Number.POSITIVE_INFINITY),
      (a.north = Number.NEGATIVE_INFINITY),
      (d.westOverIDL = Number.POSITIVE_INFINITY),
      (d.eastOverIDL = Number.NEGATIVE_INFINITY)
    for (
      var i,
        n = 1 / W.CesiumMath.chordLength(o, t.maximumRadius),
        s = e.length,
        l = t.cartesianToCartographic(e[0], g),
        u = m,
        c = 1;
      c < s;
      c++
    )
      (i = u),
        (u = l),
        (l = t.cartesianToCartographic(e[c], i)),
        h.setEndPoints(u, l),
        v(h, n, a, d)
    return (
      (i = u),
      (u = l),
      (l = t.cartesianToCartographic(e[0], i)),
      h.setEndPoints(u, l),
      v(h, n, a, d),
      a.east - a.west > d.eastOverIDL - d.westOverIDL &&
        ((a.west = d.westOverIDL),
        (a.east = d.eastOverIDL),
        a.east > W.CesiumMath.PI && (a.east = a.east - W.CesiumMath.TWO_PI),
        a.west > W.CesiumMath.PI && (a.west = a.west - W.CesiumMath.TWO_PI)),
      a
    )
  }
  var _ = new Y.Cartographic()
  function v(e, t, r, o) {
    for (
      var a = e.surfaceDistance,
        i = Math.ceil(a * t),
        n = 0 < i ? a / (i - 1) : Number.POSITIVE_INFINITY,
        s = 0,
        l = 0;
      l < i;
      l++
    ) {
      var u = e.interpolateUsingSurfaceDistance(s, _)
      s += n
      var c = u.longitude,
        u = u.latitude
      ;(r.west = Math.min(r.west, c)),
        (r.east = Math.max(r.east, c)),
        (r.south = Math.min(r.south, u)),
        (r.north = Math.max(r.north, u))
      c = 0 <= c ? c : c + W.CesiumMath.TWO_PI
      ;(o.westOverIDL = Math.min(o.westOverIDL, c)),
        (o.eastOverIDL = Math.max(o.eastOverIDL, c))
    }
  }
  var N = []
  function P(e) {
    var t,
      r = e.polygonHierarchy,
      o = z.defaultValue(e.vertexFormat, f.VertexFormat.DEFAULT),
      a = z.defaultValue(e.ellipsoid, Y.Ellipsoid.WGS84),
      i = z.defaultValue(e.granularity, W.CesiumMath.RADIANS_PER_DEGREE),
      n = z.defaultValue(e.stRotation, 0),
      s = z.defaultValue(e.perPositionHeight, !1),
      l = s && z.defined(e.extrudedHeight),
      u = z.defaultValue(e.height, 0),
      c = z.defaultValue(e.extrudedHeight, u)
    l || ((t = Math.max(u, c)), (c = Math.min(u, c)), (u = t)),
      (this._vertexFormat = f.VertexFormat.clone(o)),
      (this._ellipsoid = Y.Ellipsoid.clone(a)),
      (this._granularity = i),
      (this._stRotation = n),
      (this._height = u),
      (this._extrudedHeight = c),
      (this._closeTop = z.defaultValue(e.closeTop, !0)),
      (this._closeBottom = z.defaultValue(e.closeBottom, !0)),
      (this._polygonHierarchy = r),
      (this._perPositionHeight = s),
      (this._perPositionHeightExtrude = l),
      (this._shadowVolume = z.defaultValue(e.shadowVolume, !1)),
      (this._workerName = 'createPolygonGeometry'),
      (this._offsetAttribute = e.offsetAttribute),
      (this._arcType = z.defaultValue(e.arcType, p.ArcType.GEODESIC)),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0),
      (this.packedLength =
        F.PolygonGeometryLibrary.computeHierarchyPackedLength(r) +
        Y.Ellipsoid.packedLength +
        f.VertexFormat.packedLength +
        12)
  }
  ;(P.fromPositions = function (e) {
    return new P({
      polygonHierarchy: {
        positions: (e = z.defaultValue(e, z.defaultValue.EMPTY_OBJECT))
          .positions,
      },
      height: e.height,
      extrudedHeight: e.extrudedHeight,
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      ellipsoid: e.ellipsoid,
      granularity: e.granularity,
      perPositionHeight: e.perPositionHeight,
      closeTop: e.closeTop,
      closeBottom: e.closeBottom,
      offsetAttribute: e.offsetAttribute,
      arcType: e.arcType,
    })
  }),
    (P.pack = function (e, t, r) {
      return (
        (r = z.defaultValue(r, 0)),
        (r = F.PolygonGeometryLibrary.packPolygonHierarchy(
          e._polygonHierarchy,
          t,
          r
        )),
        Y.Ellipsoid.pack(e._ellipsoid, t, r),
        (r += Y.Ellipsoid.packedLength),
        f.VertexFormat.pack(e._vertexFormat, t, r),
        (r += f.VertexFormat.packedLength),
        (t[r++] = e._height),
        (t[r++] = e._extrudedHeight),
        (t[r++] = e._granularity),
        (t[r++] = e._stRotation),
        (t[r++] = e._perPositionHeightExtrude ? 1 : 0),
        (t[r++] = e._perPositionHeight ? 1 : 0),
        (t[r++] = e._closeTop ? 1 : 0),
        (t[r++] = e._closeBottom ? 1 : 0),
        (t[r++] = e._shadowVolume ? 1 : 0),
        (t[r++] = z.defaultValue(e._offsetAttribute, -1)),
        (t[r++] = e._arcType),
        (t[r] = e.packedLength),
        t
      )
    })
  var C = Y.Ellipsoid.clone(Y.Ellipsoid.UNIT_SPHERE),
    w = new f.VertexFormat(),
    x = { polygonHierarchy: {} }
  return (
    (P.unpack = function (e, t, r) {
      t = z.defaultValue(t, 0)
      var o = F.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t)
      ;(t = o.startingIndex), delete o.startingIndex
      var a = Y.Ellipsoid.unpack(e, t, C)
      t += Y.Ellipsoid.packedLength
      var i = f.VertexFormat.unpack(e, t, w)
      t += f.VertexFormat.packedLength
      var n = e[t++],
        s = e[t++],
        l = e[t++],
        u = e[t++],
        c = 1 === e[t++],
        p = 1 === e[t++],
        y = 1 === e[t++],
        m = 1 === e[t++],
        g = 1 === e[t++],
        d = e[t++],
        h = e[t++],
        t = e[t]
      return (
        z.defined(r) || (r = new P(x)),
        (r._polygonHierarchy = o),
        (r._ellipsoid = Y.Ellipsoid.clone(a, r._ellipsoid)),
        (r._vertexFormat = f.VertexFormat.clone(i, r._vertexFormat)),
        (r._height = n),
        (r._extrudedHeight = s),
        (r._granularity = l),
        (r._stRotation = u),
        (r._perPositionHeightExtrude = c),
        (r._perPositionHeight = p),
        (r._closeTop = y),
        (r._closeBottom = m),
        (r._shadowVolume = g),
        (r._offsetAttribute = -1 === d ? void 0 : d),
        (r._arcType = h),
        (r.packedLength = t),
        r
      )
    }),
    (P.computeRectangle = function (e, t) {
      var r = z.defaultValue(e.granularity, W.CesiumMath.RADIANS_PER_DEGREE),
        o = z.defaultValue(e.arcType, p.ArcType.GEODESIC),
        a = e.polygonHierarchy,
        e = z.defaultValue(e.ellipsoid, Y.Ellipsoid.WGS84)
      return b(a.positions, e, o, r, t)
    }),
    (P.createGeometry = function (e) {
      var t = e._vertexFormat,
        r = e._ellipsoid,
        o = e._granularity,
        a = e._stRotation,
        i = e._polygonHierarchy,
        n = e._perPositionHeight,
        s = e._closeTop,
        l = e._closeBottom,
        u = e._arcType,
        c = i.positions
      if (!(c.length < 3)) {
        var p = O.EllipsoidTangentPlane.fromPoints(c, r),
          i = F.PolygonGeometryLibrary.polygonsFromHierarchy(
            i,
            p.projectPointsOntoPlane.bind(p),
            !n,
            r
          ),
          y = i.hierarchy,
          m = i.polygons
        if (0 !== y.length) {
          c = y[0].outerRing
          var g,
            c = F.PolygonGeometryLibrary.computeBoundingRectangle(
              p.plane.normal,
              p.projectPointOntoPlane.bind(p),
              c,
              a,
              D
            ),
            d = [],
            h = e._height,
            f = e._extrudedHeight,
            b = {
              perPositionHeight: n,
              vertexFormat: t,
              geometry: void 0,
              tangentPlane: p,
              boundingRectangle: c,
              ellipsoid: r,
              stRotation: a,
              bottom: !1,
              top: !0,
              wall: !1,
              extrude: !1,
              arcType: u,
            }
          if (
            e._perPositionHeightExtrude ||
            !W.CesiumMath.equalsEpsilon(h, f, 0, W.CesiumMath.EPSILON2)
          )
            for (
              b.extrude = !0,
                b.top = s,
                b.bottom = l,
                b.shadowVolume = e._shadowVolume,
                b.offsetAttribute = e._offsetAttribute,
                g = 0;
              g < m.length;
              g++
            ) {
              var _,
                v = (function (e, t, r, o, a, i, n, s, l) {
                  var u = { walls: [] }
                  if (i || n) {
                    var c = F.PolygonGeometryLibrary.createGeometryFromPositions(
                        e,
                        t,
                        r,
                        a,
                        s,
                        l
                      ),
                      t = c.attributes.position.values,
                      p = c.indices
                    if (i && n) {
                      var y,
                        i = t.concat(t),
                        m = i.length / 3
                      ;(y = E.IndexDatatype.createTypedArray(
                        m,
                        2 * p.length
                      )).set(p)
                      for (var g = p.length, d = m / 2, h = 0; h < g; h += 3) {
                        var f = y[h] + d,
                          b = y[h + 1] + d,
                          _ = y[h + 2] + d
                        ;(y[h + g] = _), (y[h + 1 + g] = b), (y[h + 2 + g] = f)
                      }
                      ;(c.attributes.position.values = i),
                        a &&
                          s.normal &&
                          ((s = c.attributes.normal.values),
                          (c.attributes.normal.values = new Float32Array(
                            i.length
                          )),
                          c.attributes.normal.values.set(s)),
                        (c.indices = y)
                    } else if (n) {
                      for (
                        m = t.length / 3,
                          y = E.IndexDatatype.createTypedArray(m, p.length),
                          h = 0;
                        h < p.length;
                        h += 3
                      )
                        (y[h] = p[h + 2]),
                          (y[h + 1] = p[h + 1]),
                          (y[h + 2] = p[h])
                      c.indices = y
                    }
                    u.topAndBottom = new G.GeometryInstance({ geometry: c })
                  }
                  var c = o.outerRing,
                    v = O.EllipsoidTangentPlane.fromPoints(
                      c,
                      e
                    ).projectPointsOntoPlane(c, N)
                  V.PolygonPipeline.computeWindingOrder2D(v) ===
                    V.WindingOrder.CLOCKWISE && (c = c.slice().reverse())
                  var P = F.PolygonGeometryLibrary.computeWallGeometry(
                    c,
                    e,
                    r,
                    a,
                    l
                  )
                  u.walls.push(new G.GeometryInstance({ geometry: P }))
                  var C = o.holes
                  for (h = 0; h < C.length; h++) {
                    var w = C[h],
                      v = O.EllipsoidTangentPlane.fromPoints(
                        w,
                        e
                      ).projectPointsOntoPlane(w, N)
                    V.PolygonPipeline.computeWindingOrder2D(v) ===
                      V.WindingOrder.COUNTER_CLOCKWISE &&
                      (w = w.slice().reverse()),
                      (P = F.PolygonGeometryLibrary.computeWallGeometry(
                        w,
                        e,
                        r,
                        a,
                        l
                      )),
                      u.walls.push(new G.GeometryInstance({ geometry: P }))
                  }
                  return u
                })(r, m[g], o, y[g], n, s, l, t, u)
              s && l
                ? ((_ = v.topAndBottom),
                  (b.geometry = F.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                    _.geometry,
                    h,
                    f,
                    r,
                    n
                  )))
                : s
                ? (((_ =
                    v.topAndBottom).geometry.attributes.position.values = V.PolygonPipeline.scaleToGeodeticHeight(
                    _.geometry.attributes.position.values,
                    h,
                    r,
                    !n
                  )),
                  (b.geometry = _.geometry))
                : l &&
                  (((_ =
                    v.topAndBottom).geometry.attributes.position.values = V.PolygonPipeline.scaleToGeodeticHeight(
                    _.geometry.attributes.position.values,
                    f,
                    r,
                    !0
                  )),
                  (b.geometry = _.geometry)),
                (s || l) && ((b.wall = !1), (_.geometry = L(b)), d.push(_))
              var P = v.walls
              b.wall = !0
              for (var C = 0; C < P.length; C++) {
                var w = P[C]
                ;(b.geometry = F.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                  w.geometry,
                  h,
                  f,
                  r,
                  n
                )),
                  (w.geometry = L(b)),
                  d.push(w)
              }
            }
          else
            for (g = 0; g < m.length; g++) {
              var x,
                T,
                I = new G.GeometryInstance({
                  geometry: F.PolygonGeometryLibrary.createGeometryFromPositions(
                    r,
                    m[g],
                    o,
                    n,
                    t,
                    u
                  ),
                })
              ;(I.geometry.attributes.position.values = V.PolygonPipeline.scaleToGeodeticHeight(
                I.geometry.attributes.position.values,
                h,
                r,
                !n
              )),
                (b.geometry = I.geometry),
                (I.geometry = L(b)),
                z.defined(e._offsetAttribute) &&
                  ((T = I.geometry.attributes.position.values.length),
                  (x = new Uint8Array(T / 3)),
                  (T =
                    e._offsetAttribute === q.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1),
                  q.arrayFill(x, T),
                  (I.geometry.attributes.applyOffset = new Q.GeometryAttribute({
                    componentDatatype: j.ComponentDatatype.UNSIGNED_BYTE,
                    componentsPerAttribute: 1,
                    values: x,
                  }))),
                d.push(I)
            }
          p = A.GeometryPipeline.combineInstances(d)[0]
          ;(p.attributes.position.values = new Float64Array(
            p.attributes.position.values
          )),
            (p.indices = E.IndexDatatype.createTypedArray(
              p.attributes.position.values.length / 3,
              p.indices
            ))
          ;(c = p.attributes),
            (a = U.BoundingSphere.fromVertices(c.position.values))
          return (
            t.position || delete c.position,
            new Q.Geometry({
              attributes: c,
              indices: p.indices,
              primitiveType: p.primitiveType,
              boundingSphere: a,
              offsetAttribute: e._offsetAttribute,
            })
          )
        }
      }
    }),
    (P.createShadowVolume = function (e, t, r) {
      var o = e._granularity,
        a = e._ellipsoid,
        t = t(o, a),
        r = r(o, a)
      return new P({
        polygonHierarchy: e._polygonHierarchy,
        ellipsoid: a,
        stRotation: e._stRotation,
        granularity: o,
        perPositionHeight: !1,
        extrudedHeight: t,
        height: r,
        vertexFormat: f.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
        arcType: e._arcType,
      })
    }),
    Object.defineProperties(P.prototype, {
      rectangle: {
        get: function () {
          var e
          return (
            z.defined(this._rectangle) ||
              ((e = this._polygonHierarchy.positions),
              (this._rectangle = b(
                e,
                this._ellipsoid,
                this._arcType,
                this._granularity
              ))),
            this._rectangle
          )
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            z.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                var t = -e._stRotation
                if (0 == t) return [0, 0, 0, 1, 1, 0]
                var r = e._ellipsoid,
                  o = e._polygonHierarchy.positions,
                  e = e.rectangle
                return Q.Geometry._textureCoordinateRotationPoints(o, t, r, e)
              })(this)),
            this._textureCoordinateRotationPoints
          )
        },
      },
    }),
    function (e, t) {
      return (
        z.defined(t) && (e = P.unpack(e, t)),
        (e._ellipsoid = Y.Ellipsoid.clone(e._ellipsoid)),
        P.createGeometry(e)
      )
    }
  )
})
