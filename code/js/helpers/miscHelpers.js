// miscHelpers.js

function dec2hex(i) {
  var result = '0x000000';
  if (i >= 0 && i <= 15) { result = '0x00000' + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = '0x0000' + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = '0x000' + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = '0x00' + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = '0x0' + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8) { return result; }
}

var deg2rad = function(degree) { return degree * (Math.PI / 180); }

function rnd(min, max) {
  return Math.floor(Math.random() * max) + min
}

function getPosCoords(sqOffset) {
  var oX = 0
  var oZ = 0
  if (sqOffset && typeof sqOffset === 'object') {
    oX = -1000 + sqSize * sqOffset.x
    oZ = -1000 + sqSize * sqOffset.z
  }

  return { x: oX, z: oZ }
}

function sqPos(sq) {
  return -1000 + sq * sqSize
}

function tilePos2sqOffset(tileObj, innerPosObj) {
  var sqOff = {x: 0, z: 0}
  sqOff.x = parseInt(tileObj.x, 10) * gridBoxLine
  sqOff.z = parseInt(tileObj.z, 10) * gridBoxLine

  sqOff.x += parseInt(innerPosObj.x, 10)
  sqOff.z += parseInt(innerPosObj.z, 10)

  return sqOff
}

function iterationCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }
  return target;
}