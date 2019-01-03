function placeModels(scene, cellData) {
  var location = cellData.LocationIn3d
  var objArray = cellData.Services

  var posX = -5 * sqSize + parseInt(location[0], 10) * sqSize
  var posZ = -5 * sqSize + parseInt(location[1], 10) * sqSize

  var geometry = new THREE.BoxBufferGeometry(sqSize, 1, sqSize)
  var material = new THREE.MeshPhongMaterial({ color: 0x010101 })
  var base = new THREE.Mesh(geometry, material)
  base.position.x = posX + sqSize / 2
  base.position.z = posZ + sqSize / 2
  base.userData.name = 'CellBase'
  base.opacity = 0.25

  var cell = new THREE.Group()
  cell.add(base)
  var sqOffset = {
    x: -5 + location[0],
    z: -5 + location[1]
  }

  var ic = 0
  objArray.forEach(function(obj) {
    console.log('OBJ', obj)
    var mdlArr = Object.getOwnPropertyNames(modelsMap)
    var objModel = mdlArr[rnd(0, mdlArr.length - 1)]
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

