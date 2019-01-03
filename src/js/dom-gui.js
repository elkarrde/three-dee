$(function() {
  Object.getOwnPropertyNames(modelsMap).forEach(function(model) {
    $('#typeSelect').append('<option value="' + model + '">' + model + '</option>')
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
    addModel(scene, mdl, logoMap[rnd(0, logoMap.length - 1)], sqOffset)

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

  $('.js-btn-stats').click(function() {
    $(stats.domElement).toggleClass('hide')
  })

  $('.js-btn-load').click(function() {
    dataAdapter.load()
  })

  userAdapter.init()
  $('.js-btn-login').click(function() {
    userAdapter.doLogin()
  })
  $('.js-btn-logout').click(function() {
    userAdapter.doLogout()
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
        borderColor: 'rgb(239, 0, 0)',
        backgroundColor: 'rgba(239, 0, 0, 0.5)',
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

  $('#scene').append(vprend.domElement);
})