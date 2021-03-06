var dataAdapter = {
  externalUrl: 'http://173.249.3.78:29200/df_arch/doc/_search',
  url: '/data/response-demo.json',
  load: function() {
    $.ajax({
      url: this.url,
      crossDomain: true,
      method: 'get',
      dataType: 'json'
    }).done(function(res) {
      var hits = res.hits.hits
      hits.forEach(function(itm) {
        placeModels(scene, itm._source)
        placeConnections(scene, itm._source)
      })
    })
  },
  clear: function() {
    // do nothing for now
  }
}