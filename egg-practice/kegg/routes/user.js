// module.exports = {
//   "get /": async (ctx) => {
//     ctx.body = "用户首页";
//   },
//   "get /info": async (ctx) => {
//     ctx.body = "用户详情页面";
//   },
// };

module.exports = {
  "get /": async (app) => {
    let name = await app.$service.user.getName();
    app.ctx.body = "用户：" + name;
  },
  "get /info": async (app) => {
    app.ctx.body = "用户age：" + app.$service.user.getAge();
  },
};
