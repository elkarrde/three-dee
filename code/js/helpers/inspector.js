// inspector.js

function setInspector(srcModel, destScene) {
  if (srcModel.type === 'Scene') { return false }
  console.log('Model:', srcModel.type, srcModel)

  var rmObj = destScene.getObjectByName('selected')
  destScene.remove(rmObj)

  var destModel = srcModel.clone()
  destModel.position.x = 0
  destModel.position.z = 0
  destModel.name = 'selected'
  destScene.add(destModel)

  vpcam.lookAt(destScene.position)
  vportEmpty = false

  $('.js-ctl').removeClass('hide')

  var box = new THREE.Box3().setFromObject(destModel)
  vpcam.position.x = box.max.x * 5
  vpcam.position.y = box.max.y - 5
  vpcam.position.z = box.max.z * 7.5

  var t = new THREE.Vector3()
  t.x = (box.max.x + box.min.x) / 2
  t.y = (box.max.y + box.min.y) / 2
  t.z = (box.max.z + box.min.z) / 2
  vpcam.lookAt(t)

  console.log('VCam', vpcam.position, t)
  vpobj = destModel
}
function clearInspector(destScene) {
  var rmObj = destScene.getObjectByName('selected')
  destScene.remove(rmObj)
  vportEmpty = true
  $('.js-ctl').addClass('hide')
}
