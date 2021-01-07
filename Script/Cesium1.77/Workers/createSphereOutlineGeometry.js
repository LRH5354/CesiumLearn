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
  "./EllipsoidOutlineGeometry-9b09699b",
], function (r, e, i, n, t, s, o, a, d, l, u, c, f) {
  "use strict";
  function m(e) {
    var i = r.defaultValue(e.radius, 1),
      e = {
        radii: new n.Cartesian3(i, i, i),
        stackPartitions: e.stackPartitions,
        slicePartitions: e.slicePartitions,
        subdivisions: e.subdivisions,
      };
    (this._ellipsoidGeometry = new f.EllipsoidOutlineGeometry(e)),
      (this._workerName = "createSphereOutlineGeometry");
  }
  (m.packedLength = f.EllipsoidOutlineGeometry.packedLength),
    (m.pack = function (e, i, t) {
      return f.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry, i, t);
    });
  var p = new f.EllipsoidOutlineGeometry(),
    y = {
      radius: void 0,
      radii: new n.Cartesian3(),
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
    };
  return (
    (m.unpack = function (e, i, t) {
      i = f.EllipsoidOutlineGeometry.unpack(e, i, p);
      return (
        (y.stackPartitions = i._stackPartitions),
        (y.slicePartitions = i._slicePartitions),
        (y.subdivisions = i._subdivisions),
        r.defined(t)
          ? (n.Cartesian3.clone(i._radii, y.radii),
            (t._ellipsoidGeometry = new f.EllipsoidOutlineGeometry(y)),
            t)
          : ((y.radius = i._radii.x), new m(y))
      );
    }),
    (m.createGeometry = function (e) {
      return f.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry);
    }),
    function (e, i) {
      return r.defined(i) && (e = m.unpack(e, i)), m.createGeometry(e);
    }
  );
});