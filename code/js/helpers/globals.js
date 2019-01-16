// globals.js

var scene, camera, renderer, mesh, groundMirror, grid, mrrFadeout, spotLight, gndTexture, plnTexture, sky, particleSystem, controls, plane;
var vport, vpcam, vprend, vpobj
var sqSize = 40

var gridDist = 40
var gridBox = 200

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
var logos = [], models = []
var clock = new THREE.Clock(), tick = 0

var ptxOptions = {
  position: new THREE.Vector3(637, 1, 373),
  positionRandomness: 0.44, //0.25,
  velocity: new THREE.Vector3(),
  velocityRandomness: 0.18, //0.11,
  color: 0x1bf7f9,
  colorRandomness: 0.5,
  turbulence: 1.02, //0.01,
  lifetime: 10, //1,
  size: 5, //3,
  sizeRandomness: 4.3 //0.05
};

var spawnerOptions = {
  spawnRate: 1100, //640,
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