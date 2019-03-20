根目录下启动npm start；
在任意目录下，可选根目录，打开git bash（利用其Linux集成工具）
一定要按照如下顺序执行命令
```
//注册test用户的登录的Token加密方式
curl -d "username=test" http://localhost:3000/api/login
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NTMwNDIzMzksImV4cCI6MTU1MzA0NTkzOX0.qsK19cq7UiTvwVw18ScC4RiX5H673qs6AKdc2FCnE4Y" http://127.0.0.1:3000/api/userInfo

//注册admin用户的登录的Token加密方式
curl -d "username=admin" http://localhost:3000/api/login
curl -H "Authorization: Bearer adminadminadminadminadminadminciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NTMwNDIzMzksImV4cCI6MTU1MzA0NTkzOX0.qsK19cq7UiTvw" http://127.0.0.1:3000/api/userInfo
```

本示例，通过post('/api/login' 接口是router内每个使用了jwt的接口，都必须设置HEAR的token信息才能正常访问接口，
如果没有使用jwt，那么这个接口可不用在hear上设置token信息也可正常访问，如本示例的/api/noUseToken 接口

本示例解说在3.2.4章节

