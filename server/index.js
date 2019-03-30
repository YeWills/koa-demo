const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
var cors = require('koa2-cors');
const app = new Koa()
const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)

console.log(handlePath('../pages/static'))

app.use(serve(handlePath('../pages/static')))
app.use(views(handlePath('../pages')), {
  extension: 'html'
})
app.use(async (ctx) => {
  await ctx.render('index.html')
})

app.use(cors()) // 解决跨域
app.use(bodyparser())// 解析post参数
app.use(router.routes())// 调用路由中间件
app.use(router.allowedMethods())// 对异常状态码处理
app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})