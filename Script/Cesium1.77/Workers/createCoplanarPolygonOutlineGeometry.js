define([
  "./when-cbf8cd21",
  "./Check-35e1a91d",
  "./Math-e66fad2a",
  "./Cartesian2-ec968a07",
  "./Transforms-a4b96eff",
  "./RuntimeError-f4c64df1",
  "./WebGLConstants-95ceb4e9",
  "./ComponentDatatype-7ee14e67",
  "./GeometryAttribute-3827e3e2",
  "./GeometryAttributes-90846c5f",
  "./AttributeCompression-322f5984",
  "./GeometryPipeline-4cf8286d",
  "./EncodedCartesian3-5919d11a",
  "./IndexDatatype-66caba23",
  "./IntersectionTests-ea61529d",
  "./Plane-5f5ff4d5",
  "./GeometryInstance-b75d9687",
  "./arrayRemoveDuplicates-b817241d",
  "./EllipsoidTangentPlane-174b31fd",
  "./OrientedBoundingBox-1970b4e5",
  "./CoplanarPolygonGeometryLibrary-e4e4cdce",
  "./ArcType-2b58731c",
  "./EllipsoidRhumbLine-b20ca662",
  "./PolygonPipeline-db729244",
  "./PolygonGeometryLibrary-8925571d",
], function (
  o,
  e,
  t,
  a,
  y,
  r,
  n,
  c,
  p,
  s,
  i,
  l,
  u,
  d,
  m,
  f,
  g,
  b,
  h,
  P,
  G,
  v,
  L,
  C,
  T
) {
  "use strict";
  function E(e) {
    e = (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT)).polygonHierarchy;
    (this._polygonHierarchy = e),
      (this._workerName = "createCoplanarPolygonOutlineGeometry"),
      (this.packedLength =
        T.PolygonGeometryLibrary.computeHierarchyPackedLength(e) + 1);
  }
  (E.fromPositions = function (e) {
    return new E({
      polygonHierarchy: {
        positions: (e = o.defaultValue(e, o.defaultValue.EMPTY_OBJECT))
          .positions,
      },
    });
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
      );
    });
  var k = { polygonHierarchy: {} };
  return (
    (E.unpack = function (e, t, r) {
      t = o.defaultValue(t, 0);
      var n = T.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t);
      (t = n.startingIndex), delete n.startingIndex;
      t = e[t];
      return (
        o.defined(r) || (r = new E(k)),
        (r._polygonHierarchy = n),
        (r.packedLength = t),
        r
      );
    }),
    (E.createGeometry = function (e) {
      var t = e._polygonHierarchy,
        e = t.positions,
        e = b.arrayRemoveDuplicates(e, a.Cartesian3.equalsEpsilon, !0);
      if (!(e.length < 3) && G.CoplanarPolygonGeometryLibrary.validOutline(e)) {
        var r = T.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t, !1);
        if (0 !== r.length) {
          for (var n = [], o = 0; o < r.length; o++) {
            var i = new g.GeometryInstance({
              geometry: (function (e) {
                for (
                  var t = e.length,
                    r = new Float64Array(3 * t),
                    n = d.IndexDatatype.createTypedArray(t, 2 * t),
                    o = 0,
                    i = 0,
                    a = 0;
                  a < t;
                  a++
                ) {
                  var y = e[a];
                  (r[o++] = y.x),
                    (r[o++] = y.y),
                    (r[o++] = y.z),
                    (n[i++] = a),
                    (n[i++] = (a + 1) % t);
                }
                var l = new s.GeometryAttributes({
                  position: new p.GeometryAttribute({
                    componentDatatype: c.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: r,
                  }),
                });
                return new p.Geometry({
                  attributes: l,
                  indices: n,
                  primitiveType: p.PrimitiveType.LINES,
                });
              })(r[o]),
            });
            n.push(i);
          }
          (e = l.GeometryPipeline.combineInstances(n)[0]),
            (t = y.BoundingSphere.fromPoints(t.positions));
          return new p.Geometry({
            attributes: e.attributes,
            indices: e.indices,
            primitiveType: e.primitiveType,
            boundingSphere: t,
          });
        }
      }
    }),
    function (e, t) {
      return (
        o.defined(t) && (e = E.unpack(e, t)),
        (e._ellipsoid = a.Ellipsoid.clone(e._ellipsoid)),
        E.createGeometry(e)
      );
    }
  );
});
