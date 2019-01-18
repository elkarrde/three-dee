// onLoad.js

$(function() {
  init();
  animate();

  activeTheme = $('#themeSelect').val()
  updateModels()
  logos.forEach(function(logo) {
    $('#logoSelectM').append('<option value="' + logo + '">' + logo + '</option>')
  })
  $('#themeSelect').change(function() {
    updateModels()
  })

  $('#addBtn').click(function() {
    var mdl = $('#typeSelect').val()
    if (cPosX <= maxX) {
      cPosX += count === 0? 0 : stepX
    } else {
      cPosX = posX0
      cPosZ += stepZ
    }
    var sqOffset = { x: cPosX, z: cPosZ }
    var tlgo = logos
    var trl = rnd(0, tlgo.length - 1)
    var lgo = logoMap[tlgo[trl]]
    var mdlx = mdl + themesMap[activeTheme]
    addModel(scene, mdlx, lgo, sqOffset)

    if (modelsMap[mdl].count) {
      $('.js-object-list tbody').find('.js-count-' + mdl).find('.js-num').html(modelsMap[mdl].count)
    } else {
      $('.js-object-list tbody').append('<tr class="js-count-' + mdl + '"><td>' + mdl + '</td><td class="js-num">1</td></tr>')
    }
    count++
  })
  $('#addBtnMulti').click(function() {
    var count = prompt('Number: ')
    $('#addBtn').trigger('click')
    setTimeout(function() {
      for (var i = 0; i < count; i++) {
        $('#addBtn').trigger('click')
      }
    }, 50, --count)
  })
  $('#addBtnAll,#addBtnRnd').click(function() {
    alert('Not implemented yet.')
  })

  $('.js-btn-stats').click(function() {
    $(stats.domElement).toggleClass('hide')
  })

  $('.js-btn-load').click(function() {
    dataAdapter.load()
  })
  $('#loadBtnReal').click(function() {
    alert('Failed to load remote resource due to CORS headers.')
  })

  userAdapter.init()
  $('.js-btn-login').click(function() {
    userAdapter.doLogin()
  })
  $('.js-btn-logout').click(function() {
    userAdapter.doLogout()
  })

  $('#shInfo').click(function() {
    $('.obj-panel').removeClass('hide')
  })
  $('#shConsole').click(function() {
    $('.obj-panel').removeClass('hide')
  })
  $('#shGraph').click(function() {
    $('.obj-panel').removeClass('hide')
  })

  $('#buildConnBtn').click(function() {
    $('.connection-modal-lg').modal('show')
  })

  cTi = setInterval(function() {
    cT = new Date()
    $('.js-time').html(cT.toLocaleTimeString('hr'))
  }, 500)

  $('.dg.ac').css('right', '30rem')

  $('#console').text('neven@Neven-E580:~/Code/DT-demo (master)\r\n[' + (new Date()).toLocaleTimeString('hr') + '] $ ')

  var ctx = document.getElementById('graph').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        label: 'Load',
        borderColor: 'rgb(0, 151, 178)',
        backgroundColor: 'rgba(0, 151, 178, 0.5)',
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            delay: 2000,
            onRefresh: function(chart) {
              chart.data.datasets.forEach(function(dataset) {
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random()
                });
              });
            }
          }
        }]
      }
    }
  });

  $('#buildForm').submit(function(e) {
    e.preventDefault()
    var loc = $('#inputSubLoc').val().trim().match(/(\d{1,}),(\d{1,})/i)
    var outloc = $('#inputLoc').val().trim().match(/(\d{1,}),(\d{1,})/i)
    var obj = $('#typeSelectM').val()
    var logo = $('#logoSelectM').val()
    var theme = $('#themeSelectM').val()

    if (loc instanceof Array) {
      loc = [parseInt(loc[1], 10), parseInt(loc[2], 10)]
    } else {
      loc = [1, 1]
    }

    if (outloc instanceof Array) {
      outloc = [parseInt(outloc[1], 10), parseInt(outloc[2], 10)]
    } else {
      outloc = [1, 1]
    }
    console.log('XX---->', loc, outloc)

    var data = {
      LocationIn3d: outloc,
      Services: [
        {
          Name: 'Builder object',
          Logo: logo,
          Model: obj,
          LocationIn3dTile: loc
        }
      ]
    }
    placeModels(scene, data)
    $('.builder-modal-lg').modal('hide')
    return false;
  });

  $('#scene').append(vprend.domElement);
})