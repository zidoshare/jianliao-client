


const {app,BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
let mainWindow = null


var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
    // 安装
  function install() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
   // 卸载
   function uninstall() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}


const createWindow = () => {
  mainWindow = new BrowserWindow({
    height:600,
    width:800,
  })
  mainWindow.loadURL(url.format({
    pathname:path.join(__dirname,'app','index.html'),
    protocol:'file',
    slashes:true,
  }))
}

app.on('ready',createWindow)
app.on('window-all-closed',()=> {
  if(process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('activate',()=>{
  if(mainWindow === null){
    createWindow()
  }
})


