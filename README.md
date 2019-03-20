- get 请求：
http://127.0.0.1:3000/?search=koa&keywords=contex
const Koa = require('koa')

const app = new Koa()
app.use(async ctx=>{
  ctx.response.body = {
    url : ctx.request.url,
    query:ctx.request.query,
    querystring:ctx.request.querystring,
  }
})
app.listen(3000)

{"url":"/?search=koa&keywords=contex","query":{"search":"koa","keywords":"contex"},"querystring":"search=koa&keywords=contex"}

- post请求：
const Koa = require('koa')
const app = new Koa()
app.use(async (ctx)=>{
  let postdata = '';
  ctx.req.on('data', (data)=>{
    postdata +=data;
  })
  ctx.req.on('end', ()=>{
    console.log(postdata);
  })
})
app.listen(3000)

使用git bach 执行命令 curl -d "param1=abc&param2=qqw" http://localhost:3000/

- 哪里可以执行console
如下，其实console在哪里都可以执行，只是只有当在浏览器上输入http://localhost:3000/ 或者 执行相关命令时才会被触发执行。
app.use(async (ctx)=>{
  let postdata = '';
  console.log('可以打印') //外层console不执行
  ctx.req.on('data', (data)=>{
      console.log('可以执行console')
    postdata +=data;
  })
  ctx.req.on('end', ()=>{
      console.log('可以执行console')
    console.log(postdata);
  })
})

- logger中间件小demo
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

// app.use(async (ctx, next)=>{
//   console.log(ctx.method,ctx.host + ctx.url)
//   await next();
//   ctx.body = 'hellow world'
// })


- 路由中间件koa-router 源码浅析
模拟路由中间件
class Router{
  constructor(){
    this._routers = [];
  }
  get(url, handler){
    this._routers.push({
      url:url,
      method:'GET',
      handler
    })
  }
  routes(){
    return async (ctx, next) => {
      const {method, url} = ctx;
      const matchedRouter = this._routers.find(r => r.method === method && r.url === url);
      if( matchedRouter &&
        matchedRouter.handler){
          await matchedRouter.handler(context, next);
        }else{
          await next();
        }
    }
  }
}

路由模式
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router.get('/', async (ctx, next)=>{ //定义路径为‘/’的路由规则
                                    //对路由进行处理的函数
})
app.use(router.routes()); //通过use方法注册路由中间件

非路由模式
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

- RESTful 规范
常规设置接口：
router.get(/app/adduser)
router.get(/app/edituser)
router.get(/app/deleteuser)
基于RESTful规范设计的API，全局只提供唯一的URI /app/user
设计如下：
router.post(/app/user) //新增用户id
router.edit(/app/user:id) 编辑名字为id的用户
router.delete(/app/user:id) 删除名字为id的用户

- 两种方式的get url设计 (问号和斜杠写法)
router.get('/home'  ---对应 http://localhost:3000/home?id=01&name=admin
router.get('/home/:id/:name'  ---对应 http://localhost:3000/home/01/admin

- Http.request 服务端 跨域请求的demo--->如何通过服务端转发请求，解决跨域问题--参看git branch -- http-request
可以将本次提交类推为 使用127.0.0.1域名下如何通过服务端转发至不同域名下的接口进行请求

ctx.request.body 与 koa-bodyparser，ctx.request.querystring 、 ctx.request.query与ctx.query 
(关于koa-bodyparser 请参看git branch koa-bodyparser)
get 请求参数的获取：koa-router封装了Request对象，可以通过ctx.request.querystring 、 ctx.request.query与ctx.query 获取get请求参数，因此get请求参数的获取不需要插件；
post 请求的参数koa无法获取，只能通过中间件koa-bodyparser，当使用了此中间件后，Request对象就多了一个body属性(ctx.request.body)，里面可以获取到具体的post参数
