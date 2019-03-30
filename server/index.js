const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
var cors = require('koa2-cors');
const app = new Koa()
 router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
})
router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
})
router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
})
app.use(cors()) // 解决跨域
app.use(bodyparser())// 解析post参数
app.use(router.routes())// 调用路由中间件
app.use(router.allowedMethods())// 对异常状态码处理
app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})