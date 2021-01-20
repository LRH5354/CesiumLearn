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
  './VertexFormat-7572c785',
  './GeometryInstance-bee96382',
  './arrayRemoveDuplicates-ebc732b0',
  './BoundingRectangle-4f9baeda',
  './EllipsoidTangentPlane-c3f203b0',
  './OrientedBoundingBox-b5830afd',
  './CoplanarPolygonGeometryLibrary-5c5e85b0',
  './ArcType-dc1c5aee',
  './EllipsoidRhumbLine-c704bf4c',
  './PolygonPipeline-1aceedbc',
  './PolygonGeometryLibrary-82c2c5a4',
], function (
  l,
  e,
  L,
  E,
  T,
  t,
  a,
  D,
  _,
  k,
  n,
  h,
  r,
  V,
  o,
  i,
  s,
  f,
  C,
  c,
  p,
  y,
  v,
  m,
  u,
  R,
  x
) {
  'use strict'
  var I = new E.Cartesian3(),
    P = new c.BoundingRectangle(),
    M = new E.Cartesian2(),
    H = new E.Cartesian2(),
    w = new E.Cartesian3(),
    A = new E.Cartesian3(),
    F = new E.Cartesian3(),
    G = new E.Cartesian3(),
    B = new E.Cartesian3(),
    O = new E.Cartesian3(),
    z = new T.Quaternion(),
    S = new T.Matrix3(),
    N = new T.Matrix3(),
    Q = new E.Cartesian3()
  function d(e) {
    var t = (e = l.defaultValue(e, l.defaultValue.EMPTY_OBJECT))
        .polygonHierarchy,
      a = l.defaultValue(e.vertexFormat, s.VertexFormat.DEFAULT)
    ;(this._vertexFormat = s.VertexFormat.clone(a)),
      (this._polygonHierarchy = t),
      (this._stRotation = l.defaultValue(e.stRotation, 0)),
      (this._ellipsoid = E.Ellipsoid.clone(
        l.defaultValue(e.ellipsoid, E.Ellipsoid.WGS84)
      )),
      (this._workerName = 'createCoplanarPolygonGeometry'),
      (this.packedLength =
        x.PolygonGeometryLibrary.computeHierarchyPackedLength(t) +
        s.VertexFormat.packedLength +
        E.Ellipsoid.packedLength +
        2)
  }
  ;(d.fromPositions = function (e) {
    return new d({
      polygonHierarchy: {
        positions: (e = l.defaultValue(e, l.defaultValue.EMPTY_OBJECT))
          .positions,
      },
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      ellipsoid: e.ellipsoid,
    })
  }),
    (d.pack = function (e, t, a) {
      return (
        (a = l.defaultValue(a, 0)),
        (a = x.PolygonGeometryLibrary.packPolygonHierarchy(
          e._polygonHierarchy,
          t,
          a
        )),
        E.Ellipsoid.pack(e._ellipsoid, t, a),
        (a += E.Ellipsoid.packedLength),
        s.VertexFormat.pack(e._vertexFormat, t, a),
        (a += s.VertexFormat.packedLength),
        (t[a++] = e._stRotation),
        (t[a] = e.packedLength),
        t
      )
    })
  var g = E.Ellipsoid.clone(E.Ellipsoid.UNIT_SPHERE),
    b = new s.VertexFormat(),
    j = { polygonHierarchy: {} }
  return (
    (d.unpack = function (e, t, a) {
      t = l.defaultValue(t, 0)
      var n = x.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t)
      ;(t = n.startingIndex), delete n.startingIndex
      var r = E.Ellipsoid.unpack(e, t, g)
      t += E.Ellipsoid.packedLength
      var o = s.VertexFormat.unpack(e, t, b)
      t += s.VertexFormat.packedLength
      var i = e[t++],
        t = e[t]
      return (
        l.defined(a) || (a = new d(j)),
        (a._polygonHierarchy = n),
        (a._ellipsoid = E.Ellipsoid.clone(r, a._ellipsoid)),
        (a._vertexFormat = s.VertexFormat.clone(o, a._vertexFormat)),
        (a._stRotation = i),
        (a.packedLength = t),
        a
      )
    }),
    (d.createGeometry = function (e) {
      var t = e._vertexFormat,
        a = e._polygonHierarchy,
        n = e._stRotation,
        r = a.positions
      if (
        !(
          (r = C.arrayRemoveDuplicates(r, E.Cartesian3.equalsEpsilon, !0))
            .length < 3
        )
      ) {
        var o = w,
          i = A,
          l = F,
          s = B,
          c = O
        if (
          v.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(
            r,
            G,
            s,
            c
          )
        ) {
          o = E.Cartesian3.cross(s, c, o)
          ;(o = E.Cartesian3.normalize(o, o)),
            E.Cartesian3.equalsEpsilon(
              G,
              E.Cartesian3.ZERO,
              L.CesiumMath.EPSILON6
            ) ||
              ((p = e._ellipsoid.geodeticSurfaceNormal(G, Q)),
              E.Cartesian3.dot(o, p) < 0 &&
                ((o = E.Cartesian3.negate(o, o)),
                (s = E.Cartesian3.negate(s, s))))
          var p = v.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(
              G,
              s,
              c
            ),
            y = v.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(
              G,
              s,
              c
            )
          t.tangent && (i = E.Cartesian3.clone(s, i)),
            t.bitangent && (l = E.Cartesian3.clone(c, l))
          var a = x.PolygonGeometryLibrary.polygonsFromHierarchy(a, p, !1),
            p = a.hierarchy,
            m = a.polygons
          if (0 !== p.length) {
            r = p[0].outerRing
            for (
              var a = T.BoundingSphere.fromPoints(r),
                u = x.PolygonGeometryLibrary.computeBoundingRectangle(
                  o,
                  y,
                  r,
                  n,
                  P
                ),
                d = [],
                g = 0;
              g < m.length;
              g++
            ) {
              var b = new f.GeometryInstance({
                geometry: (function (e, t, a, n, r, o, i, l) {
                  var s = e.positions,
                    c = R.PolygonPipeline.triangulate(e.positions2D, e.holes)
                  c.length < 3 && (c = [0, 1, 2]),
                    (e = V.IndexDatatype.createTypedArray(
                      s.length,
                      c.length
                    )).set(c)
                  var p = S
                  0 !== n
                    ? ((c = T.Quaternion.fromAxisAngle(o, n, z)),
                      (p = T.Matrix3.fromQuaternion(c, p)),
                      (t.tangent || t.bitangent) &&
                        ((c = T.Quaternion.fromAxisAngle(o, -n, z)),
                        (u = T.Matrix3.fromQuaternion(c, N)),
                        (i = E.Cartesian3.normalize(
                          T.Matrix3.multiplyByVector(u, i, i),
                          i
                        )),
                        t.bitangent &&
                          (l = E.Cartesian3.normalize(
                            E.Cartesian3.cross(o, i, l),
                            l
                          ))))
                    : (p = T.Matrix3.clone(T.Matrix3.IDENTITY, p))
                  var y = H
                  t.st && ((y.x = a.x), (y.y = a.y))
                  for (
                    var m = s.length,
                      u = 3 * m,
                      d = new Float64Array(u),
                      g = t.normal ? new Float32Array(u) : void 0,
                      b = t.tangent ? new Float32Array(u) : void 0,
                      h = t.bitangent ? new Float32Array(u) : void 0,
                      f = t.st ? new Float32Array(2 * m) : void 0,
                      C = 0,
                      v = 0,
                      x = 0,
                      P = 0,
                      w = 0,
                      A = 0;
                    A < m;
                    A++
                  ) {
                    var F,
                      G = s[A]
                    ;(d[C++] = G.x),
                      (d[C++] = G.y),
                      (d[C++] = G.z),
                      t.st &&
                        ((F = r(T.Matrix3.multiplyByVector(p, G, I), M)),
                        E.Cartesian2.subtract(F, y, F),
                        (G = L.CesiumMath.clamp(F.x / a.width, 0, 1)),
                        (F = L.CesiumMath.clamp(F.y / a.height, 0, 1)),
                        (f[w++] = G),
                        (f[w++] = F)),
                      t.normal &&
                        ((g[v++] = o.x), (g[v++] = o.y), (g[v++] = o.z)),
                      t.tangent &&
                        ((b[P++] = i.x), (b[P++] = i.y), (b[P++] = i.z)),
                      t.bitangent &&
                        ((h[x++] = l.x), (h[x++] = l.y), (h[x++] = l.z))
                  }
                  return (
                    (u = new k.GeometryAttributes()),
                    t.position &&
                      (u.position = new _.GeometryAttribute({
                        componentDatatype: D.ComponentDatatype.DOUBLE,
                        componentsPerAttribute: 3,
                        values: d,
                      })),
                    t.normal &&
                      (u.normal = new _.GeometryAttribute({
                        componentDatatype: D.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: g,
                      })),
                    t.tangent &&
                      (u.tangent = new _.GeometryAttribute({
                        componentDatatype: D.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: b,
                      })),
                    t.bitangent &&
                      (u.bitangent = new _.GeometryAttribute({
                        componentDatatype: D.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: h,
                      })),
                    t.st &&
                      (u.st = new _.GeometryAttribute({
                        componentDatatype: D.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 2,
                        values: f,
                      })),
                    new _.Geometry({
                      attributes: u,
                      indices: e,
                      primitiveType: _.PrimitiveType.TRIANGLES,
                    })
                  )
                })(m[g], t, u, n, y, o, i, l),
              })
              d.push(b)
            }
            p = h.GeometryPipeline.combineInstances(d)[0]
            ;(p.attributes.position.values = new Float64Array(
              p.attributes.position.values
            )),
              (p.indices = V.IndexDatatype.createTypedArray(
                p.attributes.position.values.length / 3,
                p.indices
              ))
            r = p.attributes
            return (
              t.position || delete r.position,
              new _.Geometry({
                attributes: r,
                indices: p.indices,
                primitiveType: p.primitiveType,
                boundingSphere: a,
              })
            )
          }
        }
      }
    }),
    function (e, t) {
      return l.defined(t) && (e = d.unpack(e, t)), d.createGeometry(e)
    }
  )
})
