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
  './GeometryInstance-bee96382',
  './arrayRemoveDuplicates-ebc732b0',
  './EllipsoidTangentPlane-c3f203b0',
  './OrientedBoundingBox-b5830afd',
  './CoplanarPolygonGeometryLibrary-5c5e85b0',
  './ArcType-dc1c5aee',
  './EllipsoidRhumbLine-c704bf4c',
  './PolygonPipeline-1aceedbc',
  './PolygonGeometryLibrary-82c2c5a4',
], function (
  o,
  e,
  t,
  i,
  c,
  r,
  n,
  l,
  p,
  s,
  a,
  y,
  u,
  d,
  m,
  b,
  f,
  g,
  h,
  P,
  G,
  v,
  L,
  C,
  T
) {
  'use strict'
  function E(e) {
    e = (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT)).polygonHierarchy
    ;(this._polygonHierarchy = e),
      (this._workerName = 'createCoplanarPolygonOutlineGeometry'),
      (this.packedLength =
        T.PolygonGeometryLibrary.computeHierarchyPackedLength(e) + 1)
  }
  ;(E.fromPositions = function (e) {
    return new E({
      polygonHierarchy: {
        positions: (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT))
          .positions,
      },
    })
  }),
    (E.pack = function (e, t, r) {
      return (
        (r = o.defaultValue(r, 0)),
        (t[
          (r = T.PolygonGeometryLibrary.packPolygonHierarchy(
            e._polygonHierarchy,
            t,
            r
          ))
        ] = e.packedLength),
        t
      )
    })
  var k = { polygonHierarchy: {} }
  return (
    (E.unpack = function (e, t, r) {
      t = o.defaultValue(t, 0)
      var n = T.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t)
      ;(t = n.startingIndex), delete n.startingIndex
      t = e[t]
      return (
        o.defined(r) || (r = new E(k)),
        (r._polygonHierarchy = n),
        (r.packedLength = t),
        r
      )
    }),
    (E.createGeometry = function (e) {
      var t = e._polygonHierarchy,
        e = t.positions,
        e = g.arrayRemoveDuplicates(e, i.Cartesian3.equalsEpsilon, !0)
      if (!(e.length < 3) && G.CoplanarPolygonGeometryLibrary.validOutline(e)) {
        var r = T.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t, !1)
        if (0 !== r.length) {
          for (var n = [], o = 0; o < r.length; o++) {
            var a = new f.GeometryInstance({
              geometry: (function (e) {
                for (
                  var t = e.length,
                    r = new Float64Array(3 * t),
                    n = d.IndexDatatype.createTypedArray(t, 2 * t),
                    o = 0,
                    a = 0,
                    i = 0;
                  i < t;
                  i++
                ) {
                  var c = e[i]
                  ;(r[o++] = c.x),
                    (r[o++] = c.y),
                    (r[o++] = c.z),
                    (n[a++] = i),
                    (n[a++] = (i + 1) % t)
                }
                var y = new s.GeometryAttributes({
                  position: new p.GeometryAttribute({
                    componentDatatype: l.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: r,
                  }),
                })
                return new p.Geometry({
                  attributes: y,
                  indices: n,
                  primitiveType: p.PrimitiveType.LINES,
                })
              })(r[o]),
            })
            n.push(a)
          }
          ;(e = y.GeometryPipeline.combineInstances(n)[0]),
            (t = c.BoundingSphere.fromPoints(t.positions))
          return new p.Geometry({
            attributes: e.attributes,
            indices: e.indices,
            primitiveType: e.primitiveType,
            boundingSphere: t,
          })
        }
      }
    }),
    function (e, t) {
      return (
        o.defined(t) && (e = E.unpack(e, t)),
        (e._ellipsoid = i.Ellipsoid.clone(e._ellipsoid)),
        E.createGeometry(e)
      )
    }
  )
})