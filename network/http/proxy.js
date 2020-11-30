const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
//反向代理: 靠近服务器的
const app = express();
app.use(express.static(__dirname + "/"));
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: false,
  })
);
app.listen(3000);
