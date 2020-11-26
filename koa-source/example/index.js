// const Koa = require("koa");
// const app = new Koa();

// app.use(async (ctx, next) => {
//   // await next();
//   console.log(`11111 ${ctx.request.method} ${ctx.request.url}`);

//   ctx.body = "hello zhaoyun";
// });
// app.use((ctx, next) => {
//   console.log(`22222 ${ctx.request.method} ${ctx.request.url}`);
//   ctx.body = "hello 666";
// });
// app.listen(3000, () => {
//   console.log("starts at 3000");
// });

const Koa = require("../source/kkb");
const app = new Koa();

// app.use((ctx,next) => {
//   ctx.type = "text/html;charset=utf8";
// //   ctx.body = `<h1>welcome</h1>`;
//   ctx.response.body = `<h1>welcome</h1>`;
//   //   res.writeHead(200);
//   //   res.end("666 999");
// });

// const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));
// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });
const Router = require('../source/router')
const router = new Router()

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());
app.listen(3000, () => {
  console.log("监听 3000");
});
