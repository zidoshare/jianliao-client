/**
 * 本模块会根据options返回一个无参方法，调用该方法则会返回一个根据options创建的窗口
 */

const {BrowserWindow} = require('electron')
const url = require('url')
const env = process.env.NODE_ENV
const dev = (env === 'dev')

//缓存默认值，不用每次都新建
let defaultOptions = {
  pathname: null, //路径
  height: 300, //高度
  width: 400, //宽度
  show: false, //是否立即显示
  gracefully: true, //是否需要平滑显示，如果关闭且 show 为 true时，则有可能会出现显示卡顿
  center: true, //是否居中
  resizable: true, //是否可改变尺寸
  menu: null, //显示的menu
  dev: dev, //是否需要开发模式，会默认根据环境变量来更改
  protocol: 'file', //协议，更改为http则为网络协议
  slashes: true, //
}
module.exports = (options) => {
  return () => {
    let opts = Object.assign({}, defaultOptions, options)
    let win = null
    win = new BrowserWindow({
      height: opts.height,
      width: opts.width,
      show: opts.show,
      center: opts.center,
      resizable: opts.resizable,
    })
    if (opts.dev)
      win.openDevTools()
    win.setMenu(opts.menu)
    win.loadURL(url.format({
      pathname: opts.pathname,
      protocol: opts.protocol,
      slashes: opts.slashes,
    }))
    if (opts.gracefully)
      win.once('ready-to-show', () => {
        win.show()
      })
    return win
  }
}