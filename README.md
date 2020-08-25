## 基于jsonwebtoken 与 koa-jwt 实现登录验证demo

### 根目录下启动:
npm start；

### 通过jsonwebtoken生成token
首先进行用户登录，登录接口通过jsonwebtoken生成实时的token，
在app的其他接口中使用jwt进行token验证。

```js
const { sign } = require('jsonwebtoken');
const { secret } = require('./config');

router
  .post('/api/login', async (ctx, next) => {
    const user = ctx.request.body;
    if (user && user.username) {
      let { username } = user;
      const token = sign({ username }, secret, { expiresIn: '1h' });
      ctx.body = {
        message: 'Get Token Success',
        code: 1,
        token
      };
    } else {
      ctx.body = {
        message: 'Param Error',
        code: -1
      };
    }
  })
```
### 通过jwt进行token验证
```js
const { secret } = require('./config');
const jwt = require('koa-jwt')({ secret });

 router.get('/api/userInfo', jwt, async ctx => {
    ctx.body = {
      username: ctx.state.user.username
    };
  })

```

### 使用cmd请求
在任意目录下，可选根目录，打开git bash（利用其Linux集成工具）
一定要按照如下顺序执行命令
```
//注册test用户的登录的Token加密方式
//注意，这里的token是登陆时，jsonwebtoken生成的，上面有说明
curl -d "username=test" http://localhost:3000/api/login
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NTMwNDIzMzksImV4cCI6MTU1MzA0NTkzOX0.qsK19cq7UiTvwVw18ScC4RiX5H673qs6AKdc2FCnE4Y" http://127.0.0.1:3000/api/userInfo

//注册admin用户的登录的Token加密方式
curl -d "username=admin" http://localhost:3000/api/login
curl -H "Authorization: Bearer adminadminadminadminadminadminciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NTMwNDIzMzksImV4cCI6MTU1MzA0NTkzOX0.qsK19cq7UiTvw" http://127.0.0.1:3000/api/userInfo
```

本示例，通过post('/api/login' 接口是router内每个使用了jwt的接口，都必须设置HEAR的token信息才能正常访问接口，
如果没有使用jwt，那么这个接口可不用在hear上设置token信息也可正常访问，如本示例的/api/noUseToken 接口

### 使用html请求
经过验证，html中，通过下面方式带上token请求头
```js
  $.ajax({
    url:"http://localhost:3000/api/userInfo",
    beforeSend: function(xhr) { 
                xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTk4Mzg5OTIyLCJleHAiOjE1OTgzOTM1MjJ9.-SgGux78wAT2N9cxNCFOReg9v3EO8XVoH8M_2FzynXU");  
            },});
```
