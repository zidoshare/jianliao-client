const ipc = require('electron').ipcMain
const {BrowserWindow} = require('electron')
const createWindow = require('../../tools/createWindow')
const path = require('path')
const url = require('url')
ipc.on('hide-login', (event, arg) => {
  
})