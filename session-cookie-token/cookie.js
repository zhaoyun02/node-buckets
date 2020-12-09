const http = require("http");
const session = {};
http
  .createServer((req, res) => {
    const sessionKey = "sid";
    if (req.url === "/favicon.ico") {
      res.end("");
      return;
    } else {
      const cookie = req.headers.cookie;
      if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end("Come Back");
        console.log("cookie:", req.headers.cookie);
        // 简略写法未必具有通用性
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];
        console.log("session:", sid, session, session[sid]);
      } else {
        const sid = (Math.random() * 9999999).toFixed();
        res.setHeader("Set-Cookie", `${sessionKey}=${sid}`);
        session[sid] = { name: "laowang" };
        res.end("hello cookie");
      }
    }
  })
  .listen(3000);

// 请求服务器时，通过set-cookie设置cookie到浏览器，下次请求相同域时，浏览器会在请求头中自动带上cookie
