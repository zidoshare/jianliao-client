const showMain = require('./ipc-showMain')


const loginBtn = document.getElementById('login')

loginBtn.addEventListener('click', function(event) {
  showMain()
})