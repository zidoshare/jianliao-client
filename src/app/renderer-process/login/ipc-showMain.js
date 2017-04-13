module.exports = () => {
  const ipcRenderer = require('electron').ipcRenderer
  ipcRenderer.send('show-main')
}