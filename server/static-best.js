const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)

// 在static内定义一个index.html，利用服务器默认找index.html特性
app.use(serve(handlePath('../pages/static')))

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})