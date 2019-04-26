const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    let html = `
  <h1>登录<\h1>
  <form method = "POST" action= "/">
  <p>用户名</p>
  <input name="userName" /><br/>
  <p>密码</p>
  <input name="password" type="password" /><br/>
  <button type="submit">submit</button>
  </form>
  `;
  ctx.body=html;
})

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})