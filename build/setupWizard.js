"use strict";

var _child_process = require("child_process");

var _process = require("process");

var _process2 = _interopRequireDefault(_process);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startWizard() {
  makeConfigIfNoneExists();
  console.log("welcome to the wizard");
  var config = defineConfig();
  askFunctionName(config);
}

function askFunctionName(conf) {
  var attributes = ["name", "role", "handler", "s3 Bucket", "s3 bucket key"];
  var index = 0;
  _process2.default.stdin.setEncoding("utf8");
  _process2.default.stdin.on("readable", function (data) {
    _process2.default.stdout.write(attributes[index] + ": ");
  });
  _process2.default.stdin.on("data", function (data) {
    if (data.length > 1) {
      conf = updateConfig(conf, attributes[index], stripNewLinesFromData(data));
    }
    index++;
    if (index === attributes.length) {
      console.log(JSON.stringify(conf));
      _process2.default.exit();
    }
  });
  _process2.default.stdin.on("end", function (data) {
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
  if (_fs2.default.exists("/conf.json")) {
    console.log("it's a boy!");
  }
}

startWizard();