const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

// load dir文件夹下的文件
function load(dir, cb) {
  const url = path.resolve(__dirname, dir);
  const files = fs.readdirSync(url);
  files.forEach((filename) => {
    filename = filename.replace(".js", "");
    const file = require(url + "/" + filename);
    cb(filename, file);
  });
}

function initRouter(app) {
  const router = new Router();
  load("routes", (filename, routes) => {
    routes = typeof routes === "function" ? routes(app) : routes;
    // index无前缀 其他文件加前缀 eg: filename=user => /user/detail
    const prefix = filename === "index" ? "" : `/${filename}`;
    Object.keys(routes).forEach((key) => {
      const [method, path] = key.split(" ");
      console.log(`正在映射地址： ${method}${prefix}${path}`);
      // routes[key]必须是一个中间件的形式，若引用的地方升级为高阶组件，则需要构造一个中间件，在中间件中执行这个高阶组件
      // router[method](prefix + path, routes[key]);
      router[method](prefix + path, async (ctx) => {
        app.ctx = ctx;
        await routes[key](app);
      });
    });
  });
  return router;
}

function initController(app) {
  const controllers = {};
  load("controller", (filename, controller) => {
    controllers[filename] = controller(app);
  });
  return controllers;
}

function initService(app) {
  const services = {};
  load("service", (filename, service) => {
    services[filename] = service(app);
  });
  return services;
}

const Sequelize = require("sequelize");

function loadConfig(app) {
  load("config", (filename, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db);
    }
    app.$model = {};
    load("model", (filename, { schema, options }) => {
      app.$model[filename] = app.$db.define(filename, schema, options);
    });
    app.$db.sync();
    if (conf.middleware) {
      console.log(111111);
      conf.middleware.forEach((mid) => {
        const midPath = path.resolve(__dirname, "middleware", mid);
        console.log(22222, midPath);
        app.$app.use(require(midPath));
      });
    }
  });
}
const schedule = require("node-schedule");
function initSchedule() {
  load("schedule", (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
  });
}
module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule,
};
