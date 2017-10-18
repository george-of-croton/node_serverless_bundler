#!/usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function node_bundle(argument) {
  resolve_path(argument);
}

function resolve_path(argument) {
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
    correct_path.path;
    (0, _child_process.exec)("zip -r " + argument + ".zip " + correct_path.prefix + correct_path.path, function (err, stdout, stderr) {
      if (err) {
        console.log(err);
      }
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
    });
  } else {
    console.log("directory not found");
  }
}

node_bundle(process.argv[2]);