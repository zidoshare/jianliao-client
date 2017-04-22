const createMsg = (msg) => (
  (...args)=>{
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send(msg,...args)
  }
)

module.exports = createMsg