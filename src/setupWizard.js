import { exec, spawn } from "child_process";
import process from "process";
import fs from "fs";
import path from "path";

function startWizard() {
  makeConfigIfNoneExists();
  console.log("welcome to the wizard");
  const config = defineConfig();
  askFunctionName(config);
}

function askFunctionName(conf) {
  const attributes = ["name", "role", "handler", "s3 Bucket", "s3 bucket key"];
  let index = 0;
  process.stdin.setEncoding("utf8");
  process.stdin.on("readable", function(data) {
    process.stdout.write(attributes[index] + ": ");
  });
  process.stdin.on("data", function(data) {
    if (data.length > 1) {
      conf = updateConfig(conf, attributes[index], stripNewLinesFromData(data));
    }
    index++;
    if (index === attributes.length) {
      console.log(JSON.stringify(conf));
      process.exit();
    }
  });
  process.stdin.on("end", function(data) {
    console.log("exiting");
  });
}

function handleError(err) {
  console.log("error:" + err);
}

function updateConfig(config, key, value) {
  config[key] = value;
  return config;
}

function defineConfig() {
  return {};
}

function stripNewLinesFromData(data) {
  return data.replace("\n", "");
}

function makeConfigIfNoneExists() {
  if (fs.exists("/conf.json")) {
    console.log("it's a boy!");
  }
}

startWizard();
