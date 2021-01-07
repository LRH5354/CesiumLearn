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
], function (c, e, r, t, n, a, o, i, f, s, u, d, m, b, p, l, y, P, k) {
  "use strict";
  var C = {};
  return k(function (e, r) {
    for (
      var t = e.subTasks, n = t.length, a = new Array(n), o = 0;
      o < n;
      o++
    ) {
      var i = t[o],
        f = i.geometry,
        s = i.moduleName;
      c.defined(s)
        ? ((s = (function (e) {
            var r = C[e];
            return (
              c.defined(r) ||
                ("object" == typeof exports
                  ? (C[r] = r = require("Workers/" + e))
                  : require(["Workers/" + e], function (e) {
                      C[(r = e)] = e;
                    })),
              r
            );
          })(s)),
          (a[o] = s(f, i.offset)))
        : (a[o] = f);
    }
    return c.when.all(a, function (e) {
      return y.PrimitivePipeline.packCreateGeometryResults(e, r);
    });
  });
});
