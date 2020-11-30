const net = require("net");
const chatServer = net.createServer();
const clientList = [];

chatServer.on("connection", (client) => {
  // 将连接的客户端统一保存，以便同步数据
  clientList.push(client);
  console.log("Welcome to the Chat!");
  client.on("data", (data) => {
    clientList.forEach((v) => {
      v.write(data);
    });
  });
});
chatServer.listen(9000)

// 通过telnet localhost 9000连接