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
  "./AttributeCompression-322f5984",
  "./GeometryPipeline-4cf8286d",
  "./EncodedCartesian3-5919d11a",
  "./IndexDatatype-66caba23",
  "./IntersectionTests-ea61529d",
  "./Plane-5f5ff4d5",
  "./GeometryOffsetAttribute-84f7eff3",
  "./VertexFormat-cc24f342",
  "./EllipseGeometryLibrary-ea7f2141",
  "./GeometryInstance-b75d9687",
  "./EllipseGeometry-ab48e59f",
], function (r, e, t, n, a, i, o, f, s, c, d, l, m, p, y, b, u, G, C, E, A) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(t) && (e = A.EllipseGeometry.unpack(e, t)),
      (e._center = n.Cartesian3.clone(e._center)),
      (e._ellipsoid = n.Ellipsoid.clone(e._ellipsoid)),
      A.EllipseGeometry.createGeometry(e)
    );
  };
});
