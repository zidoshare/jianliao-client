var path = require('path')
module.exports = function(grunt){
  grunt.config.init({
    pkg: grunt.file.readJSON('./package.json'),
    'create-windows-installer': {
      x64: {
        appDirectory: path.join(__dirname,'build','schat-win32-x64'),
        outputDirectory: path.join(__dirname,'build','release'),
        authors: 'zido',
        iconUrl: path.join(__dirname,'src','assets','logo.ico'),
        setupIcon: path.join(__dirname,'src','assets','logo.ico'),
        description: 'a single software for chating'
      }
    }
  })

  grunt.loadNpmTasks('grunt-electron-installer')
  grunt.registerTask('default', ['create-windows-installer'])
}