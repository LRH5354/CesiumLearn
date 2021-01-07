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
  "./IndexDatatype-66caba23",
  "./GeometryOffsetAttribute-84f7eff3",
  "./CylinderGeometryLibrary-297cfdf0",
], function (b, e, t, p, y, i, r, _, h, A, v, R, G) {
  "use strict";
  var O = new p.Cartesian2();
  function s(e) {
    var t = (e = b.defaultValue(e, b.defaultValue.EMPTY_OBJECT)).length,
      i = e.topRadius,
      r = e.bottomRadius,
      a = b.defaultValue(e.slices, 128),
      n = Math.max(b.defaultValue(e.numberOfVerticalLines, 16), 0);
    (this._length = t),
      (this._topRadius = i),
      (this._bottomRadius = r),
      (this._slices = a),
      (this._numberOfVerticalLines = n),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = "createCylinderOutlineGeometry");
  }
  (s.packedLength = 6),
    (s.pack = function (e, t, i) {
      return (
        (i = b.defaultValue(i, 0)),
        (t[i++] = e._length),
        (t[i++] = e._topRadius),
        (t[i++] = e._bottomRadius),
        (t[i++] = e._slices),
        (t[i++] = e._numberOfVerticalLines),
        (t[i] = b.defaultValue(e._offsetAttribute, -1)),
        t
      );
    });
  var f = {
    length: void 0,
    topRadius: void 0,
    bottomRadius: void 0,
    slices: void 0,
    numberOfVerticalLines: void 0,
    offsetAttribute: void 0,
  };
  return (
    (s.unpack = function (e, t, i) {
      t = b.defaultValue(t, 0);
      var r = e[t++],
        a = e[t++],
        n = e[t++],
        o = e[t++],
        u = e[t++],
        t = e[t];
      return b.defined(i)
        ? ((i._length = r),
          (i._topRadius = a),
          (i._bottomRadius = n),
          (i._slices = o),
          (i._numberOfVerticalLines = u),
          (i._offsetAttribute = -1 === t ? void 0 : t),
          i)
        : ((f.length = r),
          (f.topRadius = a),
          (f.bottomRadius = n),
          (f.slices = o),
          (f.numberOfVerticalLines = u),
          (f.offsetAttribute = -1 === t ? void 0 : t),
          new s(f));
    }),
    (s.createGeometry = function (e) {
      var t = e._length,
        i = e._topRadius,
        r = e._bottomRadius,
        a = e._slices,
        n = e._numberOfVerticalLines;
      if (!(t <= 0 || i < 0 || r < 0 || (0 === i && 0 === r))) {
        var o,
          u,
          s = 2 * a,
          f = G.CylinderGeometryLibrary.computePositions(t, i, r, a, !1),
          d = 2 * a;
        0 < n && ((o = Math.min(n, a)), (u = Math.round(a / o)), (d += o));
        for (
          var l = v.IndexDatatype.createTypedArray(s, 2 * d), c = 0, m = 0;
          m < a - 1;
          m++
        )
          (l[c++] = m),
            (l[c++] = m + 1),
            (l[c++] = m + a),
            (l[c++] = m + 1 + a);
        if (
          ((l[c++] = a - 1),
          (l[c++] = 0),
          (l[c++] = a + a - 1),
          (l[c++] = a),
          0 < n)
        )
          for (m = 0; m < a; m += u) (l[c++] = m), (l[c++] = m + a);
        n = new A.GeometryAttributes();
        (n.position = new h.GeometryAttribute({
          componentDatatype: _.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: f,
        })),
          (O.x = 0.5 * t),
          (O.y = Math.max(r, i));
        i = new y.BoundingSphere(p.Cartesian3.ZERO, p.Cartesian2.magnitude(O));
        return (
          b.defined(e._offsetAttribute) &&
            ((t = f.length),
            (f = new Uint8Array(t / 3)),
            (t = e._offsetAttribute === R.GeometryOffsetAttribute.NONE ? 0 : 1),
            R.arrayFill(f, t),
            (n.applyOffset = new h.GeometryAttribute({
              componentDatatype: _.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: f,
            }))),
          new h.Geometry({
            attributes: n,
            indices: l,
            primitiveType: h.PrimitiveType.LINES,
            boundingSphere: i,
            offsetAttribute: e._offsetAttribute,
          })
        );
      }
    }),
    function (e, t) {
      return b.defined(t) && (e = s.unpack(e, t)), s.createGeometry(e);
    }
  );
});
