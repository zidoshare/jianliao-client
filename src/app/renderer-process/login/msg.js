const msg = {
  sendLoginSuccess:(...args) => {
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send('login-success',...args)
  }
}

module.exports = msg