
http 和 request 和 querystring demo.
本例演示了如何使用koa，截取前台请求，将数据组装后，通过http.request,直接从后台服务器向对应服务器发送请求。
这种做法好处之一可以用来解决跨域问题。

注意的是，服务端可使用http与request向后端发起请求，
http 对于https请求发送会异常（可能需要配置options即可发起https）,只能发起http这样的非安全请求。
request (request-promise-native 是request的增强版)既能请求http，又能请求https，这样看来request的功能更加强悍。

启动：
npm start

浏览器访问：
```
127.0.0.1:8080
```
