#!/usr/bin/env node
//指定脚本解释器为node
const program = require("commander");
program.version(require("../package").version);
program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));

program
  .command("refresh")
  .description("refresh routers...")
  .action(require("../lib/refresh"));
//解析主进程的参数
program.parse(process.argv);
