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
  "./CylinderGeometryLibrary-297cfdf0",
  "./CylinderGeometry-34ffa667",
], function (r, e, t, f, n, a, c, o, i, y, d, m, u, b, s) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(t) && (e = s.CylinderGeometry.unpack(e, t)),
      s.CylinderGeometry.createGeometry(e)
    );
  };
});
