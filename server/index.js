const Koa = require('koa');
const Router = require('koa-router');
const Http = require('http');
const Querystring = require('querystring')
const rp = require('request-promise-native')

const app = new Koa();
const router = new Router();

const useRequest = {
    search: async (params) => {
        // const url = `https://read.douban.com/j/suggest_v2?q=nice`
        const url = `https://read.douban.com/j/suggest_v2?${Querystring.stringify(params)}`
        // const url = 'http://m.maoyan.com/ajax/search?kw=%E6%8D%89%E5%A6%96%E8%AE%B0&cityId=10'
        const res = await rp(url)
        let body
        try {
          body = JSON.parse(res)
        } catch (err) {
          console.log(err)
        }
        return body
    }
}

const useHttp = {
    search: async (kw = '') => {
        return new Promise((resolve, reject) => {
          //http://m.maoyan.com/ajax/search?kw=捉妖记&cityId=10
            Http.request({
                hostname: 'm.maoyan.com',
                path: '/ajax/search?' + Querystring.stringify({
                    kw,
                    cityId: 10
                })
            }, (res) => {
                res.setEncoding('utf8');
                let data = [];
                res.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
                    resolve(data.join(''));
                });
            }).end();
        });
    }
}

const Render = (data = {}, kw = '', home) => {

    let arr = [
        '<style>',
        '*{margin:0;padding:0;font-size: 12px;}',
        'body{padding:10px}',
        'button{padding: 0 10px;line-height: 20px;margin-left: 10px;}',
        'input{line-height: 20px; width: 200px;padding: 0 5px;}',
        'h3{font-size: 14px;}',
        'i{font-size: 14px;font-style: inherit;color: #f80;}',
        'p{color:#666;}',
        '.item{padding:10px 0 10px 0;border-bottom:1px solid #d2d2d2;display:flex;}',
        '.info{margin-left:10px}',
        '</style>',
        '<form action="/movie"><input name="kw" value="' + kw + '"/><button>搜索</button></form>',
        '<form action="/j/suggest_v2"><input name="q"  value="nice"/><button>使用request-promise-native发请求</button></form>',
    ];

    if(home !== 'isHomePage'){
        arr.push('<form action="/"><button>回到home page</button></form>')
    }

    data && data.movies && data.movies.list.forEach(item => {
        arr.push('<div class="item">')
        arr.push('<img src="' + item.img.replace('w.h', '64.90') + '"/>')
        arr.push('<div class="info">')
        arr.push('<h3>' + item.nm.replace(new RegExp(kw, 'g'), '<i>' + kw + '</i>') + '（' + item.enm + '）' + item.ver + '</h3>')
        arr.push('<p>' + item.cat + '</p>')
        arr.push('<p>' + item.star + '</p>')
        arr.push('<p>' + item.pubDesc + '</p>')
        arr.push('<p>' + item.sc + '分</p>')
        arr.push('</div>')
        arr.push('</div>')
    });

    return arr.join('')
}

router.get('/', async (ctx, next) => {
    ctx.body = Render('', '', 'isHomePage');
});

router.get('/movie', async (ctx, next) => {
    let { kw } = ctx.query;
    let data = await useHttp.search(kw);
    ctx.body = Render(JSON.parse(data), kw);
});

router.get('/j/suggest_v2', async (ctx, next) => {
    let data = await useRequest.search(ctx.query);
    ctx.body = '<p>搜索结果为：   '+JSON.stringify(data)+'</p>'+
    '<form action="/j/suggest_v2"><input name="q" value="nice" /><button>使用request-promise-native发请求</button></form>'+
    '<form action="/"><button>回到home page</button></form>';
});

app.use(router.routes()).listen(8080, () => {
    console.log('Server is running at http://localhost:8080')
})