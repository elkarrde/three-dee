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

    var metadata = {
      source: 'JSON',
      name: 'FJ-' + ic
    }
    addModel(cell, objModel, obj.Logo, sqOffset, metadata)
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
      /*
      scene.add(gltf.scene);
      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Scene
      gltf.scenes; // Array<THREE.Scene>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
      */
      //console.log('GLTF', gltf)
      callback(gltf, params, 'gltf')
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
      callback(object, params, action)
  })
}

function addModel(scene, model, logoModel, sqOffset, metadata) {
  console.log('AMx-->', model, logoModel, sqOffset, metadata)
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
    if (metadata.source) { group.userData.source = metadata.source }
    if (metadata.name) { group.userData.name = metadata.name }

    scene.add(group)
  } else {
    console.log('Create!', model, logoModel, sqOffset, metadata)
    createObject(scene, model, sqOffset, function(objx, sqOffset, type) {
      obj = objx
      var fixed = false

      if (type && type === 'gltf') {
        obj = objx.scene
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

      var group = new THREE.Group()

      group.userData.type = model
      group.userData.model = 'model'
      group.userData.name = modelsMap[model].name
      group.userData.theme = modelsMap[model].theme
      group.userData.sqOffset = sqOffset

      if (metadata && metadata.source) { group.userData.source = metadata.source }
      if (metadata && metadata.name) { group.userData.name = metadata.name }

      modelsMap[model].count = 1
      modelsMap[model].model = obj
      modelsMap[model].map.push(obj.id)

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
        group.userData.logoId = logo.id
        group.userData.logo = logoModel
        var box = new THREE.Box3().setFromObject(obj)
        logo.position.x = obj.position.x + logoObj.oX
        logo.position.y = box.max.y + 15 + modelsMap[model].lY
        logo.position.z = obj.position.z + logoObj.oZ
        logo.visible = true
        group.add(logo)
      }
      obj.visible = true
      group.add(obj)

      if (type && type === 'gltf') {
        //scene.add(gltf.scene);
        obj.animations; // Array<THREE.AnimationClip>
        obj.scene; // THREE.Scene
        obj.scenes; // Array<THREE.Scene>
        obj.cameras; // Array<THREE.Camera>
        obj.asset; // Object
      }

      scene.add(group);
    })
  }
}
