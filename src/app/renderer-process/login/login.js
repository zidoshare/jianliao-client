const {sendLoginSuccess, toRegister} = require('./msg')


const loginBtn = document.getElementById('login')

loginBtn.addEventListener('click', function(event) {
  sendLoginSuccess('account', 'password')
})

const registerBtn = document.getElementById('register')

register.addEventListener('click', (event) => {
  toRegister()
})