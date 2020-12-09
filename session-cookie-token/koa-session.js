const koa = require("koa");
const app = new koa();

const session = require("koa-session");

app.keys = ["some secret"];

const SESS_CONFIG = {
  key: "kkb:sess", // cookie键名
  maxAge: 86400000,
  httpOnly: true, // 仅服务区修改
  signed: true, // 签名cookie
};

app.use(session(SESS_CONFIG, app));

app.use((ctx) => {
  if (ctx.path === "/favicon.ico") return;
  let n = ctx.session.count || 0;
  ctx.session.count = ++n;
  ctx.body = `${n} times come here`;
});
app.listen(3000);




