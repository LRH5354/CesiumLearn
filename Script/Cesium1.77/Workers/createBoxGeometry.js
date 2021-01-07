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
  "./GeometryOffsetAttribute-84f7eff3",
  "./VertexFormat-cc24f342",
  "./BoxGeometry-da652d0b",
], function (r, e, t, f, o, n, a, c, m, i, u, d, s) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(t) && (e = s.BoxGeometry.unpack(e, t)),
      s.BoxGeometry.createGeometry(e)
    );
  };
});
