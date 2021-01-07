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
  "./Plane-5f5ff4d5",
  "./VertexFormat-cc24f342",
  "./FrustumGeometry-a963c926",
], function (r, e, t, n, a, f, c, u, o, m, s, i, d) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(t) && (e = d.FrustumGeometry.unpack(e, t)),
      d.FrustumGeometry.createGeometry(e)
    );
  };
});
