const msg = {
  showMain:() => {
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send('show-main')
  },
  hideLogin:() => {
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send('hide-login')
  }
}

module.exports = msg