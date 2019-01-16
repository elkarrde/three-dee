// sceneModels.js

var updateModels = function() {
  activeTheme = $('#themeSelect').val()
  $('#typeSelect option').remove()
  $('#typeSelectM option').remove()
  models.forEach(function(model) {
    var modelTheme = modelsMap[model].theme
    if (activeTheme === modelTheme) {
      var name = modelsMap[model].name
      $('#typeSelect').append('<option value="' + model + '">' + name + '</option>')
      $('#typeSelectM').append('<option value="' + model + '">' + name + '</option>')
    }
  })
}

function placeModels(scene, cellData) {
  var location = cellData.LocationIn3d
  var objArray = cellData.Services
  var cell = new THREE.Group()

  var posX = -5 * sqSize + parseInt(location[0], 10) * sqSize
  var posZ = -5 * sqSize + parseInt(location[1], 10) * sqSize

  var sqOffset = {
    x: -5 + parseInt(location[0], 10),
    z: -5 + parseInt(location[1], 10)
  }

  var ic = 0
  objArray.forEach(function(obj) {
    console.log('OBJ', obj)
    var mdlArr = Object.getOwnPropertyNames(modelsMap)
    var objModel = mdlArr[rnd(0, mdlArr.length - 1)]
    if (obj.Model) {
      objModel = obj.Model
    }
    var logoModel = obj.Logo
    addModel(cell, objModel, logoModel, sqOffset)
    ic++
  })

  scene.add(cell)
}

function createObject(scene, objName, params, callback) {
  var loader = new THREE.MTLLoader()

  var objPath = './res/obj/'
  if (modelsMap[objName] && modelsMap[objName].hasOwnProperty('doubleSided')) { loader.setMaterialOptions({ side: THREE.DoubleSide }) }
  loader.load(
    objPath + objName + '.mtl',
    function (materials) {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials).load(objPath + objName + '.obj', function (object) {
          callback(object, params)
        },
        function (xhr) {
          // do nothing
        },
        function (err) {
          console.error('An error happened while loading MTL object.', err);
        }
      )
    }
  )
}

function createGltfObj(scene, objName, params, callback) {
  var loader = new THREE.GLTFLoader()

  var objPath = './res/obj/'
  loader.load(
    objPath + objName + '.gltf',
    function (gltf) {
      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Scene
      gltf.scenes; // Array<THREE.Scene>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      var helper = new THREE.BoxHelper(gltf.scene, 0x00ff00)
      scene.add(helper)
      callback(gltf, params)
    },
    function (xhr) {
      // do nothing
    },
    function (err) {
      console.log('An error happened while loading glTF object.', err);
    }
  )
}
function createFbxObj(scene, objName, params, callback) {
  var loader = new THREE.FBXLoader()

  var objPath = './res/obj/'
  loader.load(
    objPath + objName + '.fbx',
    function (object) {
      mixer = new THREE.AnimationMixer(object)
      var action = mixer.clipAction(object.animations[0])
      action.play()
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true

        }
      });
      var helper = new THREE.BoxHelper(object, 0xff0000)
      scene.add(object)
      scene.add(helper)
      callback(object, params, action)
  })
}

function addModel(scene, model, logoModel, sqOffset) {
  console.log('AMx -->', model, sqOffset)
  if (modelsMap[model].model) {
    var mdl = modelsMap[model].model.clone()
    modelsMap[model].map.push(mdl.id)
    var oX = 0
    var oZ = 0
    if (sqOffset && typeof sqOffset === 'object') {
      oX = -1000 + sqSize * sqOffset.x
      oZ = -1000 + sqSize * sqOffset.z
    }
    mdl.position.x = oX + modelsMap[model].oX
    mdl.position.z = oZ + modelsMap[model].oZ
    modelsMap[model].count++

    var group = new THREE.Group();

    var tmpLogoObj = logoMap[logoModel]
    var tlgo = Object.getOwnPropertyNames(logoMap)
    var trl = rnd(0, tlgo.length - 1)
    var lgo = logoMap[tlgo[trl]]
    var logoObj = tmpLogoObj? tmpLogoObj : lgo
    //console.log('LOx', tlgo[trl], logoObj)

    var logo = null
    try {
      logo = logoObj.model.clone()
    } catch(e) {
      console.warn('Could not load logo object:', logoObj, logoModel, e)
    }
    if (logo) {
      logoMap[tlgo[trl]].map.push(logo.id)
      var box = new THREE.Box3().setFromObject(mdl)
      logo.position.x = mdl.position.x + logoObj.oX
      logo.position.y = box.max.y + 15 + modelsMap[model].lY
      logo.position.z = mdl.position.z + logoObj.oZ
      console.log('LOx', logoObj.oX, logoObj.oZ)
      group.add(logo)
    }
    group.add(mdl)

    var helper = new THREE.BoxHelper(mdl, 0x0000ff)
    helper.visible = false
    group.add(helper)

    scene.add(group)
  } else {
    createObject(scene, model, sqOffset, function(obj, sqOffset) {
      obj.scale.set(modelsMap[model].scale, modelsMap[model].scale, modelsMap[model].scale)
      var oX = 0
      var oZ = 0
      if (sqOffset && typeof sqOffset === 'object') {
        oX = -1000 + sqSize * sqOffset.x
        oZ = -1000 + sqSize * sqOffset.z
      }
      obj.position.x = oX + modelsMap[model].oX
      obj.position.z = oZ + modelsMap[model].oZ

      obj.userData.type = model
      obj.userData.model = 'model'
      obj.userData.name = modelsMap[model].name
      obj.userData.theme = modelsMap[model].theme

      modelsMap[model].count = 1
      modelsMap[model].model = obj
      modelsMap[model].map.push(obj.id)

      var group = new THREE.Group();
      //var tmpLogoObj = logoMap.find(function(itm) { return logoMap.indexOf(itm.name) > -1 })
      //var tmpLogoObj = logoMap.find(function(itm) { return itm.name == logoModel })
      //var logoObj = tmpLogoObj? tmpLogoObj : logoMap[rnd(0, logoMap.length)]

      var tmpLogoObj = logoMap[logoModel]

      var tlgo = Object.getOwnPropertyNames(logoMap)
      var trl = rnd(0, tlgo.length - 1)
      var lgo = logoMap[tlgo[trl]]

      var logoObj = tmpLogoObj? tmpLogoObj : lgo
      //console.log('LOz', tlgo[trl], logoObj)

      var logo = null
      try {
        logo = logoObj.model.clone()
      } catch(e) {
        console.warn('Could not load logo object:', logoObj, logoModel, e)
      }
      if (logo) {
        logoMap[tlgo[trl]].map.push(logo.id)
        var box = new THREE.Box3().setFromObject(obj)
        logo.position.x = obj.position.x + logoObj.oX
        logo.position.y = box.max.y + 15 + modelsMap[model].lY
        logo.position.z = obj.position.z + logoObj.oZ
        //logo.position.x = obj.position.x + modelsMap[model].lX + logoObj.oX
        //logo.position.y = modelsMap[model].lY + 15
        //logo.position.z = obj.position.z + modelsMap[model].lZ + logoObj.oZ
        group.add(logo)
      }
      group.add(obj)

      var helper = new THREE.BoxHelper(obj, 0x00ffff)
      helper.visible = false
      group.add(helper)

      scene.add(group);
    })
  }
}
