const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)

// http://localhost:3000/redis.html

app.use(serve(handlePath('../pages/static/test_redirect')))

// http://localhost:3000
app.use(async (ctx) => {
  ctx.redirect('/redis.html');
})

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})