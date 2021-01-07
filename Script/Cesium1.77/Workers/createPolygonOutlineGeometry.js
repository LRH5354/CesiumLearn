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
  "./GeometryOffsetAttribute-84f7eff3",
  "./GeometryInstance-b75d9687",
  "./arrayRemoveDuplicates-b817241d",
  "./EllipsoidTangentPlane-174b31fd",
  "./ArcType-2b58731c",
  "./EllipsoidRhumbLine-b20ca662",
  "./PolygonPipeline-db729244",
  "./PolygonGeometryLibrary-8925571d",
], function (
  m,
  e,
  b,
  d,
  P,
  t,
  i,
  E,
  A,
  _,
  r,
  v,
  o,
  G,
  n,
  a,
  L,
  T,
  l,
  H,
  C,
  s,
  O,
  D
) {
  "use strict";
  var x = [],
    I = [];
  function f(e) {
    var t,
      i = e.polygonHierarchy,
      r = m.defaultValue(e.ellipsoid, d.Ellipsoid.WGS84),
      o = m.defaultValue(e.granularity, b.CesiumMath.RADIANS_PER_DEGREE),
      n = m.defaultValue(e.perPositionHeight, !1),
      a = n && m.defined(e.extrudedHeight),
      l = m.defaultValue(e.arcType, C.ArcType.GEODESIC),
      s = m.defaultValue(e.height, 0),
      y = m.defaultValue(e.extrudedHeight, s);
    a || ((t = Math.max(s, y)), (y = Math.min(s, y)), (s = t)),
      (this._ellipsoid = d.Ellipsoid.clone(r)),
      (this._granularity = o),
      (this._height = s),
      (this._extrudedHeight = y),
      (this._arcType = l),
      (this._polygonHierarchy = i),
      (this._perPositionHeight = n),
      (this._perPositionHeightExtrude = a),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = "createPolygonOutlineGeometry"),
      (this.packedLength =
        D.PolygonGeometryLibrary.computeHierarchyPackedLength(i) +
        d.Ellipsoid.packedLength +
        8);
  }
  f.pack = function (e, t, i) {
    return (
      (i = m.defaultValue(i, 0)),
      (i = D.PolygonGeometryLibrary.packPolygonHierarchy(
        e._polygonHierarchy,
        t,
        i
      )),
      d.Ellipsoid.pack(e._ellipsoid, t, i),
      (i += d.Ellipsoid.packedLength),
      (t[i++] = e._height),
      (t[i++] = e._extrudedHeight),
      (t[i++] = e._granularity),
      (t[i++] = e._perPositionHeightExtrude ? 1 : 0),
      (t[i++] = e._perPositionHeight ? 1 : 0),
      (t[i++] = e._arcType),
      (t[i++] = m.defaultValue(e._offsetAttribute, -1)),
      (t[i] = e.packedLength),
      t
    );
  };
  var c = d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),
    g = { polygonHierarchy: {} };
  return (
    (f.unpack = function (e, t, i) {
      t = m.defaultValue(t, 0);
      var r = D.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t);
      (t = r.startingIndex), delete r.startingIndex;
      var o = d.Ellipsoid.unpack(e, t, c);
      t += d.Ellipsoid.packedLength;
      var n = e[t++],
        a = e[t++],
        l = e[t++],
        s = 1 === e[t++],
        y = 1 === e[t++],
        u = e[t++],
        p = e[t++],
        t = e[t];
      return (
        m.defined(i) || (i = new f(g)),
        (i._polygonHierarchy = r),
        (i._ellipsoid = d.Ellipsoid.clone(o, i._ellipsoid)),
        (i._height = n),
        (i._extrudedHeight = a),
        (i._granularity = l),
        (i._perPositionHeight = y),
        (i._perPositionHeightExtrude = s),
        (i._arcType = u),
        (i._offsetAttribute = -1 === p ? void 0 : p),
        (i.packedLength = t),
        i
      );
    }),
    (f.fromPositions = function (e) {
      return new f({
        polygonHierarchy: {
          positions: (e = m.defaultValue(e, m.defaultValue.EMPTY_OBJECT))
            .positions,
        },
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        ellipsoid: e.ellipsoid,
        granularity: e.granularity,
        perPositionHeight: e.perPositionHeight,
        arcType: e.arcType,
        offsetAttribute: e.offsetAttribute,
      });
    }),
    (f.createGeometry = function (e) {
      var t = e._ellipsoid,
        i = e._granularity,
        r = e._polygonHierarchy,
        o = e._perPositionHeight,
        n = e._arcType,
        a = D.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r, !o, t);
      if (0 !== a.length) {
        var l,
          s,
          y,
          u,
          p,
          d,
          f = [],
          c = b.CesiumMath.chordLength(i, t.maximumRadius),
          g = e._height,
          h = e._extrudedHeight;
        if (
          e._perPositionHeightExtrude ||
          !b.CesiumMath.equalsEpsilon(g, h, 0, b.CesiumMath.EPSILON2)
        )
          for (l = 0; l < a.length; l++)
            ((u = (function (e, t, i, r, o) {
              var n,
                a = H.EllipsoidTangentPlane.fromPoints(
                  t,
                  e
                ).projectPointsOntoPlane(t, x);
              O.PolygonPipeline.computeWindingOrder2D(a) ===
                O.WindingOrder.CLOCKWISE &&
                (a.reverse(), (t = t.slice().reverse()));
              var l = t.length,
                s = new Array(l),
                y = 0;
              if (r)
                for (n = new Float64Array(2 * l * 3 * 2), b = 0; b < l; ++b) {
                  s[b] = y / 3;
                  var u = t[b],
                    p = t[(b + 1) % l];
                  (n[y++] = u.x),
                    (n[y++] = u.y),
                    (n[y++] = u.z),
                    (n[y++] = p.x),
                    (n[y++] = p.y),
                    (n[y++] = p.z);
                }
              else {
                var d,
                  f = 0;
                if (o === C.ArcType.GEODESIC)
                  for (b = 0; b < l; b++)
                    f += D.PolygonGeometryLibrary.subdivideLineCount(
                      t[b],
                      t[(b + 1) % l],
                      i
                    );
                else if (o === C.ArcType.RHUMB)
                  for (b = 0; b < l; b++)
                    f += D.PolygonGeometryLibrary.subdivideRhumbLineCount(
                      e,
                      t[b],
                      t[(b + 1) % l],
                      i
                    );
                for (n = new Float64Array(3 * f * 2), b = 0; b < l; ++b) {
                  (s[b] = y / 3),
                    o === C.ArcType.GEODESIC
                      ? (d = D.PolygonGeometryLibrary.subdivideLine(
                          t[b],
                          t[(b + 1) % l],
                          i,
                          I
                        ))
                      : o === C.ArcType.RHUMB &&
                        (d = D.PolygonGeometryLibrary.subdivideRhumbLine(
                          e,
                          t[b],
                          t[(b + 1) % l],
                          i,
                          I
                        ));
                  for (var c = d.length, g = 0; g < c; ++g) n[y++] = d[g];
                }
              }
              l = n.length / 6;
              for (
                var h = s.length,
                  r = 2 * (2 * l + h),
                  m = G.IndexDatatype.createTypedArray(l + h, r),
                  y = 0,
                  b = 0;
                b < l;
                ++b
              )
                (m[y++] = b),
                  (m[y++] = (b + 1) % l),
                  (m[y++] = b + l),
                  (m[y++] = ((b + 1) % l) + l);
              for (b = 0; b < h; b++) {
                var P = s[b];
                (m[y++] = P), (m[y++] = P + l);
              }
              return new T.GeometryInstance({
                geometry: new A.Geometry({
                  attributes: new _.GeometryAttributes({
                    position: new A.GeometryAttribute({
                      componentDatatype: E.ComponentDatatype.DOUBLE,
                      componentsPerAttribute: 3,
                      values: n,
                    }),
                  }),
                  indices: m,
                  primitiveType: A.PrimitiveType.LINES,
                }),
              });
            })(
              t,
              a[l],
              c,
              o,
              n
            )).geometry = D.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
              u.geometry,
              g,
              h,
              t,
              o
            )),
              m.defined(e._offsetAttribute) &&
                ((s = u.geometry.attributes.position.values.length / 3),
                (y = new Uint8Array(s)),
                (y =
                  e._offsetAttribute === L.GeometryOffsetAttribute.TOP
                    ? L.arrayFill(y, 1, 0, s / 2)
                    : ((d =
                        e._offsetAttribute === L.GeometryOffsetAttribute.NONE
                          ? 0
                          : 1),
                      L.arrayFill(y, d))),
                (u.geometry.attributes.applyOffset = new A.GeometryAttribute({
                  componentDatatype: E.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: y,
                }))),
              f.push(u);
        else
          for (l = 0; l < a.length; l++)
            ((u = (function (e, t, i, r, o) {
              var n,
                a = H.EllipsoidTangentPlane.fromPoints(
                  t,
                  e
                ).projectPointsOntoPlane(t, x);
              O.PolygonPipeline.computeWindingOrder2D(a) ===
                O.WindingOrder.CLOCKWISE &&
                (a.reverse(), (t = t.slice().reverse()));
              var l = t.length,
                s = 0;
              if (r)
                for (n = new Float64Array(2 * l * 3), h = 0; h < l; h++) {
                  var y = t[h],
                    u = t[(h + 1) % l];
                  (n[s++] = y.x),
                    (n[s++] = y.y),
                    (n[s++] = y.z),
                    (n[s++] = u.x),
                    (n[s++] = u.y),
                    (n[s++] = u.z);
                }
              else {
                var p,
                  d = 0;
                if (o === C.ArcType.GEODESIC)
                  for (h = 0; h < l; h++)
                    d += D.PolygonGeometryLibrary.subdivideLineCount(
                      t[h],
                      t[(h + 1) % l],
                      i
                    );
                else if (o === C.ArcType.RHUMB)
                  for (h = 0; h < l; h++)
                    d += D.PolygonGeometryLibrary.subdivideRhumbLineCount(
                      e,
                      t[h],
                      t[(h + 1) % l],
                      i
                    );
                for (n = new Float64Array(3 * d), h = 0; h < l; h++) {
                  o === C.ArcType.GEODESIC
                    ? (p = D.PolygonGeometryLibrary.subdivideLine(
                        t[h],
                        t[(h + 1) % l],
                        i,
                        I
                      ))
                    : o === C.ArcType.RHUMB &&
                      (p = D.PolygonGeometryLibrary.subdivideRhumbLine(
                        e,
                        t[h],
                        t[(h + 1) % l],
                        i,
                        I
                      ));
                  for (var f = p.length, c = 0; c < f; ++c) n[s++] = p[c];
                }
              }
              for (
                var r = 2 * (l = n.length / 3),
                  g = G.IndexDatatype.createTypedArray(l, r),
                  s = 0,
                  h = 0;
                h < l - 1;
                h++
              )
                (g[s++] = h), (g[s++] = h + 1);
              return (
                (g[s++] = l - 1),
                (g[s++] = 0),
                new T.GeometryInstance({
                  geometry: new A.Geometry({
                    attributes: new _.GeometryAttributes({
                      position: new A.GeometryAttribute({
                        componentDatatype: E.ComponentDatatype.DOUBLE,
                        componentsPerAttribute: 3,
                        values: n,
                      }),
                    }),
                    indices: g,
                    primitiveType: A.PrimitiveType.LINES,
                  }),
                })
              );
            })(
              t,
              a[l],
              c,
              o,
              n
            )).geometry.attributes.position.values = O.PolygonPipeline.scaleToGeodeticHeight(
              u.geometry.attributes.position.values,
              g,
              t,
              !o
            )),
              m.defined(e._offsetAttribute) &&
                ((p = u.geometry.attributes.position.values.length),
                (p = new Uint8Array(p / 3)),
                (d =
                  e._offsetAttribute === L.GeometryOffsetAttribute.NONE
                    ? 0
                    : 1),
                L.arrayFill(p, d),
                (u.geometry.attributes.applyOffset = new A.GeometryAttribute({
                  componentDatatype: E.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: p,
                }))),
              f.push(u);
        (r = v.GeometryPipeline.combineInstances(f)[0]),
          (i = P.BoundingSphere.fromVertices(r.attributes.position.values));
        return new A.Geometry({
          attributes: r.attributes,
          indices: r.indices,
          primitiveType: r.primitiveType,
          boundingSphere: i,
          offsetAttribute: e._offsetAttribute,
        });
      }
    }),
    function (e, t) {
      return (
        m.defined(t) && (e = f.unpack(e, t)),
        (e._ellipsoid = d.Ellipsoid.clone(e._ellipsoid)),
        f.createGeometry(e)
      );
    }
  );
});