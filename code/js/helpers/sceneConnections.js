// sceneConnections.js

var linkShp = new THREE.Shape()

var createLink = function(lnkData) {
  if (!lnkData) { 
    lnkData = { x: 0, z: 120 }
  }
  var length = Math.abs(lnkData.x - lnkData.z)
  linkShp.moveTo(0 - 2, 0)
  linkShp.lineTo(0 - 2, length)
  linkShp.lineTo(0 + 2, length)
  linkShp.lineTo(0 + 2, 0)
  linkShp.lineTo(0 - 2, 0)

  var exs = {
    steps: 1,
    depth: 2,
    bevelEnabled: false
  }

  var lGeo = new THREE.ExtrudeGeometry(linkShp, exs)
  var lMat = new THREE.MeshBasicMaterial({ color: 0x1bf7f9 }) //1bf7f9
  var link = new THREE.Mesh(lGeo, lMat)
  link.position.x = 0
  link.position.y = 1
  link.position.z = 0
  link.rotation.x = Math.PI / 2

  return link
}

link = createLink()