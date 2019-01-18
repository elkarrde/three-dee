// sceneModels.js

var updateModels = function() {
  activeTheme = $('#themeSelect').val()
  $('#themeSelectM').val(activeTheme)

  console.log('Switch to theme:', activeTheme, themesMap[activeTheme])
  $('#typeSelect option').remove()
  $('#typeSelectM option').remove()

  var allModelsIds = []
  models.forEach(function(model) {
    var modelTheme = modelsMap[model].theme
    if (activeTheme === modelTheme) {
      var name = modelsMap[model].name
      $('#typeSelect').append('<option value="' + name + '">' + name + '</option>')
      $('#typeSelectM').append('<option value="' + name + '">' + name + '</option>')
    }
    if (modelsMap[model].map.length > 0) {
      allModelsIds.push(...modelsMap[model].map)
    }
  })

  console.log('All models IDs:', allModelsIds)
  allModelsIds.forEach(function(modelId) {
    var mdl = scene.getObjectById(modelId)
    var lgo = scene.getObjectById(mdl.userData.logoId)
    var newModel = mdl.userData.name + themesMap[activeTheme]

    console.log('XO-%d:', modelId, newModel, mdl)

    mdl.visible = false
    lgo.visible = false
    addModel(scene, newModel, mdl.userData.logo, mdl.userData.sqOffset)
  })
}

function placeModels(scene, cellData) {
  //console.log('PMx', cellData)
  var location = cellData.LocationIn3d
  var objArray = cellData.Services
  var cell = new THREE.Group()

  var posX = parseInt(location[0], 10) * gridBoxLine
  var posZ = parseInt(location[1], 10) * gridBoxLine

  var sqOffset = {
    x: posX,
    z: posZ
  }

  var ic = 0
  objArray.forEach(function(obj) {
    console.log('SERVICE', obj)
    var objModel = models.find(function(itm) {
      return modelsMap[itm].name === obj.Model && modelsMap[itm].theme === activeTheme
    })
    var logoModel = logoMap[obj.Logo]

    sqOffset.x += parseInt(obj.LocationIn3dTile[0], 10)
    sqOffset.z += parseInt(obj.LocationIn3dTile[1], 10)
    //console.log('OBJx', objModel, obj.Logo, sqOffset)

    addModel(cell, objModel, obj.Logo, sqOffset)
    ic++
  })

  scene.add(cell)
}

function createObject(scene, objName, params, callback) {
  if (objName.indexOf('logos/') === 0) {
    createMtlObject(scene, objName, params, callback)
  } else if (modelType === 'mtl') {
    createGltfObject(scene, objName, params, callback)
  }
}

function createMtlObject(scene, objName, params, callback) {
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

function createGltfObject(scene, objName, params, callback) {
  var loader = new THREE.GLTFLoader()

  var objPath = './res/obj/gltf/'
  loader.load(
    objPath + objName + '.gltf',
    function (gltf) {
      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Scene
      gltf.scenes; // Array<THREE.Scene>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      // var helper = new THREE.BoxHelper(gltf.scene, 0x00ff00)
      // scene.add(helper)
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
      scene.add(object)
      // var helper = new THREE.BoxHelper(object, 0xff0000)
      // scene.add(helper)
      callback(object, params, action)
  })
}

function addModel(scene, model, logoModel, sqOffset) {
  console.log('AMx-->', model, logoModel, sqOffset)
  if (modelsMap[model].model) {
    console.log('Clone!', model, logoModel, sqOffset)
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
    mdl.userData.sqOffset = sqOffset
    mdl.userData.logo = logoModel
    modelsMap[model].count++

    var group = new THREE.Group();

    var tmpLogoObj = logoMap[logoModel]
    var tlgo = Object.getOwnPropertyNames(logoMap)
    var trl = rnd(0, tlgo.length - 1)
    var lgo = logoMap[tlgo[trl]]
    var logoObj = tmpLogoObj? tmpLogoObj : lgo

    var logo = null
    try {
      logo = logoObj.model.clone()
    } catch(e) {
      console.warn('Could not load logo object:', logoObj, logoModel, e)
    }
    if (logo) {
      logoMap[tlgo[trl]].map.push(logo.id)
      mdl.userData.logoId = logo.id
      var box = new THREE.Box3().setFromObject(mdl)
      logo.position.x = mdl.position.x + logoObj.oX
      logo.position.y = box.max.y + 15 + modelsMap[model].lY
      logo.position.z = mdl.position.z + logoObj.oZ
      logo.visible = true
      group.add(logo)
    }
    group.add(mdl)

    var helper = new THREE.BoxHelper(mdl, 0x0000ff)
    helper.visible = false
    group.add(helper)
    group.visible = true
    mdl.visible = true

    scene.add(group)
  } else {
    console.log('Create!', model, logoModel, sqOffset)
    createObject(scene, model, sqOffset, function(objx, sqOffset) {
      obj = objx
      var fixed = false

      if ('scene' in objx) {
        obj = objx.scene.children[0]
        fixed = true
      }

      if (!fixed) { obj.scale.set(modelsMap[model].scale, modelsMap[model].scale, modelsMap[model].scale) }
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
      obj.userData.sqOffset = sqOffset
      obj.userData.logo = logoModel

      modelsMap[model].count = 1
      modelsMap[model].model = obj
      modelsMap[model].map.push(obj.id)

      var group = new THREE.Group();
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
        obj.userData.logoId = logo.id
        var box = new THREE.Box3().setFromObject(obj)
        logo.position.x = obj.position.x + logoObj.oX
        logo.position.y = box.max.y + 15 + modelsMap[model].lY
        logo.position.z = obj.position.z + logoObj.oZ
        logo.visible = true
        group.add(logo)
      }
      obj.visible = true
      group.add(obj)

      var helper = new THREE.BoxHelper(obj, 0x00ffff)
      helper.visible = false
      group.add(helper)

      scene.add(group);
    })
  }
}
