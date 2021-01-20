define([
  './when-54c2dc71',
  './Check-6c0211bc',
  './Math-fc8cecf5',
  './Cartesian2-bddc1162',
  './Transforms-6f81ad4c',
  './RuntimeError-2109023a',
  './WebGLConstants-76bb35d1',
  './ComponentDatatype-6d99a1ee',
  './GeometryAttribute-700c1da0',
  './GeometryAttributes-4fcfcf40',
  './Plane-b6058d9b',
  './VertexFormat-7572c785',
  './FrustumGeometry-a164549e',
], function (r, e, t, c, n, a, u, o, m, d, f, s, b) {
  'use strict'
  return function (e, t) {
    return (
      r.defined(t) && (e = b.FrustumGeometry.unpack(e, t)),
      b.FrustumGeometry.createGeometry(e)
    )
  }
})