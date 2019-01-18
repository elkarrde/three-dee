// globals.js

var scene, camera, renderer, mesh, groundMirror, grid, mrrFadeout, spotLight, gndTexture, plnTexture, sky, particleSystem, controls, plane, arrow
var vport, vpcam, vprend, vpobj
var sqSize = 40
var modelType = 'mtl' // 'gltf' | 'fbx' | 'mtl'

var gridDist = 40
var gridBox = 200
var gridBoxLine = 5

var globalObjects = []
var noClickObjects = ['Ground', 'Grid', 'FadeoutMrr', 'GndMirror', 'GndMrr']
var posMap = []
var posX0 = 0
var posZ0 = 0
var cPosX = 0
var cPosZ = 0
var maxX = 49
var maxZ = 49
var stepX = 2
var stepZ = 2
var count = 0
var rotation, earthMesh, link, traffic, mixer
var logos = [], models = [], links = []
var clock = new THREE.Clock(), tick = 0

var themesMap = {
  'alien':  '_a',
  'city':   '_c',
  'simple': '_s'
}


var ptxOptions = {
  position: new THREE.Vector3(637, 1, 373),
  positionRandomness: 0.5, //0.44,
  velocity: new THREE.Vector3(),
  velocityRandomness: 0.5, //0.18,
  color: 0x1bf7f9,
  colorRandomness: 0.5,
  turbulence: 1, //0.01,
  lifetime: 15, //10,
  size: 3, //5,
  sizeRandomness: 1 //4.3
};

var spawnerOptions = {
  spawnRate: 11000, //640,
  horizontalSpeed: 1.5,
  verticalSpeed: 1,
  timeScale: 10 //1
}

var vportEmpty = true
var cT, cTi

var dirLights = []
var hemiLights = []
var ghLights = []
var ambiLight

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

var activeTheme