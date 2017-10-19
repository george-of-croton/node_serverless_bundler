#!/usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function node_bundle(argument) {
  resolve_path(argument);
}

function resolve_path(argument, callback) {
  var path = { path: argument };
  var prefixes = ["", ".", "./", "../"];
  var correct_path = {};
  prefixes.forEach(function (prefix) {
    path.path = prefix + argument + "/index.js";
    console.log(path.path);
    if (_fs2.default.existsSync(path.path)) {
      correct_path.path = path.path;
      correct_path.prefix = prefix;
    }
  });
  if (correct_path.path) {
    console.log(correct_path.path);
    var module_path = resolve_node_modules();
    copy_node_modules(argument, module_path, correct_path, bundle_function);
  } else {
    console.log("directory not found");
  }
}

function bundle_function(argument, correct_path) {
  console.log("zip -r " + argument + ".zip " + correct_path.prefix + argument);
  var zip = (0, _child_process.spawn)("zip", ["-r", "-q", argument + ".zip", correct_path.prefix + argument]);
  zip.stdout.pipe(process.stdout);
  zip.on("error", function (err) {
    console.log(err);
  });
  zip.on("exit", function () {
    console.log("exit");
    process.exit();
  });
}

function copy_node_modules(argument, module_path, dir_path, callback) {
  (0, _child_process.exec)("cp -R " + module_path.path + " " + dir_path.prefix + argument + "/node_modules", function (err, stdout, stderr) {
    if (err) {
      console.log(err);
    }
    callback(argument, dir_path);
  });
}

function resolve_node_modules() {
  var path = {};
  var prefixes = ["", ".", "./", "../"];
  var correct_path = {};
  prefixes.forEach(function (prefix) {
    path.path = prefix + "node_modules";
    console.log(path.path);
    if (_fs2.default.existsSync(path.path)) {
      correct_path.path = path.path;
      correct_path.prefix = prefix;
    }
  });
  return correct_path;
}

node_bundle(process.argv[2]);