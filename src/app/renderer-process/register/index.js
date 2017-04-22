const {register} = require('./msg')

const registerBtn = document.getElementById('register')

register.addEventListener('click', (event) => {
  register()
})