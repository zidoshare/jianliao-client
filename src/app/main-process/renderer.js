const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const {
  createWindow,
  handleReplaceWindow
} = require('../tools')
const path = require('path')
const url = require('url')

const env = process.env.NODE_ENV
const dev = process.env.NODE_ENV === 'dev'
  //通过createWindow方法构建一个生成默认窗口的方法

/**
 * 这里如果需要将生成的窗口赋值给当前对象，可以这么使用
 * let win = null
 * app.on('ready',()=>{
 *  win = createWindow()()
 * })
 * 因为一般是使用事件回调创建窗口，所以使用这种方式，能够跟上options
 * 例如createWindow({resizable:true}) 返回一个能创建可更改尺寸的窗口的方法
 */
let ses = null //session保存变量

app.on('ready', () => {

  // createWindow({
  //   pathname: path.join(__dirname, '../ui', 'main.html'),
  //   width: 312,
  //   height: 520,
  //   alwaysOnTop: true,
  //   resizable: false,
  // })()
  let win = createWindow({
    pathname: path.join(__dirname, '../ui', 'index.html'),
    width: 445,
    height: 380,
    resizable: false,
  })()
  ipcMain.on('login-success', (event, ...arg) => {

    let main = handleReplaceWindow(createWindow({
      pathname: path.join(__dirname, '../ui', 'main.html'),
      width: 312,
      height: 520,
      alwaysOnTop: true,
      resizable: false,
    }), win)
    main.on('close', () => {
      app.quit()
    })
    win = main
  })
  ipcMain.on('chat', (event, ...arg) => {
    let chat = handleReplaceWindow(createWindow({
      pathname: path.join(__dirname, '../ui', 'chat.html'),
      width: 600,
      height: 500,
      alwaysOnTop: true,
      resizable: false,
    }), win)
    win = chat
  })
  ipcMain.on('register', (event, ...args) => {
    let main = handleReplaceWindow(createWindow({
      pathname: path.join(__dirname, '../ui', 'register.html'),
      width: 445,
      height: 430,
      resizable: false,
    }), win)
    win = main
  })
  ipcMain.on('chat-with', (event, ...args) => {
    createWindow({
      pathname: path.join(__dirname, '../ui', 'chat.html'),
      width: 600,
      height: 535,
      resizable: false,
      frame: false,
    })()
  })
  ipcMain.on('close-chat', (event) => {
    BrowserWindow.getFocusedWindow().close()
  })
  ipcMain.on('minimize-chat', (event) => {
    BrowserWindow.getFocusedWindow().minimize()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})