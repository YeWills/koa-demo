const Koa = require('koa')

const app = new Koa()
const logger = async function(ctx, next){
  console.log(ctx.method,ctx.host + ctx.url)
  await next();
}
app.use(logger)
app.use(async (ctx, next)=>{
  // console.log(ctx.method,ctx.host + ctx.url)
  // await next();
  ctx.body = 'hellow world'
})
app.listen(3000)

