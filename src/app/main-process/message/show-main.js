const ipc = require('electron').ipcMain
const {BrowserWindow} = require('electron')
const createWindow = require('../../tools/createWindow')
const path = require('path')
const url = require('url')
ipc.once('show-main', (event, arg) => {
  createWindow({
    pathname: path.join(__dirname, '../../ui', 'index.html'),
    width: 445,
    height: 380,
  })()
})