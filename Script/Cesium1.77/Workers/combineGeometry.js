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
  "./PrimitivePipeline-9247c0b2",
  "./WebMercatorProjection-851fee3c",
  "./createTaskProcessorWorker",
], function (e, t, i, r, n, a, o, c, s, m, f, b, P, d, p, u, y, C, l) {
  "use strict";
  return l(function (e, t) {
    return (
      (e = y.PrimitivePipeline.unpackCombineGeometryParameters(e)),
      (e = y.PrimitivePipeline.combineGeometry(e)),
      y.PrimitivePipeline.packCombineGeometryResults(e, t)
    );
  });
});
