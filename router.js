const router = require('koa-router')();
const HomeController = require('./controller/home');
module.exports = (app) => {
    router.get('/', app.controller.home.index);
    router.get('/home', app.controller.home.home);
    router.get('/home/:id/:name', app.controller.home.homeParams);
    router.get('/user', app.controller.home.login);
    router.post('/user/register', app.controller.home.register);
    app.use(router.routes()).use(router.allowedMethods());
}
