// modelsData.js

/*
var OLDmodelsMap = {
  '1stbuilding':   { scale: 15, oX: 20, oZ: 20, count: 0, model: null, lX: 0,  lY: 35, lZ: 9  },
  '2squerbuild':   { scale: 15, oX: 65, oZ: 50, count: 0, model: null, lX: 0,  lY: 37, lZ: 2  },
  'aqua':          { scale: 0.5, oX: 80, oZ: 40, count: 0, model: null, lX: 0, lY: 60, lZ: 0  },
  '3base':         { scale: 15, oX: 45, oZ: 45, count: 0, model: null, lX: 5,  lY: 40, lZ: 5  },
  'basictall':     { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 300, lZ: 0 },
  'bmw':           { scale: 15, oX: 50, oZ: 75, count: 0, model: null, lX: 0,  lY: 50, lZ: 0  },
  'buildings1':    { scale: 15, oX: 55, oZ: 75, count: 0, model: null, lX: 22, lY: 35, lZ: 1  },
  'castle':        { scale: 0.5, oX: 50, oZ: 50, count: 0, model: null, lX: 0, lY: 35, lZ: 0  },
  'cube_trans':    { scale: 15, oX: 50, oZ: 50, count: 0, model: null, lX: -1, lY: 40, lZ: 1  },
  'lastnode':      { scale: 15, oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 35, lZ: 2  },
  'lighttower':    { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 120, lZ: 0 },
  'longsilos':     { scale: 1,  oX: 50, oZ: 70, count: 0, model: null, lX: 0,  lY: 65,  lZ: 0 },
  'ltrans':        { scale: 0.5, oX: 80, oZ: 80, count: 0, model: null, lX: 0,  lY: 50, lZ: 0 },
  'merscobj':      { scale: 15, oX: 40, oZ: 50, count: 0, model: null, lX: 10, lY: 37, lZ: 2, doubleSided: true },
  'moderntower':   { scale: 15, oX: 80, oZ: 50, count: 0, model: null, lX: 0,  lY: 70, lZ: 0  },
  'prison':        { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 25, lZ: 0  },
  'SciFi_3':       { scale: 15, oX: 15, oZ: 90, count: 0, model: null, lX: 0,  lY: 55, lZ: -7 },
  'scifitower':    { scale: 15, oX: 50, oZ: 80, count: 0, model: null, lX: 0,  lY: 50, lZ: 0  },
  'silos':         { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 75, lZ: 0  },
  'silostrans':    { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 65, lZ: 0  },
  'simple':        { scale: 15, oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 27, lZ: 2  },
  'simlebuilding': { scale: 15, oX: 80, oZ: 20, count: 0, model: null, lX: 0,  lY: 40, lZ: 2  },
  'tallbuilding':  { scale: 15, oX: 20, oZ: 20, count: 0, model: null, lX: 0,  lY: 50, lZ: 0  },
  'tallbuildingb': { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 90, lZ: 0  },
  'tallfix':       { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 90, lZ: 0  },
  'torus':         { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 60, lZ: 0  },
  'transtower':    { scale: 1,  oX: 50, oZ: 50, count: 0, model: null, lX: 0,  lY: 210, lZ: 0 }
}
*/

var logoMap = {
  'Apache_kafka': { scale: 2,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'centos':       { scale: 6,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'clickhouse':   { scale: 10, oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'elastic':      { scale: 3,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'flink':        { scale: 5,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'git':          { scale: 5,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'Prometheus':   { scale: 12, oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'spark':        { scale: 5,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'ubuntu':       { scale: 4,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'zepelin':      { scale: 6,  oX: 0,  oZ: 0, model: null, map: [], count: 0},
  'Zoo':          { scale: 9,  oX: 0,  oZ: 0, model: null, map: [], count: 0}
}

var modelsMap = {
  'Castle_a': { theme: 'alien', name: 'Castle', scale: 1.3, oX: 0,   oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Cube_a':   { theme: 'alien', name: 'Cube',   scale: 1.3, oX: 0,   oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Round_a':  { theme: 'alien', name: 'Round',  scale: 0.5, oX: -10, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Silos_a':  { theme: 'alien', name: 'Silos',  scale: 0.5, oX: 0,   oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Tower_a':  { theme: 'alien', name: 'Tower',  scale: 0.8, oX: 0,   oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },

  'Castle_c': { theme: 'city', name: 'Castle', scale: 1.2, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Cube_c':   { theme: 'city', name: 'Cube',   scale: 0.7, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Round_c':  { theme: 'city', name: 'Round',  scale: 0.7, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Silos_c':  { theme: 'city', name: 'Silos',  scale: 0.5, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Tower_c':  { theme: 'city', name: 'Tower',  scale: 0.7, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },

  'Castle_s': { theme: 'simple', name: 'Castle', scale: 1,   oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Cube_s':   { theme: 'simple', name: 'Cube',   scale: 0.3, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Round_s':  { theme: 'simple', name: 'Round',  scale: 0.5, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Silos_s':  { theme: 'simple', name: 'Silos',  scale: 0.5, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'Tower_s':  { theme: 'simple', name: 'Tower',  scale: 0.3, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },

  'lighttower':  { theme: 'misc', name: 'Round', scale: 1,  oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'silos':       { theme: 'misc', name: 'Silos', scale: 1,  oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'moderntower': { theme: 'misc', name: 'Tower', scale: 15, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 },
  'cube_trans':  { theme: 'misc', name: 'Cube',  scale: 15, oX: 0, oZ: 0, count: 0, model: null, map: [], lX: 0, lY: 0, lZ: 0 }
}
