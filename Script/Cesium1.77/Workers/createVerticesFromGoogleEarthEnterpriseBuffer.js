define([
  "./when-cbf8cd21",
  "./Check-35e1a91d",
  "./Math-e66fad2a",
  "./Cartesian2-ec968a07",
  "./Transforms-a4b96eff",
  "./RuntimeError-f4c64df1",
  "./WebGLConstants-95ceb4e9",
  "./ComponentDatatype-7ee14e67",
  "./AttributeCompression-322f5984",
  "./IntersectionTests-ea61529d",
  "./Plane-5f5ff4d5",
  "./WebMercatorProjection-851fee3c",
  "./createTaskProcessorWorker",
  "./EllipsoidTangentPlane-174b31fd",
  "./OrientedBoundingBox-1970b4e5",
  "./TerrainEncoding-c4353542",
], function (Ee, e, Te, Ce, ve, Me, t, i, n, r, a, Ne, o, xe, be, Se) {
  "use strict";
  var we = Uint16Array.BYTES_PER_ELEMENT,
    Pe = Int32Array.BYTES_PER_ELEMENT,
    Be = Uint32Array.BYTES_PER_ELEMENT,
    ye = Float32Array.BYTES_PER_ELEMENT,
    Ae = Float64Array.BYTES_PER_ELEMENT;
  function Re(e, t, i) {
    i = Ee.defaultValue(i, Te.CesiumMath);
    for (var n = e.length, r = 0; r < n; ++r)
      if (i.equalsEpsilon(e[r], t, Te.CesiumMath.EPSILON12)) return r;
    return -1;
  }
  var _e = new Ce.Cartographic(),
    We = new Ce.Cartesian3(),
    Fe = new Ce.Cartesian3(),
    Oe = new Ce.Cartesian3(),
    Ye = new ve.Matrix4();
  function ke(e, t, i, n, r, a, o, s, u, h) {
    for (var c = o.length, d = 0; d < c; ++d) {
      var g = o[d],
        l = g.cartographic,
        m = g.index,
        p = e.length,
        I = l.longitude,
        f = l.latitude,
        f = Te.CesiumMath.clamp(
          f,
          -Te.CesiumMath.PI_OVER_TWO,
          Te.CesiumMath.PI_OVER_TWO
        ),
        l = l.height - a.skirtHeight;
      (a.hMin = Math.min(a.hMin, l)),
        Ce.Cartographic.fromRadians(I, f, l, _e),
        u && (_e.longitude += s),
        u
          ? d === c - 1
            ? (_e.latitude += h)
            : 0 === d && (_e.latitude -= h)
          : (_e.latitude += s);
      f = a.ellipsoid.cartographicToCartesian(_e);
      e.push(f),
        t.push(l),
        i.push(Ce.Cartesian2.clone(i[m])),
        0 < n.length && n.push(n[m]),
        ve.Matrix4.multiplyByPoint(a.toENU, f, We);
      (l = a.minimum), (f = a.maximum);
      Ce.Cartesian3.minimumByComponent(We, l, l),
        Ce.Cartesian3.maximumByComponent(We, f, f);
      f = a.lastBorderPoint;
      Ee.defined(f) && ((f = f.index), r.push(f, p - 1, p, p, m, f)),
        (a.lastBorderPoint = g);
    }
  }
  return o(function (e, t) {
    (e.ellipsoid = Ce.Ellipsoid.clone(e.ellipsoid)),
      (e.rectangle = Ce.Rectangle.clone(e.rectangle));
    var i = (function (e, t, i, n, r, a, o, s, u, h) {
        var c, d, g, l, m;
        ce = Ee.defined(n)
          ? ((c = n.west),
            (d = n.south),
            (g = n.east),
            (l = n.north),
            (m = n.width),
            n.height)
          : ((c = Te.CesiumMath.toRadians(r.west)),
            (d = Te.CesiumMath.toRadians(r.south)),
            (g = Te.CesiumMath.toRadians(r.east)),
            (l = Te.CesiumMath.toRadians(r.north)),
            (m = Te.CesiumMath.toRadians(n.width)),
            Te.CesiumMath.toRadians(n.height));
        var p,
          I,
          f = [d, l],
          E = [c, g],
          T = ve.Transforms.eastNorthUpToFixedFrame(t, i),
          C = ve.Matrix4.inverseTransformation(T, Ye);
        s &&
          ((p = Ne.WebMercatorProjection.geodeticLatitudeToMercatorAngle(d)),
          (I =
            1 /
            (Ne.WebMercatorProjection.geodeticLatitudeToMercatorAngle(l) - p)));
        var v = new DataView(e),
          M = Number.POSITIVE_INFINITY,
          N = Number.NEGATIVE_INFINITY,
          x = Fe;
        (x.x = Number.POSITIVE_INFINITY),
          (x.y = Number.POSITIVE_INFINITY),
          (x.z = Number.POSITIVE_INFINITY);
        var b = Oe;
        (b.x = Number.NEGATIVE_INFINITY),
          (b.y = Number.NEGATIVE_INFINITY),
          (b.z = Number.NEGATIVE_INFINITY);
        var S,
          w,
          P = 0,
          B = 0,
          y = 0;
        for (w = 0; w < 4; ++w) {
          var A = P;
          (S = v.getUint32(A, !0)), (A += Be);
          var R = Te.CesiumMath.toRadians(180 * v.getFloat64(A, !0));
          (A += Ae), -1 === Re(E, R) && E.push(R);
          R = Te.CesiumMath.toRadians(180 * v.getFloat64(A, !0));
          (A += Ae), -1 === Re(f, R) && f.push(R), (A += 2 * Ae);
          R = v.getInt32(A, !0);
          (A += Pe),
            (B += R),
            (R = v.getInt32(A, !0)),
            (y += 3 * R),
            (P += S + Be);
        }
        var _ = [],
          W = [],
          F = new Array(B),
          O = new Array(B),
          Y = new Array(B),
          k = s ? new Array(B) : [],
          U = new Array(y),
          V = [],
          H = [],
          L = [],
          D = [],
          G = 0,
          j = 0;
        for (w = P = 0; w < 4; ++w) {
          S = v.getUint32(P, !0);
          var z = (P += Be),
            q = Te.CesiumMath.toRadians(180 * v.getFloat64(P, !0));
          P += Ae;
          var J = Te.CesiumMath.toRadians(180 * v.getFloat64(P, !0));
          P += Ae;
          var K = Te.CesiumMath.toRadians(180 * v.getFloat64(P, !0)),
            Q = 0.5 * K;
          P += Ae;
          var X = Te.CesiumMath.toRadians(180 * v.getFloat64(P, !0)),
            Z = 0.5 * X;
          P += Ae;
          var $ = v.getInt32(P, !0);
          P += Pe;
          var ee = v.getInt32(P, !0);
          (P += Pe), (P += Pe);
          for (var te = new Array($), ie = 0; ie < $; ++ie) {
            var ne = q + v.getUint8(P++) * K;
            _e.longitude = ne;
            var re = J + v.getUint8(P++) * X;
            _e.latitude = re;
            var ae = v.getFloat32(P, !0);
            if (
              ((P += ye),
              0 !== ae && ae < h && (ae *= -Math.pow(2, u)),
              (ae *= 6371010 * a),
              (_e.height = ae),
              -1 !== Re(E, ne) || -1 !== Re(f, re))
            ) {
              var oe = Re(_, _e, Ce.Cartographic);
              if (-1 !== oe) {
                te[ie] = W[oe];
                continue;
              }
              _.push(Ce.Cartographic.clone(_e)), W.push(G);
            }
            (te[ie] = G),
              Math.abs(ne - c) < Q
                ? V.push({ index: G, cartographic: Ce.Cartographic.clone(_e) })
                : Math.abs(ne - g) < Q
                ? L.push({ index: G, cartographic: Ce.Cartographic.clone(_e) })
                : Math.abs(re - d) < Z
                ? H.push({ index: G, cartographic: Ce.Cartographic.clone(_e) })
                : Math.abs(re - l) < Z &&
                  D.push({ index: G, cartographic: Ce.Cartographic.clone(_e) }),
              (M = Math.min(ae, M)),
              (N = Math.max(ae, N)),
              (Y[G] = ae);
            ae = i.cartographicToCartesian(_e);
            (F[G] = ae),
              s &&
                (k[G] =
                  (Ne.WebMercatorProjection.geodeticLatitudeToMercatorAngle(
                    re
                  ) -
                    p) *
                  I),
              ve.Matrix4.multiplyByPoint(C, ae, We),
              Ce.Cartesian3.minimumByComponent(We, x, x),
              Ce.Cartesian3.maximumByComponent(We, b, b);
            ne = (ne - c) / (g - c);
            ne = Te.CesiumMath.clamp(ne, 0, 1);
            re = (re - d) / (l - d);
            (re = Te.CesiumMath.clamp(re, 0, 1)),
              (O[G] = new Ce.Cartesian2(ne, re)),
              ++G;
          }
          for (var se = 3 * ee, ue = 0; ue < se; ++ue, ++j)
            (U[j] = te[v.getUint16(P, !0)]), (P += we);
          if (S !== P - z) throw new Me.RuntimeError("Invalid terrain tile.");
        }
        (F.length = G), (O.length = G), (Y.length = G), s && (k.length = G);
        var he = G,
          r = j,
          e = {
            hMin: M,
            lastBorderPoint: void 0,
            skirtHeight: o,
            toENU: C,
            ellipsoid: i,
            minimum: x,
            maximum: b,
          };
        V.sort(function (e, t) {
          return t.cartographic.latitude - e.cartographic.latitude;
        }),
          H.sort(function (e, t) {
            return e.cartographic.longitude - t.cartographic.longitude;
          }),
          L.sort(function (e, t) {
            return e.cartographic.latitude - t.cartographic.latitude;
          }),
          D.sort(function (e, t) {
            return t.cartographic.longitude - e.cartographic.longitude;
          });
        o = 1e-5;
        {
          var ce;
          ke(F, Y, O, k, U, e, V, -o * m, !0, -o * ce),
            ke(F, Y, O, k, U, e, H, -o * ce, !1),
            ke(F, Y, O, k, U, e, L, o * m, !0, o * ce),
            ke(F, Y, O, k, U, e, D, o * ce, !1),
            0 < V.length &&
              0 < D.length &&
              ((ge = V[0].index),
              (le = D[D.length - 1].index),
              (ce = F.length - 1),
              U.push(le, ce, he, he, ge, le));
        }
        B = F.length;
        var de,
          ge = ve.BoundingSphere.fromPoints(F);
        Ee.defined(n) &&
          (de = be.OrientedBoundingBox.fromRectangle(n, M, N, i));
        for (
          var le = new Se.EllipsoidalOccluder(
              i
            ).computeHorizonCullingPointPossiblyUnderEllipsoid(t, F, M),
            n = new xe.AxisAlignedBoundingBox(x, b, t),
            me = new Se.TerrainEncoding(n, e.hMin, N, T, !1, s),
            pe = new Float32Array(B * me.getStride()),
            Ie = 0,
            fe = 0;
          fe < B;
          ++fe
        )
          Ie = me.encode(pe, Ie, F[fe], O[fe], Y[fe], void 0, k[fe]);
        (t = V.map(function (e) {
          return e.index;
        }).reverse()),
          (n = H.map(function (e) {
            return e.index;
          }).reverse()),
          (e = L.map(function (e) {
            return e.index;
          }).reverse()),
          (T = D.map(function (e) {
            return e.index;
          }).reverse());
        return (
          n.unshift(e[e.length - 1]),
          n.push(t[0]),
          T.unshift(t[t.length - 1]),
          T.push(e[0]),
          {
            vertices: pe,
            indices: new Uint16Array(U),
            maximumHeight: N,
            minimumHeight: M,
            encoding: me,
            boundingSphere3D: ge,
            orientedBoundingBox: de,
            occludeePointInScaledSpace: le,
            vertexCountWithoutSkirts: he,
            indexCountWithoutSkirts: r,
            westIndicesSouthToNorth: t,
            southIndicesEastToWest: n,
            eastIndicesNorthToSouth: e,
            northIndicesWestToEast: T,
          }
        );
      })(
        e.buffer,
        e.relativeToCenter,
        e.ellipsoid,
        e.rectangle,
        e.nativeRectangle,
        e.exaggeration,
        e.skirtHeight,
        e.includeWebMercatorT,
        e.negativeAltitudeExponentBias,
        e.negativeElevationThreshold
      ),
      n = i.vertices;
    return (
      t.push(n.buffer),
      (e = i.indices),
      t.push(e.buffer),
      {
        vertices: n.buffer,
        indices: e.buffer,
        numberOfAttributes: i.encoding.getStride(),
        minimumHeight: i.minimumHeight,
        maximumHeight: i.maximumHeight,
        boundingSphere3D: i.boundingSphere3D,
        orientedBoundingBox: i.orientedBoundingBox,
        occludeePointInScaledSpace: i.occludeePointInScaledSpace,
        encoding: i.encoding,
        vertexCountWithoutSkirts: i.vertexCountWithoutSkirts,
        indexCountWithoutSkirts: i.indexCountWithoutSkirts,
        westIndicesSouthToNorth: i.westIndicesSouthToNorth,
        southIndicesEastToWest: i.southIndicesEastToWest,
        eastIndicesNorthToSouth: i.eastIndicesNorthToSouth,
        northIndicesWestToEast: i.northIndicesWestToEast,
      }
    );
  });
});
