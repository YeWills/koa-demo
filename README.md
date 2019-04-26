
### koa实现浏览器中访问html\jpg的方法
#### 浏览器访问html的前身
这是一种原始的方式：
```
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
```
#### koa-view方法一
```
const views = require('koa-views')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)
app.use(views(handlePath('../pages')), {
  extension: 'html'
})
router.get('/gethtml', async (ctx, next) => {
    await ctx.render('/static/test.html')
})
```
#### koa-view方法二
```
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

```
#### koa-static方法一

```
const serve = require('koa-static')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)
// http://localhost:3000/redis.html
app.use(serve(handlePath('../pages/static/test_redirect')))
// http://localhost:3000
app.use(async (ctx) => {
  ctx.redirect('/redis.html');
})

```

#### 最佳方法(koa-static方法二)

```
const serve = require('koa-static')
const { resolve } = require('path')
const handlePath = path => resolve(__dirname, path)
// 在static内定义一个index.html，利用服务器默认找index.html特性
app.use(serve(handlePath('../pages/static')))
```

#### 小结
在浏览器中输入http://localhost:3000，然后显示自己的index.html文件，一般的套路是利用koa-static来做，
窍门在于给在static内定义一个index.html，利用服务器默认找index.html特性，这样在浏览器中只干干净净显示url http://localhost:3000，非常好，而且koa-static自己封装路由处理很好，不会影响你在koa中定义的其他路由。

用koa-view也能达到目的，局限性大，会让你定义的其他路由失效。
