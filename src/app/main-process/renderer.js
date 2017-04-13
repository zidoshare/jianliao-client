const {app, BrowserWindow} = require('electron')

const createWindow = require('../tools/createWindow')
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
 * 
 * 例如createWindow({resizable:true}) 返回一个能创建可更改尺寸的窗口的方法
 */

app.on('ready', createWindow({
  pathname: path.join(__dirname, '../ui', 'index.html'),
  width:445,
  height:380,
}))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


require('./message/show-main')
require('./message/hide-login')