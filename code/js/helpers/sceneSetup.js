// sceneSetup.js

function setupWorld() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
  camera.position.set(250, 250, 250);
  camera.translateX(500)
  camera.translateZ(1000)

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02070f);
  scene.fog = new THREE.Fog(0x02070f, 1000, 8000);

  // ground
  ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x02070f, map: gndTexture, depthWrite: true }));
  ground.name = 'Ground'
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = false;
  ground.opacity = 0.8
  scene.add(ground);

  plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(16000, 16000), new THREE.MeshPhongMaterial({
    color: 0x02070f,
    map: plnTexture,
    depthWrite: true
  }));
  plane.name = 'Plane'
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = false;
  plane.opacity = 1
  plane.position.y = -0.5
  scene.add(plane);

  var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
  geometry.name = 'GndMirror'
  groundMirror = new THREE.Reflector(geometry, {
    clipBias: 0.8,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x848484,
    recursion: 1,
    map: gndTexture
  });
  groundMirror.name = 'GndMrr'
  groundMirror.position.y = 0.5;
  groundMirror.rotateX(-Math.PI / 2);
  groundMirror.visible = true
  scene.add(groundMirror);

  mrrFadeout = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshBasicMaterial({ color: 0xffffff, map: gndTexture, opacity : 0.85, transparent: true, depthWrite: true }))
  mrrFadeout.name = 'FadeoutMrr'
  mrrFadeout.position.y = 0.85
  mrrFadeout.rotateX(-Math.PI / 2)
  mrrFadeout.visible = true
  scene.add(mrrFadeout)

  /*
  grid = new THREE.GridHelper(1800, 33, 0x01d7d7, 0x01d7d7); //0x3bff7f
  grid.name = 'Grid'
  grid.material.opacity = 1;
  grid.material.transparent = true;
  grid.position.y = 1;
  grid.visible = false;
  scene.add(grid);

  var subGrid = new THREE.GridHelper(2000, 100, 0x449960, 0x449960);
  subGrid.name = 'SubGrid'
  subGrid.material.opacity = 0.75;
  subGrid.material.transparent = true;
  subGrid.position.y = 0.05;
  subGrid.visible = false;
  scene.add(subGrid);
  */
  //scene.background = sky

  // hemiLight - main, central
  hemiLights.push(addHemiLight(scene, {
    color: 0xffffff,
    groundColor: 0xaaaaaa,
    intensity: 1,
    coords: { x: 0, y: 1000, z: 0 }
  }))
  // hemiLight - bordering
  hemiLights.push(addHemiLight(scene, {
    color: 0xffffff,
    groundColor: 0xaaaaaa,
    intensity: 1,
    coords: { x: 500, y: 1000, z: 500 }
  }))
  hemiLights.push(addHemiLight(scene, {
    color: 0xffffff,
    groundColor: 0xaaaaaa,
    intensity: 1,
    coords: { x: 500, y: 1000, z: -500 }
  }))
  hemiLights.push(addHemiLight(scene, {
    color: 0xffffff,
    groundColor: 0xaaaaaa,
    intensity: 1,
    coords: { x: -500, y: 1000, z: -500 }
  }))
  hemiLights.push(addHemiLight(scene, {
    color: 0xffffff,
    groundColor: 0xaaaaaa,
    intensity: 1,
    coords: { x: -500, y: 1000, z: 500 }
  }))

  ambiLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambiLight)

  particleSystem = new THREE.GPUParticleSystem({
    maxParticles: 250000
  });
  scene.add(particleSystem);

  var linkShp = new THREE.Shape()
  linkShp.moveTo(500 - 2, 500)
  linkShp.lineTo(500 - 2, 620)
  linkShp.lineTo(500 + 2, 620)
  linkShp.lineTo(500 + 2, 500)
  linkShp.lineTo(500 - 2, 500)

  var exs = {
    steps: 1,
    depth: 2,
    bevelEnabled: false
  }

  var lGeo = new THREE.ExtrudeGeometry(linkShp, exs)
  var lMat = new THREE.MeshBasicMaterial({ color: 0x1bf7f9 }) //1bf7f9
  link = new THREE.Mesh(lGeo, lMat)
  link.position.x = 0
  link.position.y = 1
  link.position.z = 0
  link.rotation.x = Math.PI / 2

  var trafGeo = new THREE.BoxGeometry(5, 5, 5)
  var trafMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  var trafMesh = new THREE.Mesh(trafGeo, trafMat)
  traffic = new THREE.Group()

  var tmpMesh1 = trafMesh.clone()
  tmpMesh1.position.z = 7
  var tmpMesh2 = trafMesh.clone()
  tmpMesh2.position.z = 14
  traffic.add(trafMesh)
  traffic.add(tmpMesh1)
  traffic.add(tmpMesh2)

  traffic.position.x = 0
  traffic.position.y = 5
  traffic.position.z = 0
  traffic.visible = false

  scene.add(traffic)

  //SKY
  var skyGeometry = new THREE.SphereBufferGeometry(6000, 100, 100);
  var skyMaterial = new THREE.MeshPhongMaterial({
    map: sky,
    flatShading: true
  });
  skyMaterial.side = THREE.BackSide;
  earthMesh = new THREE.Mesh(skyGeometry, skyMaterial);

  scene.add(earthMesh);
}

function setupView(domElm) {
  vpcam = new THREE.PerspectiveCamera(45, $(domElm).width() / $(domElm).height(), 1, 1000);
  vpcam.position.set(100, 50, 100);

  vport = new THREE.Scene();
  vport.background = new THREE.Color(0x000205);
  vport.fog = new THREE.Fog(0x000205, 500, 900);

  var vgnd = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500), new THREE.MeshPhongMaterial({ color: 0x000609, depthWrite: true }));
  vgnd.name = 'vGround'
  vgnd.rotation.x = -Math.PI / 2;
  vgnd.receiveShadow = false;
  vgnd.opacity = 0.8
  vport.add(vgnd);

  var vpGeo = new THREE.PlaneBufferGeometry(500, 500);
  vpGeo.name = 'vGndMirror'
  vpGMrr = new THREE.Reflector(vpGeo, {
    clipBias: 0.8,
    textureWidth: $(domElm).width() * window.devicePixelRatio,
    textureHeight: $(domElm).height() * window.devicePixelRatio,
    color: 0x848484,
    recursion: 1
  });
  vpGMrr.name = 'vGndMrr'
  vpGMrr.position.y = 0.5;
  vpGMrr.rotateX(-Math.PI / 2);
  vport.add(vpGMrr);

  vMrrFadeout = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500), new THREE.MeshBasicMaterial({ color: 0x3f93ab, opacity : 0.9 , transparent: true }))
  vMrrFadeout.name = 'vFadeoutMrr'
  vMrrFadeout.position.y = 0.85
  vMrrFadeout.rotateX(-Math.PI / 2)
  vport.add(vMrrFadeout)

  var grid = new THREE.GridHelper(500, 10, 0xffffff, 0x66aacc)
  grid.name = 'vGrid'
  grid.material.opacity = 1;
  grid.material.transparent = true;
  grid.position.y = 0.5;
  grid.visible = true;
  vport.add(grid);

  var vpsky = new THREE.TextureLoader().load('./res/backgrounds/48113.jpg')
  vport.background = vpsky

  addHemiLight(vport, {
    color: 0xffffff,
    groundColor: 0xaaaaaa,
    intensity: 5,
    coords: { x: 0, y: 250, z: 0 },
    helper: false
  })
  var vambilight = new THREE.AmbientLight(0xffffff, 3)
  vport.add(vambilight)
}

gndTexture = new THREE.TextureLoader().load('./res/obj/Grid_t1.jpg')
plnTexture = new THREE.TextureLoader().load('./res/obj/Grid_t1.jpg')
plnTexture.wrapS = plnTexture.wrapT = THREE.RepeatWrapping
plnTexture.repeat.set(8, 8)

sky = new THREE.TextureLoader().load('./res/backgrounds/digitaltransformation.png')
sky.wrapS = sky.wrapT = THREE.RepeatWrapping
sky.offset.set(1500, 1500)
sky.repeat.set(5, 5)
