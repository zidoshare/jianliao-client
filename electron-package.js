var packager = require('electron-packager')
const path = require('path')
const options = {
  dir: path.join(__dirname, 'src'),
  arch: 'x64',
  platform: 'win32',
  icon: path.join(__dirname, 'src', 'assets', 'logo.ico'),
  out: path.join(__dirname, 'build'),
  overwrite: true
}

packager(options, (err, appPaths) => {
  if (err !== null)
    console.error('打包错误：' + appPaths + '\n' + err.description)
  else
    console.log('打包完成！路径为：' + appPaths)
})