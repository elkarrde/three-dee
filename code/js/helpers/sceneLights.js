// sceneLights.js

function addHemiLight(scene, params) {
  var hemiLight = new THREE.HemisphereLight(params.color, params.groundColor, params.intensity)
  hemiLight.position.set(params.coords.x, params.coords.y, params.coords.z);
  scene.add(hemiLight);
  if (params.helper !== false) {
    var hlHelper = new THREE.HemisphereLightHelper(hemiLight, 50, 0xffff00)
    scene.add(hlHelper);
  }

  return hemiLight
}
function addDirLight(scene, params) {
  var dirLight = new THREE.DirectionalLight(params.color, params.intensity)
  dirLight.position.set(params.coords.x, params.coords.y, params.coords.z)
  dirLight.castShadow = false
  dirLight.target.position.set(params.coords.x, 0, params.coords.z)
  scene.add(dirLight)
  scene.add(dirLight.target)

  var dlHelper = new THREE.DirectionalLightHelper(dirLight, 10, 0x0088ff)
  scene.add(dlHelper)

  return dirLight
}
function addSpotLight(scene, params) {
  var spotLight = new THREE.SpotLight(params.color, params.intensity)
  spotLight.position.set(params.coords.x, params.coords.y, params.coords.z)
  spotLight.castShadow = false
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = 200;
  scene.add(spotLight)

  var slHelper = new THREE.SpotLightHelper(spotLight, 10, 0x0000ff)
  scene.add(slHelper)

  return spotLight
}

