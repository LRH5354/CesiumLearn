/* eslint-disable no-undef */
// eslint-disable-next-line no-var
var viewer = viewer;
// 将三维球定位到中国
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 1000000),
  orientation: {
    heading: Cesium.Math.toRadians(348.4202942851978),
    pitch: Cesium.Math.toRadians(-89.74026687972041),
    roll: Cesium.Math.toRadians(0),
  },
  complete: function callback() {
    console.log("compete");
    // 添加实体
    let myentity = viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -109.080842,
          45.002073,
          -105.91517,
          45.002073,
          -104.058488,
          44.996596,
          -104.053011,
          43.002989,
          -104.053011,
          41.003906,
          -105.728954,
          40.998429,
          -107.919731,
          41.003906,
          -109.04798,
          40.998429,
          -111.047063,
          40.998429,
          -111.047063,
          42.000709,
          -111.047063,
          44.476286,
          -111.05254,
          45.002073,
        ]),
        height: 0,
        material: Cesium.Color.RED.withAlpha(0.2),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    viewer.zoomTo(myentity);
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    creategltfModel("./model/barrel.gltf", 0.0);
    createglbModel("./model/barrel.glb");
  },
});

function creategltfModel(url, height) {
  // viewer.entities.removeAll();
  let position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  let heading = Cesium.Math.toRadians(135);
  let pitch = 0;
  let roll = 0;
  let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
  let entity = viewer.entities.add({
    name: url,
    position,
    orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });

  // viewer.trackedEntity = entity;
}

function createglbModel(url) {
  let { scene } = viewer;
  let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0.0)
  );
  let model = scene.primitives.add(
    Cesium.Model.fromGltf({
      url,
      modelMatrix,
      scale: 200.0,
    })
  );
  viewer.zoomTo(model);
}
