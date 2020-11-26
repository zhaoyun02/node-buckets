const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
// const server  = http.createServer((req,res)=>{
//   res.writeHead(200)
//   res.end('Big Pig')
// })
// server.listen(3000,()=>{
//   console.log('Start at 3000');

// })

class ZY {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose(this.middlewares);
      await fn(ctx);
      // this.callback(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  use(middleware) {
    this.middlewares.push(middleware);
    console.log("middlewares", this.middlewares);
  }
  // use(callback) {
  //   this.callback = callback;
  // }
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        const fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }
    };
  }
}

module.exports = ZY;
