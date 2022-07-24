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
    const code = req.params.code
    res.send(`
    <p>登录<\p>
    <form method = "GET" action= "/excutelogin">
    <p>用户名</p>
    <input name="userName" /><br/>
    <p>密码</p>
    <input name="password" type="password" /><br/>
    <button type="submit">submit</button>
    </form>
    `)
    // if (code) {
   
   
    // } else {
    //   res.status(401).send({
    //     success: false,
    //     message: 'code为空'
    //   })
    // }
  });

  app.get('/excutelogin' ,async (req, res) => {
    const code = req.query
    console.log(req.query)
    console.log(req.body)
    res.cookie('aa', '123', {
              domain: 'magichznpm.com',  // 写cookie所在的域名
        maxAge: 80000, // cookie有效时长
        httpOnly: false,  // 是否只用于http请求中获取
    })
    // parse application/x-www-form-urlencoded
    // app.use(bodyParser.urlencoded({ extended: false }))

    // // parse application/json
    // app.use(bodyParser.json())
    // console.log(res.cookies.set)

    // res.cookies.set('abc1111',  '123111')
    // res.cookies.set(
    //   'cid', 
    //   'hello world1111',
    //   {
    //     domain: '127.0.0.1',  // 写cookie所在的域名
    //     maxAge: 80000, // cookie有效时长
    //     httpOnly: false,  // 是否只用于http请求中获取
    //   }
    // )
    res.send(` <p>ok</p>`)
    // if (code) {
    // } else {
    //   res.status(401).send({
    //     success: false,
    //     message: 'code为空'
    //   })
    // }
  });

  app.use(function (error, req, res, next) {
    res.status(500).send('Something broke!')
  })

  app.listen(port, () => {
 
  });
}


start(3080)