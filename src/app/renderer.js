const {app,BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const env = process.env.NODE_ENV
const dev = process.env.NODE_ENV === 'dev'

let loginWindow = null
const createWindow = () => {
  loginWindow = new BrowserWindow({
    height:300,
    width:400,
    show:false,
    center:true,
    resizable:false,
  })
  if(dev)
    loginWindow.openDevTools()
  loginWindow.setMenu(null)
  loginWindow.loadURL(url.format({
    pathname:path.join(__dirname,'login','index.html'),
    protocol:'file',
    slashes:true,
  }))
  loginWindow.once('ready-to-show',()=>{
    loginWindow.show()
  })
}

app.on('ready',createWindow)
app.on('window-all-closed',()=> {
  if(process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('activate',()=>{
  if(loginWindow === null){
    createWindow()
  }
})