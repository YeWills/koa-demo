## 运行 npm start

启动：
```
npm install
```
浏览：
```
http://127.0.0.1:3000/
```

## 主要内容
#### koa写两种类型接口：
- 一种返回本地文件(img和xls)的接口；
- 一个返回json数据；
#### 前端针对上面的接口，完成了以下功能：
- 请求接口，进行文件下载；
- 从后台请求回来图片，通过blob的两种处理方式：FileReader 和 window.URL.createObjectURL 进行图片预览；
#### 本示例也展示了：
对于文件blob流，如何从后台被创造，通过前台请求，传递到前台，前台如何转化或操作blob的全过程，加深对blob理解。

## 关于blob
目前读取或操作blob的，只有两种方式：
FileReader 和 window.URL.createObjectURL

## 技术栈
- nodemon
- koa
- blob
- FileReader
- window.URL.createObjectURL


