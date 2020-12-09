// session存储到redis
const koa = require("koa");
const app = new koa();
const session = require("koa-session");

// const redisStore = require('koa-redis')
// const redis = require('redis')
// const redisClient = redis.createClient(6379, 'localhost')

// const wrapper = require('co-redis')
// const client = wrapper(redisClient)

app.keys = ["some secret"];

const SESS_CONFIG = {
  key: "kkb:sess", // cookie键名
  maxAge: 86400000,
  httpOnly: true, // 仅服务区修改
  signed: true, // 签名cookie
//   store: redisStore({ client }),
};

app.use(session(SESS_CONFIG, app));

app.use((ctx) => {
//     console.log(1111)
//   redisClient.keys("*", (err, keys) => {
//     console.log("keys:", keys);
//     keys.forEach((key) => {
//       redisClient.get(key, (err, val) => {
//         console.log(val);
//       });
//     });
//   });

  if (ctx.path === "/favicon.ico") return;
  let n = ctx.session.count || 0;
  ctx.session.count = ++n;
  ctx.body = `${n} times come here`;
});
app.listen(3000);