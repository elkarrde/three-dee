// sceneInitializers.js

function setConns() {
  addModel(scene, 'Tower_a', 'ubuntu',  { x: 36, z: 26 })
  addModel(scene, 'Cube_a',  'elastic', { x: 36, z: 29 })

  setTimeout(function() {
    var mt = modelsMap.Tower_a.model
    var ms = modelsMap.Cube_a.model
    link.position.x = sqPos(36)
    link.position.z = sqPos(26)

    scene.add(link)
  }, 2000)

  addModel(scene, 'Silos_a', 'centos', { x: 39, z: 26 })
  addModel(scene, 'Round_a', 'git',    { x: 39, z: 29 })

  setTimeout(function() {
    var mwx = modelsMap.Silos_a.model
    var mcx = modelsMap.Round_a.model

    var link2 = link.clone()
    link2.position.x = sqPos(39)
    link2.position.z = sqPos(26)

    traffic.position.x = 560
    traffic.position.z = 640
    traffic.visible = true
    scene.add(link2)
  }, 2000)
}

function initLogos() {
  logos.forEach(function(logo) {
    var sqOffset = {}
    var logoObj = logoMap[logo]
    createObject(scene, 'logos/' + logo, sqOffset, function(obj, sqOffset) {
      obj.scale.set(logoObj.scale, logoObj.scale, logoObj.scale)
      obj.position.x = 10000
      obj.position.z = 10000
      obj.position.y = 10000
      obj.userData.mode = 'logo'
      obj.userData.type = logoObj.name
      obj.rotateX(Math.PI / 2);
      logoObj.count = 0
      logoObj.model = obj
      scene.add(obj)
    })
  })
}

function initModels() {
  models.forEach(function(model) {
    var sqOffset = {}
    var modelObj = modelsMap[model]
    createObject(scene, model, sqOffset, function(obj, sqOffset) {
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