// sceneInitializers.js

function setConns() {
  addModel(scene, 'Tower_a', 'ubuntu',  { x: 36, z: 26 })
  addModel(scene, 'Cube_a',  'elastic', { x: 36, z: 29 })
  var lnk1 = createLink({
    start: { x: 36, z: 26 },
    end:   { x: 36, z: 29 }
  })
  scene.add(lnk1)
  links.push(lnk1)

  addModel(scene, 'Silos_a', 'centos', { x: 41, z: 28 })
  addModel(scene, 'Round_a', 'git',    { x: 44, z: 28 })
  var lnk2 = createLink({
    start: { x: 41, z: 28 },
    end:   { x: 44, z: 28 }
  })
  scene.add(lnk2)
  links.push(lnk2)
}

function initLogos() {
  logos.forEach(function(logo) {
    var sqOffset = {}
    var logoObj = logoMap[logo]
    createObject(scene, 'logos/' + logo, sqOffset, function(obj, sqOffset, type) {
      var xobj
      if (type && type === 'gltf') {
        obj.animations
        obj.scene
        obj.asset
        xobj = obj.scene
      } else {
        xobj = obj
      }
      xobj.scale.set(logoObj.scale, logoObj.scale, logoObj.scale)
      xobj.position.x = 10000
      xobj.position.z = 10000
      xobj.position.y = 10000
      xobj.userData.mode = 'logo'
      xobj.userData.type = logoObj.name

      logoObj.count = 0
      logoObj.model = xobj
      scene.add(xobj)
    })
  })
}

function initModels() {
  models.forEach(function(model) {
    var sqOffset = {}
    var modelObj = modelsMap[model]
    createObject(scene, model, sqOffset, function(obj, sqOffset, type) {
      console.log('Mx', model, modelObj)
      obj.scale.set(modelObj.scale, modelObj.scale, modelObj.scale)
      obj.position.x = 12000
      obj.position.y = 12000
      obj.position.z = 12000
      obj.userData.model = 'model'
      obj.userData.type = model
      obj.userData.name = modelObj.name
      obj.userData.theme = modelObj.theme
      modelObj.count = 0
      modelObj.model = obj
      scene.add(obj)
    })
  })
}

labels = {}
function initLabels() {
  var loader = new THREE.FontLoader();
  loader.load('res/fonts/helvetiker_regular.typeface.json', function(font) {
    var txtParams = {
      font: font,
      size: 20,
      height: 5,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1
    }
    var lMat = new THREE.MeshBasicMaterial({ color: 0x1bf7f9 }) //1bf7f9

    labels = new THREE.Group()
    for (var ti = 0; ti <= 9; ti++) {
      var textGeo = new THREE.TextGeometry(ti.toString(), txtParams);
      var textX = new THREE.Mesh(textGeo, lMat)
      var textZ = new THREE.Mesh(textGeo, lMat)
      textX.position.x = -905 + (ti * 200)
      textX.position.y = 1
      textX.position.z = -1030
      textX.rotation.x = Math.PI * 1.5

      textZ.position.x = -1050
      textZ.position.y = 1
      textZ.position.z = -890 + (ti * 200)
      textZ.rotation.x = Math.PI * 1.5

      labels[ti] = {
        'x': { map: textX },
        'z': { map: textZ }
      }

      labels.add(textX)
      labels.add(textZ)
    }

    labels.visible = false
    scene.add(labels)
  });
}