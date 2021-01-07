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
  "./EllipseGeometryLibrary-ea7f2141",
  "./EllipseOutlineGeometry-77023718",
], function (r, e, t, n, i, a, o, l, f, c, s, u, d, m) {
  "use strict";
  return function (e, t) {
    return (
      r.defined(t) && (e = m.EllipseOutlineGeometry.unpack(e, t)),
      (e._center = n.Cartesian3.clone(e._center)),
      (e._ellipsoid = n.Ellipsoid.clone(e._ellipsoid)),
      m.EllipseOutlineGeometry.createGeometry(e)
    );
  };
});
