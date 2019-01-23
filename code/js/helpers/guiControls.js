// export gui, gOptions

// DAT.GUI Related Stuff
var gui = new dat.GUI();

var gOptions = {
  grid: {
    visible: false,
    color: 0x01d7d7
  },
  markers: {
    visible: false
  },
  ground: {
    visible: true,
    color: 0x02070f
  },
  mirror: {
    visible: true,
    fadeout: true
  },
  lights: {
    hemi: [],
    ambi: {
      visible: true,
      color: 0xffffff,
      intensity: 1
    }
  },
  sidebars: {
    width: 20,
    startColor: 0x477f38,
    endColor: 0x000000,
    startOpacity: 80,
    endOpacity: 0,
  },
  particle: {
    speed: 4,
    posY: 5
  },
  mkGrad: function() {
    var sc = dec2hex(this.sidebars.startColor).substr(2)
    var scR = parseInt(sc.substr(0, 2), 16)
    var scG = parseInt(sc.substr(2, 2), 16)
    var scB = parseInt(sc.substr(4, 2), 16)
    var se = dec2hex(this.sidebars.endColor).substr(2)
    var seR = parseInt(se.substr(0, 2), 16)
    var seG = parseInt(se.substr(2, 2), 16)
    var seB = parseInt(se.substr(4, 2), 16)
    var oS = this.sidebars.startOpacity / 100
    var oE = this.sidebars.endOpacity / 100
    $('.side-left').css('background', '-webkit-gradient(linear, left center, right center, from(rgba(' + scR + ', ' + scG + ', ' + scB + ', ' + oS + ')), to(rgba(' + seR + ', ' + seG + ', ' + seB + ', ' + oE + ')))')
    $('.side-right').css('background', '-webkit-gradient(linear, right center, left center, from(rgba(' + scR + ', ' + scG + ', ' + scB + ', ' + oS + ')), to(rgba(' + seR + ', ' + seG + ', ' + seB + ', ' + oE + ')))')
  },
};
var cGl = {}
for (var ghc = 0; ghc < hemiLights.length; ghc++) {
  gOptions.lights.hemi[ghc] = {
    index: ghc,
    visible: false,
    color: 0xffffff,
    intensity: 1,
    positionX: 0,
    positionY: 1000,
    positionZ: 0
  }
  cGl[ghc] = ghc
}

var gGround = gui.addFolder('Ground');
gGround.add(gOptions.mirror, 'visible').name('Mirror visibility').onChange(function() {
  groundMirror.visible = gOptions.mirror.visible
})
gGround.add(gOptions.mirror, 'fadeout').name('Fadeout visibility').onChange(function() {
  mrrFadeout.visible = gOptions.mirror.fadeout
})
gGround.add(gOptions.ground, 'visible').name('Plane visibility').onChange(function() {
  plane.visible = gOptions.ground.visible
})
gGround.addColor(gOptions.ground, 'color').name('Plane color').onChange(function() {
  plane.material.color.setHex(dec2hex(gOptions.ground.color))
})

ghAmbiLight = gui.addFolder('Ambient light')
ghAmbiLight.add(gOptions.lights.ambi, 'visible').name('Visibility').onChange(function() {
  ambiLight.visible = gOptions.lights.ambi.visible;
});
ghAmbiLight.addColor(gOptions.lights.ambi, 'color').name('Color').onChange(function() {
  ambiLight.color.setHex(dec2hex(gOptions.lights.ambi.color));
})
ghAmbiLight.add(gOptions.lights.ambi, 'intensity', 0.1, 20).name('Intensity').onChange(function() {
  ambiLight.intensity = gOptions.lights.ambi.intensity;
});

for (var ghc = 0; ghc < hemiLights.length; ghc++) {
  hemiLights[ghc].visible = false; // They say that girl ya know she act too tough tough tough

  ghLights[ghc] = gui.addFolder('HemisphereLight #' + (ghc + 1))
  ghLights[ghc].add(gOptions.lights.hemi[ghc], 'visible').name('Visibility').onChange(function() {
    hemiLights[this.object.index].visible = gOptions.lights.hemi[this.object.index].visible;
  });
  ghLights[ghc].addColor(gOptions.lights.hemi[ghc], 'color').name('Color').onChange(function() {
    hemiLights[this.object.index].color.setHex(dec2hex(gOptions.lights.hemi[this.object.index].color));
  })
  ghLights[ghc].add(gOptions.lights.hemi[ghc], 'intensity', 1, 20).name('Intensity').onChange(function() {
    hemiLights[this.object.index].intensity = gOptions.lights.hemi[this.object.index].intensity;
  });
  ghLights[ghc].add(gOptions.lights.hemi[ghc], 'positionX', -1000, 1000).name('Position X').onChange(function() {
    hemiLights[this.object.index].position.x = gOptions.lights.hemi[this.object.index].positionX;
  });
  ghLights[ghc].add(gOptions.lights.hemi[ghc], 'positionY', -1000, 1000).name('Position Y').onChange(function() {
    hemiLights[this.object.index].position.y = gOptions.lights.hemi[this.object.index].positionY;
  });
  ghLights[ghc].add(gOptions.lights.hemi[ghc], 'positionZ', -1000, 1000).name('Position Z').onChange(function() {
    hemiLights[this.object.index].position.z = gOptions.lights.hemi[this.object.index].positionZ;
  });
}

ghParticle = gui.addFolder('Particles')
ghParticle.add(ptxOptions, 'velocityRandomness', 0, 3);
ghParticle.add(ptxOptions, 'positionRandomness', 0, 3);
ghParticle.add(ptxOptions, 'size', 1, 20);
ghParticle.add(ptxOptions, 'sizeRandomness', 0, 25);
ghParticle.add(ptxOptions, 'colorRandomness', 0, 1);
ghParticle.add(ptxOptions, 'lifetime', 0.1, 20);
ghParticle.add(ptxOptions, 'turbulence', 0, 1);

ghParticle.add(spawnerOptions, 'spawnRate', 10, 30000);
ghParticle.add(spawnerOptions, 'timeScale', -1, 10);

ghParticle.add(gOptions.particle, 'speed', 1, 100).onChange(function() {
  speed = gOptions.particle.speed
})
/*
ghParticle.add(gOptions.particle, 'posY', 1, 200).name('Position Y').onChange(function() {
  ptxOptions.position.y = gOptions.particle.posY
})
*/

var gSbars = gui.addFolder('Sidebars')
gSbars.add(gOptions.sidebars, 'width', 10, 30).onChange(function() {
  $('.side').css('width', gOptions.sidebars.width + 'rem')
})
gSbars.addColor(gOptions.sidebars, 'startColor').onChange(function() {
  gOptions.mkGrad()
})
gSbars.add(gOptions.sidebars, 'startOpacity', 0, 100).onChange(function() {
  gOptions.mkGrad()
})
gSbars.addColor(gOptions.sidebars, 'endColor').onChange(function() {
  gOptions.mkGrad()
})
gSbars.add(gOptions.sidebars, 'endOpacity', 0, 100).onChange(function() {
  gOptions.mkGrad()
})
