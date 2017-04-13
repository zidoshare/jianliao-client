const ipc = require('electron').ipcMain
const {BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')
ipc.on('show-main', (event, arg) => {
  let win = new BrowserWindow({
    width: 400,
    height: 320
  })
  win.on('close', function() {
    win = null
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, '../../ui', 'index.html'),
    protocol: 'file',
    slashes: true,
  }))
  win.show()
})