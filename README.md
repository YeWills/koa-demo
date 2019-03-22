npm start 
浏览器访问：
http://127.0.0.1:3000/
http://127.0.0.1:3000/home
http://localhost:3000/home/01/admin
http://localhost:3000/user
http://localhost:3000/user/register

注意 ：
controller/home.js中 
ctx.render并非ctx自带的原生方法，而是koa-nunjucks-2绑定到上下文上的（见P96,5.2.4），
 home/login 其实是views/home/login.html路径

 讲解模板koa-nunjucks的使用，以及如何通过模板引擎，集成 render方法到ctx中。

 本例使用了koa-static，来区别加载 html引用的静态文件main.css,提高性能；
 对应章节为5.3.4

 
 模拟koa-json简易实现，同时将多个中间件统一到一个文件夹中管理优化 5.4.1

 增加log4js与ip的示例

 增加 404 或500 错误的显示页面 功能，实现方法：
 npm start后，随便输入一个不存在的路由，达到404的效果，如：
 http://127.0.0.1:3000/tttt
 就会显示404错误页面

 增加 mi-rule功能，类似别名的形式，以前引用一个文件，可能要require('./controller/home')，用了本次提交的mi-rule功能后，只能要用app.controller.home就可以了，具体看本次提交的具体内容