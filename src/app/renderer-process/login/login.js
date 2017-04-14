const {sendLoginSuccess} = require('./msg')


const loginBtn = document.getElementById('login')

loginBtn.addEventListener('click', function(event) {
  sendLoginSuccess('account','password')
})