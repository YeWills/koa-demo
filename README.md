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