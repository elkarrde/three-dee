// sceneConnections.js

var linkShape = new THREE.Shape()
var linkMaterial = new THREE.MeshBasicMaterial({ color: 0x1bf7f9 })

var createLink = function(lnkData) {
  var lenX = Math.abs(lnkData.start.x - lnkData.end.x)
  var lenZ = Math.abs(lnkData.start.z - lnkData.end.z)

  //console.log('LNKD', lnkData, lenX * sqSize, lenZ * sqSize, sqPos(lnkData.start.x), sqPos(lnkData.start.z))
  linkShape.moveTo(0 - 2, 0)
  linkShape.lineTo(0 - 2, Math.max(lenX, lenZ) * sqSize)
  linkShape.lineTo(0 + 2, Math.max(lenX, lenZ) * sqSize)
  linkShape.lineTo(0 + 2, 0)
  linkShape.lineTo(0 - 2, 0)

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

  //console.log('LNKM', link)
  return link
}
