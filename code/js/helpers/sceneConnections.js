// sceneConnections.js

var linkShape = new THREE.Shape()
var linkMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }) //1bf7f9, 1f6163

var createLink = function(lnkData) {
  var lenX = Math.abs(lnkData.start.x - lnkData.end.x)
  var lenZ = Math.abs(lnkData.start.z - lnkData.end.z)

  var lWidth = 0.5
  linkShape.moveTo(0 - lWidth, 0)
  linkShape.lineTo(0 - lWidth, Math.max(lenX, lenZ) * sqSize)
  linkShape.lineTo(0 + lWidth, Math.max(lenX, lenZ) * sqSize)
  linkShape.lineTo(0 + lWidth, 0)
  linkShape.lineTo(0 - lWidth, 0)

  var extrudeParams = {
    steps: 1,
    depth: 2,
    bevelEnabled: false
  }

  var linkGeometry = new THREE.ExtrudeGeometry(linkShape, extrudeParams)
  var link = new THREE.Mesh(linkGeometry, linkMaterial)
  link.position.x = sqPos(lnkData.start.x)
  link.position.y = 1
  link.position.z = sqPos(lnkData.start.z)
  link.rotation.x = Math.PI / 2
  if (lenX > lenZ) { link.rotation.z = -Math.PI * 0.5 }
  link.visible = true

  link.userData.start = lnkData.start
  link.userData.end = lnkData.end
  link.userData.length = Math.max(lenX, lenZ) * sqSize
  link.userData.orientation = (lenX > lenZ)? 1 : 0

  return link
}

var calcParticles = function(delta) {
  if (!delta) { delta = 0 }
  var outArr = []

  links.forEach(function(lnk) {
    if (cX > sqPos(lnk.userData.end.x)) { cX = sqPos(lnk.userData.start.x) }
    var cX = sqPos(lnk.userData.start.x + delta)

    if (cZ > sqPos(lnk.userData.end.z)) { cZ = sqPos(lnk.userData.start.z) }
    var cZ = sqPos(lnk.userData.start.z + delta)

    outArr.push(new THREE.Vector3(cX, 5, cZ))
  })

  return outArr
}

var placeConnections = function(scene, cellData) {
  var location = cellData.LocationIn3d
  var lnkArray = cellData.Connections
  var cell = new THREE.Group()

  var posX = parseInt(location[0], 10) * gridBoxLine
  var posZ = parseInt(location[1], 10) * gridBoxLine

  var sqOffset = {
    x: posX,
    z: posZ
  }

  var ic = 0
  lnkArray.forEach(function(obj) {
    console.log('CONNECTION', location, obj)

    var sqOffS = iterationCopy(sqOffset)
    sqOffS.x += parseInt(obj.FromLocationIn3dTile[0], 10)
    sqOffS.z += parseInt(obj.FromLocationIn3dTile[1], 10)
    
    var sqOffE = iterationCopy(sqOffset)
    sqOffE.x += parseInt(obj.ToLocationIn3dTile[0], 10)
    sqOffE.z += parseInt(obj.ToLocationIn3dTile[1], 10)
    
    var lnk = createLink({
      start: sqOffS,
      end:   sqOffE
    })

    lnk.userData.origin = location

    scene.add(lnk)
    links.push(lnk)
    ic++
  })

  scene.add(cell)

}