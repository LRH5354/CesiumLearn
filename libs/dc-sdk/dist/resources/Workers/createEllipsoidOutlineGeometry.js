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
  './IndexDatatype-53503fee',
  './GeometryOffsetAttribute-7350d9af',
  './EllipsoidOutlineGeometry-630735c0',
], function (r, e, t, n, c, i, f, o, a, d, u, s, m) {
  'use strict'
  return function (e, t) {
    return (
      r.defined(e.buffer) && (e = m.EllipsoidOutlineGeometry.unpack(e, t)),
      m.EllipsoidOutlineGeometry.createGeometry(e)
    )
  }
})
