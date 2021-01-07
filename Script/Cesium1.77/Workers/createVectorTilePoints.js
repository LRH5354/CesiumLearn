define([
  "./when-cbf8cd21",
  "./Check-35e1a91d",
  "./Math-e66fad2a",
  "./Cartesian2-ec968a07",
  "./AttributeCompression-322f5984",
  "./createTaskProcessorWorker",
], function (a, e, C, g, w, r) {
  "use strict";
  var b = 32767,
    k = new g.Cartographic(),
    v = new g.Cartesian3(),
    y = new g.Rectangle(),
    A = new g.Ellipsoid(),
    M = { min: void 0, max: void 0 };
  return r(function (a, e) {
    var r = new Uint16Array(a.positions);
    !(function (a) {
      a = new Float64Array(a);
      var e = 0;
      (M.min = a[e++]),
        (M.max = a[e++]),
        g.Rectangle.unpack(a, 2, y),
        (e += g.Rectangle.packedLength),
        g.Ellipsoid.unpack(a, e, A);
    })(a.packedBuffer);
    var t = y,
      n = A,
      i = M.min,
      s = M.max,
      o = r.length / 3,
      c = r.subarray(0, o),
      u = r.subarray(o, 2 * o),
      p = r.subarray(2 * o, 3 * o);
    w.AttributeCompression.zigZagDeltaDecode(c, u, p);
    for (var f = new Float64Array(r.length), h = 0; h < o; ++h) {
      var l = c[h],
        d = u[h],
        m = p[h],
        l = C.CesiumMath.lerp(t.west, t.east, l / b),
        d = C.CesiumMath.lerp(t.south, t.north, d / b),
        m = C.CesiumMath.lerp(i, s, m / b),
        m = g.Cartographic.fromRadians(l, d, m, k),
        m = n.cartographicToCartesian(m, v);
      g.Cartesian3.pack(m, f, 3 * h);
    }
    return e.push(f.buffer), { positions: f.buffer };
  });
});
