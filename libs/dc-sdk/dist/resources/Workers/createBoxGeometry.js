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
  './GeometryOffsetAttribute-7350d9af',
  './VertexFormat-7572c785',
  './BoxGeometry-49272f06',
], function (r, e, t, c, o, n, a, f, d, m, i, u, s) {
  'use strict'
  return function (e, t) {
    return (
      r.defined(t) && (e = s.BoxGeometry.unpack(e, t)),
      s.BoxGeometry.createGeometry(e)
    )
  }
})