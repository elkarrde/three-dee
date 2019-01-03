// DAT.GUI Related Stuff
var gui = new dat.GUI();

var gOptions = {
  grid: {
    visible: true,
    color: 0xffffff
  },
  ground: {
    visible: true,
    color: 0x000300,
    reflectivity: 0.85
  },
  lights: {
    hemi: [],
    ambi: {
      visible: true,
      color: 0xa0a0a0,
      intensity: 2
    }
  },
  sidebars: {
    width: 20,
    startColor: 0x477f38,
    endColor: 0x000000,
    startOpacity: 80,
    endOpacity: 0,
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

var gGrid = gui.addFolder('Grid');
gGrid.add(grid, 'visible').name('Visible').listen()
gGrid.addColor(gOptions.grid, 'color').name('Color').onChange(function() {
  grid.material.color.setHex(dec2hex(gOptions.grid.color))
})

var gGround = gui.addFolder('Ground');
gGround.add(mrrFadeout, 'visible').name('Visible').listen()
gGround.addColor(gOptions.ground, 'color').name('Color').onChange(function() {
  mrrFadeout.material.color.setHex(dec2hex(gOptions.ground.color))
})
gGround.add(mrrFadeout.material, 'opacity', 0.25, 1).name('Matte').listen()


ghAmbiLight = gui.addFolder('Ambient light')
ghAmbiLight.add(gOptions.lights.ambi, 'visible').name('Visibility').onChange(function() {
  ambiLight.visible = gOptions.lights.ambi.visible;
});
ghAmbiLight.addColor(gOptions.lights.ambi, 'color').name('Color').onChange(function() {
  ambiLight.color.setHex(dec2hex(gOptions.lights.ambi.color));
})
ghAmbiLight.add(gOptions.lights.ambi, 'intensity', 1, 20).name('Intensity').onChange(function() {
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
