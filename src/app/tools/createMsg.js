const createMsg = (msg) => (
  (...args)=>{
    console.log(msg)
    const ipcRenderer = require('electron').ipcRenderer
    ipcRenderer.send(msg,...args)
  }
)

module.exports = createMsg