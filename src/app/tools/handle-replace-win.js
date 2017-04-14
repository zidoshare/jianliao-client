const {BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

/**
 * 此模块负责replace窗口功能，具体实例为，登录窗口replace为主界面
 * 
 * current为由createWindow模块创建的方法，before为需要被替换的窗口
 */
module.exports = (current, before) => {
  let win = current()
  if (before !== null)
    win.on('show', () => before.close())
  else
    before.close()
  return win
}