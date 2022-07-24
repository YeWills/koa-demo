const express = require('express')
var bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')

function start(port) {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(cookieParser())

  app.get('/login' ,async (req, res) => {
    console.log('---')
    const url = req.query.redirectUrl
    if(!url){
        res.status(401).send({
          success: false,
          message: 'redirectUrl 为空'
        })
    }
  
    res.send(`
      <p>登录<\p>
      <form method = "GET" action= "/excutelogin">
      <input name="url" type="hidden" value="${url}" />
      <p>用户名</p>
      <input name="userName" /><br/>
      <p>密码</p>
      <input name="password" type="password" /><br/>
      <button type="submit">submit</button>
      </form>
    `)
  
  });

  app.get('/excutelogin' ,async (req, res) => {
    console.log(req.query)
    // 这里可以写一些数据库或缓存的登录密码
    console.log('通过校验后，登录名与密码校验成功，登录成功')
    
    res.cookie('xn-session-key', `${req.query.userName}__##__${req.query.password}`, {
              domain: 'magichznpm.com',  // 写cookie所在的域名
        maxAge: 800000, // cookie有效时长
        httpOnly: false,  // 是否只用于http请求中获取
    })
    res.redirect(decodeURIComponent(req.query.url))
  });

  app.use(function (error, req, res, next) {
    res.status(500).send('Something broke!')
  })

  app.listen(port, () => {
 
  });
}


start(3090)