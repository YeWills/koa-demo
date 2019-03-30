const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
var cors = require('koa2-cors');
const fs = require('fs');
const path = require('path');
const extname = path.extname;
const app = new Koa()
app.use(cors()) // 解决跨域

app.use(async (ctx,next)=>{
   if(ctx.url === '/getFile' && ctx.method === "GET"){
    const fpath = path.join(__dirname, './files/test.xlsx');
    const fstat = await stat(fpath);
    if (fstat.isFile()) {
      ctx.type = extname(fpath);
      ctx.body = fs.createReadStream(fpath);
    }
   }else if(ctx.url === '/' && ctx.method === 'POST'){
    let postData = ctx.request.body;
    ctx.body = postData;
  }else{
    ctx.body='welcome to home page!!';
  }
})

app.use(bodyparser())// 解析post参数
app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})

function stat(file) {
  return new Promise(function(resolve, reject) {
    fs.stat(file, function(err, stat) {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}