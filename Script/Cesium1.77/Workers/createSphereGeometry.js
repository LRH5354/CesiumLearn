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
  "./VertexFormat-cc24f342",
  "./EllipsoidGeometry-dfbbe157",
], function (i, e, t, a, r, o, n, s, c, d, l, m, f, u) {
  "use strict";
  function p(e) {
    var t = i.defaultValue(e.radius, 1),
      e = {
        radii: new a.Cartesian3(t, t, t),
        stackPartitions: e.stackPartitions,
        slicePartitions: e.slicePartitions,
        vertexFormat: e.vertexFormat,
      };
    (this._ellipsoidGeometry = new u.EllipsoidGeometry(e)),
      (this._workerName = "createSphereGeometry");
  }
  (p.packedLength = u.EllipsoidGeometry.packedLength),
    (p.pack = function (e, t, r) {
      return u.EllipsoidGeometry.pack(e._ellipsoidGeometry, t, r);
    });
  var y = new u.EllipsoidGeometry(),
    G = {
      radius: void 0,
      radii: new a.Cartesian3(),
      vertexFormat: new f.VertexFormat(),
      stackPartitions: void 0,
      slicePartitions: void 0,
    };
  return (
    (p.unpack = function (e, t, r) {
      t = u.EllipsoidGeometry.unpack(e, t, y);
      return (
        (G.vertexFormat = f.VertexFormat.clone(
          t._vertexFormat,
          G.vertexFormat
        )),
        (G.stackPartitions = t._stackPartitions),
        (G.slicePartitions = t._slicePartitions),
        i.defined(r)
          ? (a.Cartesian3.clone(t._radii, G.radii),
            (r._ellipsoidGeometry = new u.EllipsoidGeometry(G)),
            r)
          : ((G.radius = t._radii.x), new p(G))
      );
    }),
    (p.createGeometry = function (e) {
      return u.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry);
    }),
    function (e, t) {
      return i.defined(t) && (e = p.unpack(e, t)), p.createGeometry(e);
    }
  );
});
