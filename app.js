const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const cors = require('koa2-cors'); // CORS是一个W3C标准，全称是"跨域资源共享"
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');
const game_config = require('./routes/game_config');
const pay = require('./routes/pay');

// error handler
onerror(app);

// middlewares
app.use(cors()); //全部允许跨域

app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
    views(__dirname + '/views', {
        extension: 'pug',
    })
);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(game_config.routes(), game_config.allowedMethods());
app.use(pay.routes(), pay.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
