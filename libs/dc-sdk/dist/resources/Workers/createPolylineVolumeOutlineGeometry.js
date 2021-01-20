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
  './arrayRemoveDuplicates-ebc732b0',
  './BoundingRectangle-4f9baeda',
  './EllipsoidTangentPlane-c3f203b0',
  './EllipsoidRhumbLine-c704bf4c',
  './PolygonPipeline-1aceedbc',
  './PolylineVolumeGeometryLibrary-0216ec14',
  './EllipsoidGeodesic-30fae80b',
  './PolylinePipeline-7685bebd',
], function (c, e, t, d, u, i, n, y, h, f, g, a, r, o, l, s, p, m, b, E, v) {
  'use strict'
  function P(e) {
    var i = (e = c.defaultValue(e, c.defaultValue.EMPTY_OBJECT))
        .polylinePositions,
      n = e.shapePositions
    ;(this._positions = i),
      (this._shape = n),
      (this._ellipsoid = d.Ellipsoid.clone(
        c.defaultValue(e.ellipsoid, d.Ellipsoid.WGS84)
      )),
      (this._cornerType = c.defaultValue(e.cornerType, b.CornerType.ROUNDED)),
      (this._granularity = c.defaultValue(
        e.granularity,
        t.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._workerName = 'createPolylineVolumeOutlineGeometry')
    i = 1 + i.length * d.Cartesian3.packedLength
    ;(i += 1 + n.length * d.Cartesian2.packedLength),
      (this.packedLength = i + d.Ellipsoid.packedLength + 2)
  }
  P.pack = function (e, i, n) {
    var t
    n = c.defaultValue(n, 0)
    var a = e._positions,
      r = a.length
    for (i[n++] = r, t = 0; t < r; ++t, n += d.Cartesian3.packedLength)
      d.Cartesian3.pack(a[t], i, n)
    var o = e._shape,
      r = o.length
    for (i[n++] = r, t = 0; t < r; ++t, n += d.Cartesian2.packedLength)
      d.Cartesian2.pack(o[t], i, n)
    return (
      d.Ellipsoid.pack(e._ellipsoid, i, n),
      (n += d.Ellipsoid.packedLength),
      (i[n++] = e._cornerType),
      (i[n] = e._granularity),
      i
    )
  }
  var _ = d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),
    k = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: _,
      height: void 0,
      cornerType: void 0,
      granularity: void 0,
    }
  P.unpack = function (e, i, n) {
    i = c.defaultValue(i, 0)
    for (
      var t = e[i++], a = new Array(t), r = 0;
      r < t;
      ++r, i += d.Cartesian3.packedLength
    )
      a[r] = d.Cartesian3.unpack(e, i)
    t = e[i++]
    var o = new Array(t)
    for (r = 0; r < t; ++r, i += d.Cartesian2.packedLength)
      o[r] = d.Cartesian2.unpack(e, i)
    var l = d.Ellipsoid.unpack(e, i, _)
    i += d.Ellipsoid.packedLength
    var s = e[i++],
      p = e[i]
    return c.defined(n)
      ? ((n._positions = a),
        (n._shape = o),
        (n._ellipsoid = d.Ellipsoid.clone(l, n._ellipsoid)),
        (n._cornerType = s),
        (n._granularity = p),
        n)
      : ((k.polylinePositions = a),
        (k.shapePositions = o),
        (k.cornerType = s),
        (k.granularity = p),
        new P(k))
  }
  var C = new l.BoundingRectangle()
  return (
    (P.createGeometry = function (e) {
      var i = e._positions,
        n = o.arrayRemoveDuplicates(i, d.Cartesian3.equalsEpsilon),
        t = e._shape,
        t = b.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(t)
      if (!(n.length < 2 || t.length < 3)) {
        m.PolygonPipeline.computeWindingOrder2D(t) ===
          m.WindingOrder.CLOCKWISE && t.reverse()
        i = l.BoundingRectangle.fromPoints(t, C)
        return (function (e, i) {
          var n = new f.GeometryAttributes()
          n.position = new h.GeometryAttribute({
            componentDatatype: y.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: e,
          })
          var t = i.length,
            i = n.position.values.length / 3,
            a = e.length / 3 / t,
            r = g.IndexDatatype.createTypedArray(i, 2 * t * (1 + a)),
            o = 0,
            l = 0,
            s = l * t
          for (d = 0; d < t - 1; d++) (r[o++] = d + s), (r[o++] = d + s + 1)
          for (
            r[o++] = t - 1 + s, r[o++] = s, s = (l = a - 1) * t, d = 0;
            d < t - 1;
            d++
          )
            (r[o++] = d + s), (r[o++] = d + s + 1)
          for (r[o++] = t - 1 + s, r[o++] = s, l = 0; l < a - 1; l++)
            for (var p = t * l, c = p + t, d = 0; d < t; d++)
              (r[o++] = d + p), (r[o++] = d + c)
          return new h.Geometry({
            attributes: n,
            indices: g.IndexDatatype.createTypedArray(i, r),
            boundingSphere: u.BoundingSphere.fromVertices(e),
            primitiveType: h.PrimitiveType.LINES,
          })
        })(b.PolylineVolumeGeometryLibrary.computePositions(n, t, i, e, !1), t)
      }
    }),
    function (e, i) {
      return (
        c.defined(i) && (e = P.unpack(e, i)),
        (e._ellipsoid = d.Ellipsoid.clone(e._ellipsoid)),
        P.createGeometry(e)
      )
    }
  )
})