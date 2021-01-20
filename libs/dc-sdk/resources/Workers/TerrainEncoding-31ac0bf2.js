define([
  'exports',
  './when-54c2dc71',
  './Check-6c0211bc',
  './Math-fc8cecf5',
  './Cartesian2-bddc1162',
  './Transforms-6f81ad4c',
  './ComponentDatatype-6d99a1ee',
  './AttributeCompression-9fc99391',
], function (t, l, e, d, p, h, o, f) {
  'use strict'
  function i(t, e) {
    ;(this._ellipsoid = t),
      (this._cameraPosition = new p.Cartesian3()),
      (this._cameraPositionInScaledSpace = new p.Cartesian3()),
      (this._distanceToLimbInScaledSpaceSquared = 0),
      l.defined(e) && (this.cameraPosition = e)
  }
  Object.defineProperties(i.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      },
    },
    cameraPosition: {
      get: function () {
        return this._cameraPosition
      },
      set: function (t) {
        var e = this._ellipsoid.transformPositionToScaledSpace(
            t,
            this._cameraPositionInScaledSpace
          ),
          i = p.Cartesian3.magnitudeSquared(e) - 1
        p.Cartesian3.clone(t, this._cameraPosition),
          (this._cameraPositionInScaledSpace = e),
          (this._distanceToLimbInScaledSpaceSquared = i)
      },
    },
  })
  var r = new p.Cartesian3()
  ;(i.prototype.isPointVisible = function (t) {
    return S(
      this._ellipsoid.transformPositionToScaledSpace(t, r),
      this._cameraPositionInScaledSpace,
      this._distanceToLimbInScaledSpaceSquared
    )
  }),
    (i.prototype.isScaledSpacePointVisible = function (t) {
      return S(
        t,
        this._cameraPositionInScaledSpace,
        this._distanceToLimbInScaledSpaceSquared
      )
    })
  var a = new p.Cartesian3()
  ;(i.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid = function (
    t,
    e
  ) {
    var i,
      r = this._ellipsoid,
      e =
        l.defined(e) && e < 0 && r.minimumRadius > -e
          ? (((i = a).x = this._cameraPosition.x / (r.radii.x + e)),
            (i.y = this._cameraPosition.y / (r.radii.y + e)),
            (i.z = this._cameraPosition.z / (r.radii.z + e)),
            i.x * i.x + i.y * i.y + i.z * i.z - 1)
          : ((i = this._cameraPositionInScaledSpace),
            this._distanceToLimbInScaledSpaceSquared)
    return S(t, i, e)
  }),
    (i.prototype.computeHorizonCullingPoint = function (t, e, i) {
      return u(this._ellipsoid, t, e, i)
    })
  var s = p.Ellipsoid.clone(p.Ellipsoid.UNIT_SPHERE)
  ;(i.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid = function (
    t,
    e,
    i,
    r
  ) {
    return u(m(this._ellipsoid, i, s), t, e, r)
  }),
    (i.prototype.computeHorizonCullingPointFromVertices = function (
      t,
      e,
      i,
      r,
      a
    ) {
      return C(this._ellipsoid, t, e, i, r, a)
    }),
    (i.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid = function (
      t,
      e,
      i,
      r,
      a,
      n
    ) {
      return C(m(this._ellipsoid, a, s), t, e, i, r, n)
    })
  var n = []
  i.prototype.computeHorizonCullingPointFromRectangle = function (t, e, i) {
    var r = p.Rectangle.subsample(t, e, 0, n),
      t = h.BoundingSphere.fromPoints(r)
    if (!(p.Cartesian3.magnitude(t.center) < 0.1 * e.minimumRadius))
      return this.computeHorizonCullingPoint(t.center, r, i)
  }
  var c = new p.Cartesian3()
  function m(t, e, i) {
    return (
      l.defined(e) &&
        e < 0 &&
        t.minimumRadius > -e &&
        ((e = p.Cartesian3.fromElements(
          t.radii.x + e,
          t.radii.y + e,
          t.radii.z + e,
          c
        )),
        (t = p.Ellipsoid.fromCartesian3(e, i))),
      t
    )
  }
  function u(t, e, i, r) {
    l.defined(r) || (r = new p.Cartesian3())
    for (var a = P(t, e), n = 0, o = 0, s = i.length; o < s; ++o) {
      var c = M(t, i[o], a)
      if (c < 0) return
      n = Math.max(n, c)
    }
    return g(a, n, r)
  }
  var x = new p.Cartesian3()
  function C(t, e, i, r, a, n) {
    l.defined(n) || (n = new p.Cartesian3()),
      (r = l.defaultValue(r, 3)),
      (a = l.defaultValue(a, p.Cartesian3.ZERO))
    for (var o = P(t, e), s = 0, c = 0, m = i.length; c < m; c += r) {
      ;(x.x = i[c] + a.x), (x.y = i[c + 1] + a.y), (x.z = i[c + 2] + a.z)
      var u = M(t, x, o)
      if (u < 0) return
      s = Math.max(s, u)
    }
    return g(o, s, n)
  }
  function S(t, e, i) {
    ;(t = p.Cartesian3.subtract(t, e, r)), (e = -p.Cartesian3.dot(t, e))
    return !(i < 0
      ? 0 < e
      : i < e && (e * e) / p.Cartesian3.magnitudeSquared(t) > i)
  }
  var y = new p.Cartesian3(),
    b = new p.Cartesian3()
  function M(t, e, i) {
    var r = t.transformPositionToScaledSpace(e, y),
      t = p.Cartesian3.magnitudeSquared(r),
      e = Math.sqrt(t),
      r = p.Cartesian3.divideByScalar(r, e, b),
      t = Math.max(1, t),
      e = 1 / (e = Math.max(1, e))
    return (
      1 /
      (p.Cartesian3.dot(r, i) * e -
        p.Cartesian3.magnitude(p.Cartesian3.cross(r, i, r)) *
          (Math.sqrt(t - 1) * e))
    )
  }
  function g(t, e, i) {
    if (!(e <= 0 || e === 1 / 0 || e != e))
      return p.Cartesian3.multiplyByScalar(t, e, i)
  }
  var T = new p.Cartesian3()
  function P(t, e) {
    return p.Cartesian3.equals(e, p.Cartesian3.ZERO)
      ? e
      : (t.transformPositionToScaledSpace(e, T), p.Cartesian3.normalize(T, T))
  }
  var z = Object.freeze({ NONE: 0, BITS12: 1 }),
    E = new p.Cartesian3(),
    v = new p.Cartesian3(),
    N = new p.Cartesian2(),
    I = new h.Matrix4(),
    B = new h.Matrix4(),
    _ = Math.pow(2, 12)
  function w(t, e, i, r, a, n) {
    var o,
      s,
      c,
      m,
      u,
      d = z.NONE
    l.defined(t) &&
      l.defined(e) &&
      l.defined(i) &&
      l.defined(r) &&
      ((m = t.minimum),
      (s = t.maximum),
      (u = p.Cartesian3.subtract(s, m, v)),
      (c = i - e),
      (d =
        Math.max(p.Cartesian3.maximumComponent(u), c) < _ - 1
          ? z.BITS12
          : z.NONE),
      (o = t.center),
      (s = h.Matrix4.inverseTransformation(r, new h.Matrix4())),
      (c = p.Cartesian3.negate(m, E)),
      h.Matrix4.multiply(h.Matrix4.fromTranslation(c, I), s, s),
      ((c = E).x = 1 / u.x),
      (c.y = 1 / u.y),
      (c.z = 1 / u.z),
      h.Matrix4.multiply(h.Matrix4.fromScale(c, I), s, s),
      (c = h.Matrix4.clone(r)),
      h.Matrix4.setTranslation(c, p.Cartesian3.ZERO, c),
      (r = h.Matrix4.clone(r, new h.Matrix4())),
      (m = h.Matrix4.fromTranslation(m, I)),
      (u = h.Matrix4.fromScale(u, B)),
      (u = h.Matrix4.multiply(m, u, I)),
      h.Matrix4.multiply(r, u, r),
      h.Matrix4.multiply(c, u, c)),
      (this.quantization = d),
      (this.minimumHeight = e),
      (this.maximumHeight = i),
      (this.center = o),
      (this.toScaledENU = s),
      (this.fromScaledENU = r),
      (this.matrix = c),
      (this.hasVertexNormals = a),
      (this.hasWebMercatorT = l.defaultValue(n, !1))
  }
  ;(w.prototype.encode = function (t, e, i, r, a, n, o) {
    var s,
      c,
      m = r.x,
      u = r.y
    return (
      this.quantization === z.BITS12
        ? (((i = h.Matrix4.multiplyByPoint(
            this.toScaledENU,
            i,
            E
          )).x = d.CesiumMath.clamp(i.x, 0, 1)),
          (i.y = d.CesiumMath.clamp(i.y, 0, 1)),
          (i.z = d.CesiumMath.clamp(i.z, 0, 1)),
          (s = this.maximumHeight - this.minimumHeight),
          (c = d.CesiumMath.clamp((a - this.minimumHeight) / s, 0, 1)),
          p.Cartesian2.fromElements(i.x, i.y, N),
          (r = f.AttributeCompression.compressTextureCoordinates(N)),
          p.Cartesian2.fromElements(i.z, c, N),
          (s = f.AttributeCompression.compressTextureCoordinates(N)),
          p.Cartesian2.fromElements(m, u, N),
          (c = f.AttributeCompression.compressTextureCoordinates(N)),
          (t[e++] = r),
          (t[e++] = s),
          (t[e++] = c),
          this.hasWebMercatorT &&
            (p.Cartesian2.fromElements(o, 0, N),
            (c = f.AttributeCompression.compressTextureCoordinates(N)),
            (t[e++] = c)))
        : (p.Cartesian3.subtract(i, this.center, E),
          (t[e++] = E.x),
          (t[e++] = E.y),
          (t[e++] = E.z),
          (t[e++] = a),
          (t[e++] = m),
          (t[e++] = u),
          this.hasWebMercatorT && (t[e++] = o)),
      this.hasVertexNormals &&
        (t[e++] = f.AttributeCompression.octPackFloat(n)),
      e
    )
  }),
    (w.prototype.decodePosition = function (t, e, i) {
      if (
        (l.defined(i) || (i = new p.Cartesian3()),
        (e *= this.getStride()),
        this.quantization !== z.BITS12)
      )
        return (
          (i.x = t[e]),
          (i.y = t[e + 1]),
          (i.z = t[e + 2]),
          p.Cartesian3.add(i, this.center, i)
        )
      var r = f.AttributeCompression.decompressTextureCoordinates(t[e], N)
      ;(i.x = r.x), (i.y = r.y)
      e = f.AttributeCompression.decompressTextureCoordinates(t[e + 1], N)
      return (i.z = e.x), h.Matrix4.multiplyByPoint(this.fromScaledENU, i, i)
    }),
    (w.prototype.decodeTextureCoordinates = function (t, e, i) {
      return (
        l.defined(i) || (i = new p.Cartesian2()),
        (e *= this.getStride()),
        this.quantization === z.BITS12
          ? f.AttributeCompression.decompressTextureCoordinates(t[e + 2], i)
          : p.Cartesian2.fromElements(t[e + 4], t[e + 5], i)
      )
    }),
    (w.prototype.decodeHeight = function (t, e) {
      return (
        (e *= this.getStride()),
        this.quantization !== z.BITS12
          ? t[e + 3]
          : f.AttributeCompression.decompressTextureCoordinates(t[e + 1], N).y *
              (this.maximumHeight - this.minimumHeight) +
            this.minimumHeight
      )
    }),
    (w.prototype.decodeWebMercatorT = function (t, e) {
      return (
        (e *= this.getStride()),
        this.quantization === z.BITS12
          ? f.AttributeCompression.decompressTextureCoordinates(t[e + 3], N).x
          : t[e + 6]
      )
    }),
    (w.prototype.getOctEncodedNormal = function (t, e, i) {
      ;(t = t[(e = (e + 1) * this.getStride() - 1)] / 256),
        (e = Math.floor(t)),
        (t = 256 * (t - e))
      return p.Cartesian2.fromElements(e, t, i)
    }),
    (w.prototype.getStride = function () {
      var t = this.quantization === z.BITS12 ? 3 : 6
      return this.hasWebMercatorT && ++t, this.hasVertexNormals && ++t, t
    })
  var A = { position3DAndHeight: 0, textureCoordAndEncodedNormals: 1 },
    q = { compressed0: 0, compressed1: 1 }
  ;(w.prototype.getAttributes = function (t) {
    var e,
      i = o.ComponentDatatype.FLOAT,
      r = o.ComponentDatatype.getSizeInBytes(i)
    if (this.quantization === z.NONE) {
      var a = 2
      return (
        this.hasWebMercatorT && ++a,
        this.hasVertexNormals && ++a,
        [
          {
            index: A.position3DAndHeight,
            vertexBuffer: t,
            componentDatatype: i,
            componentsPerAttribute: 4,
            offsetInBytes: 0,
            strideInBytes: (e = (4 + a) * r),
          },
          {
            index: A.textureCoordAndEncodedNormals,
            vertexBuffer: t,
            componentDatatype: i,
            componentsPerAttribute: a,
            offsetInBytes: 4 * r,
            strideInBytes: e,
          },
        ]
      )
    }
    var n = 3,
      a = 0
    return (
      (this.hasWebMercatorT || this.hasVertexNormals) && ++n,
      this.hasWebMercatorT && this.hasVertexNormals
        ? (++a,
          [
            {
              index: q.compressed0,
              vertexBuffer: t,
              componentDatatype: i,
              componentsPerAttribute: n,
              offsetInBytes: 0,
              strideInBytes: (e = (n + 1) * r),
            },
            {
              index: q.compressed1,
              vertexBuffer: t,
              componentDatatype: i,
              componentsPerAttribute: 1,
              offsetInBytes: n * r,
              strideInBytes: e,
            },
          ])
        : [
            {
              index: q.compressed0,
              vertexBuffer: t,
              componentDatatype: i,
              componentsPerAttribute: n,
            },
          ]
    )
  }),
    (w.prototype.getAttributeLocations = function () {
      return this.quantization === z.NONE ? A : q
    }),
    (w.clone = function (t, e) {
      return (
        l.defined(e) || (e = new w()),
        (e.quantization = t.quantization),
        (e.minimumHeight = t.minimumHeight),
        (e.maximumHeight = t.maximumHeight),
        (e.center = p.Cartesian3.clone(t.center)),
        (e.toScaledENU = h.Matrix4.clone(t.toScaledENU)),
        (e.fromScaledENU = h.Matrix4.clone(t.fromScaledENU)),
        (e.matrix = h.Matrix4.clone(t.matrix)),
        (e.hasVertexNormals = t.hasVertexNormals),
        (e.hasWebMercatorT = t.hasWebMercatorT),
        e
      )
    }),
    (t.EllipsoidalOccluder = i),
    (t.TerrainEncoding = w)
})