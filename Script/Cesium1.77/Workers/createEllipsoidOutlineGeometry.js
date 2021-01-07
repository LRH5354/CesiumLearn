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
], function (r, e, t, n, f, i, a, o, u, c, s, b, d) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(e.buffer) && (e = d.EllipsoidOutlineGeometry.unpack(e, t)),
      d.EllipsoidOutlineGeometry.createGeometry(e)
    );
  };
});
