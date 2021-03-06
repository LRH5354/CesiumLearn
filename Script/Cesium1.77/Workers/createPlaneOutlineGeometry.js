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
], function (r, e, t, a, i, n, o, u, c, s) {
  "use strict";
  function y() {
    this._workerName = "createPlaneOutlineGeometry";
  }
  (y.packedLength = 0),
    (y.pack = function (e, t) {
      return t;
    }),
    (y.unpack = function (e, t, n) {
      return r.defined(n) ? n : new y();
    });
  var f = new a.Cartesian3(-0.5, -0.5, 0),
    m = new a.Cartesian3(0.5, 0.5, 0);
  return (
    (y.createGeometry = function () {
      var e = new s.GeometryAttributes(),
        t = new Uint16Array(8),
        n = new Float64Array(12);
      return (
        (n[0] = f.x),
        (n[1] = f.y),
        (n[2] = f.z),
        (n[3] = m.x),
        (n[4] = f.y),
        (n[5] = f.z),
        (n[6] = m.x),
        (n[7] = m.y),
        (n[8] = f.z),
        (n[9] = f.x),
        (n[10] = m.y),
        (n[11] = f.z),
        (e.position = new c.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: n,
        })),
        (t[0] = 0),
        (t[1] = 1),
        (t[2] = 1),
        (t[3] = 2),
        (t[4] = 2),
        (t[5] = 3),
        (t[6] = 3),
        (t[7] = 0),
        new c.Geometry({
          attributes: e,
          indices: t,
          primitiveType: c.PrimitiveType.LINES,
          boundingSphere: new i.BoundingSphere(a.Cartesian3.ZERO, Math.sqrt(2)),
        })
      );
    }),
    function (e, t) {
      return r.defined(t) && (e = y.unpack(e, t)), y.createGeometry(e);
    }
  );
});
