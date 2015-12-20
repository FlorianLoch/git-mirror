"use strict";

let cp = require("child_process");
let uuid = require("uuid").v4.bind(require("uuid"));
let fs = require("fs");
let path = require("path");
let rimraf = require("rimraf");

let args = process.argv;
let pid = process.pid;
let origin = args[2];
let target =  args[3];
let subdir = uuid();
let cwd = process.cwd();

console.log(args);

let commands = [
  {cmd: "git", args: ["clone", "--mirror", origin, subdir], cwd: cwd},
  {cmd: `git`, args: ["remote", "add", "target", target], cwd: path.join(cwd, subdir)},
  {cmd: `git`, args: ["push", "--all", "target"], cwd: path.join(cwd, subdir)}
];
commands.forEach((task) => {
  let output = cp.spawnSync(task.cmd, task.args, {
    cwd: task.cwd
  }).output;
  console.log(output.toString());
});

//Cleanup afterwards
rimraf(subdir, {
  disableGlob: true
}, (err) => {
  let msg = `Done with repo '${origin}'.`;

  if (err) {
    msg += ` But cleanup failed: ${err.message}`;
  }
  else {
    msg += " Cleanup successfully completed!";
  }

  console.log(msg);
});
