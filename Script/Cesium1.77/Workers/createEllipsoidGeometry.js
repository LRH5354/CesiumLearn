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
], function (r, e, t, a, f, n, o, i, c, d, s, m, b, u) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(t) && (e = u.EllipsoidGeometry.unpack(e, t)),
      u.EllipsoidGeometry.createGeometry(e)
    );
  };
});
