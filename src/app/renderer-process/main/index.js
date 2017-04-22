const {toChat} = require('./msg')

const chatBtn = document.querySelector('.friend')
if (chatBtn != null) {
  chatBtn.map((value, index) => (
  value.addEventListener('click', (event) => {
    toChat(value.getAttribute('id'))
  })
  ))
}
