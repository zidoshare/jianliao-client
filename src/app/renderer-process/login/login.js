const {showMain,hideLogin} = require('./msg')


const loginBtn = document.getElementById('login')

loginBtn.addEventListener('click', function(event) {
  hideLogin()
  showMain()
})