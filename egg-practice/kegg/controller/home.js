// module.exports = {
//   index: async (ctx) => {
//     ctx.body = "首页CTRL";
//   },
//   detail: async (ctx) => {
//     ctx.body = "详情页面CTRL";
//   },
// };
module.exports = (app) => ({
  index: async () => {
    // const name = await app.$service.user.getName();
    // app.ctx.body = "首页CTRL: " + name;
    app.ctx.body = await app.$model.user.findAll()
  },
  detail: async () => {
    app.ctx.body = "详情页面CTRL";
  },
});
