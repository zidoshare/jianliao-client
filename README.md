# single-chat


# usage

## 安装依赖:

````

npm install

````

## 开发预览:

````

npm run start

````


## 打包：

````
npm run package

````

打包的可运行文件在 `./build/schat-win32-x64` 下

## 生成安装文件：

````
npm run install

````

安装文件在`./build/release`下，msi和exe文件均可以安装

## 打包并生成安装文件:

````
npm run build

````

## 清除构建文件

````

npm run clean 会将release和package文件全部清除

npm run clean:install 会将release清除

npm run clean:package 会将package文件清除

````