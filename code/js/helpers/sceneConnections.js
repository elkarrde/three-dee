// sceneConnections.js

var linkShape = new THREE.Shape()
var linkMaterial = new THREE.MeshBasicMaterial({ color: 0x1f6163 }) //1bf7f9

var createLink = function(lnkData) {
  var lenX = Math.abs(lnkData.start.x - lnkData.end.x)
  var lenZ = Math.abs(lnkData.start.z - lnkData.end.z)

  linkShape.moveTo(0 - 1, 0)
  linkShape.lineTo(0 - 1, Math.max(lenX, lenZ) * sqSize)
  linkShape.lineTo(0 + 1, Math.max(lenX, lenZ) * sqSize)
  linkShape.lineTo(0 + 1, 0)
  linkShape.lineTo(0 - 1, 0)

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
