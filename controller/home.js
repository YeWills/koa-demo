const HomeService = require('../service/home');
module.exports = {
    index: async (ctx, next) => {
        ctx.response.body = `<h1>index page</h1>`;
    },
    home: async (ctx, next) => {
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.response.body = '<h1>HOME page</h1>';
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params);
        ctx.response.body = '<h1>HOME page /:id/:name</h1>';
    },
    login: async (ctx, next) => {
        //ctx.render并非ctx自带的原生方法，而是
        // koa-nunjucks-2绑定到上下文上的，
        // home/login 其实是views/home/login.html路径
        await ctx.render('home/login',{
            btnName: 'GoGoGo'
        });
    },
    register: async (ctx, next) => {
        let {name,password} = ctx.request.body;
        let data = await HomeService.register(name, password);
        ctx.response.body = data;

    }
}