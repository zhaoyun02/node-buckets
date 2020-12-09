const koa = require("koa");

const {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule,
} = require("./loader");

class kkb {
  constructor(conf) {
    this.$app = new koa(conf);
    loadConfig(this);
    initSchedule();
    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
    this.$service = initService(this);
  }
  start(port) {
    this.$app.listen(port, () => {
      console.log(`Server run at ${port}`);
    });
  }
}
module.exports = kkb;
