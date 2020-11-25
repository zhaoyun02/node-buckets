const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.yellow(content));
const { clone } = require("./download");
const open = require("open");
// 输出流可以引入主进程输出流
const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};
module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("Welcome ZhaoYun");
  log(data);
  //下载
  log("🚀创建项目...");
  //   await clone("github:su37josephxia/vue-template", name);
  //安装依赖
  log("安装依赖...");
  //   await spawn("npm", ["install"], { cwd: `./${name}` });
  log(
    chalk.green(` 
    👌安装完成： 
    To get Start:
     =========================== 
        cd ${name} 
        npm run serve 
     ===========================
`)
  );

  //打开浏览器
  open("http://localhost:8080");
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
