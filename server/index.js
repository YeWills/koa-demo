const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
const logger = async function(ctx, next){
  console.log(ctx.method,ctx.host + ctx.url)
  await next();
}
app.use(logger)
app.use(bodyparser())
app.use(async (ctx, next)=>{
  console.log(ctx.method)
  if(ctx.url=== '/' && ctx.method === "GET"){
    ctx.type ='html';
    let html = `
    <h1>登录<\h1>
    <form method = "POST" action= "/">
    <p>用户名</p>
    <input name="userName" /><br/>
    <p>密码</p>
    <input name="password" type="password" /><br/>
    <button type="submit">submit</button>
    </form>
    `
    ctx.body=html;
  }else if(ctx.url === '/' && ctx.method === 'POST'){
    let postData = ctx.request.body;
    ctx.body = postData;
  }
})
app.listen(3000)

