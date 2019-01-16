// eventHandlers.js

function onDocumentMouseUp(event) {
  if (event.button === 0) {
    var lMap = event.path.filter(function(x) { return $(x)[0].id === 'objttip' })
    if (lMap.length > 0) {
      event.preventDefault()
    } else {
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      // console.log('CLKx', event.clientX, event.clientY, mouse.x, mouse.y)

      var intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length >= 1) {
        if (noClickObjects.indexOf(intersects[0].object.name) === -1) {
          // console.log('Clicked object type: ', intersects[0].object.geometry.name || intersects[0].object.name)
          // $('#objttip').css('left', event.x + 50).css('top', event.y).removeClass('hide')
          // $('.obj-panel').removeClass('hide')
          $('.obj-panel .obj-dist').text(intersects[0].distance)
          $('.obj-panel .obj-type').text(intersects[0].object.parent.userData.type)
          $('.obj-panel .obj-uuid').text(intersects[0].object.uuid)

          var sObj = intersects[0].object.parent
          try {
            setInspector(sObj, vport)
          } catch(e) {
            console.warn('Eek!', sObj, e)
          }
        } else {
          $('.obj-panel').addClass('hide')
          // clearInspector(vport)
        }
      } else {
        // $('#objttip').addClass('hide')
      }
    }
  }
}
document.addEventListener('mouseup', onDocumentMouseUp, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

