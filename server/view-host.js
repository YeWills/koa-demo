const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
const app = new Koa()

const views = require('koa-views')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)

app.use(views(handlePath('../pages')), {
  extension: 'html'
})
app.use(async (ctx) => {
    await ctx.render('/static/test.html')
})
// 缺点在于无法访问到 http://localhost:3000/abc 此路由，都会被截获转发上面的/static/test.html
router.get('/abc', async (ctx, next) => {
  ctx.body='888999';
})

app.use(bodyparser())// 解析post参数
app.use(router.routes())// 调用路由中间件
app.use(router.allowedMethods())// 对异常状态码处理
app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})