// const koa = require("koa");
// const app = new koa();
// const { initRouter } = require("./loader");

// app.use(initRouter().routes());
// app.listen(3000);

const kkb = require("./kkb");
const app = new kkb();
app.start(3000);
