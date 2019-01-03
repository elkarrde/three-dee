var userAdapter = {
  doLogin: function() {
    var username = prompt('Enter your username:')
    this.data.name = username.trim()
    this.data.active = true
    localStorage.setItem('user', JSON.stringify(this.data))
    this.updateUi()
  },
  doLogout: function() {
    this.data.name = null
    this.data.active = false
    localStorage.removeItem('user')
    this.updateUi()
  },
  updateUi: function() {
    if (this.data.active) {
      $('.js-username').html('@' + this.data.name)
      $('.js-btn-login').addClass('hide')
      $('.js-btn-logout').removeClass('hide')
    } else {
      $('.js-username').html('<em>Logged out</em>')
      $('.js-btn-login').removeClass('hide')
      $('.js-btn-logout').addClass('hide')
    }
  },
  init: function() {
    if (localStorage.getItem('user') !== null) {
      var tmpUser = JSON.parse(localStorage.getItem('user'))
      this.data.name = tmpUser.name
      this.data.active = true
    }
    this.updateUi()
  },
  data: {
    name: null,
    active: false
  }
}
