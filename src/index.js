#!/usr/bin/env node

import fs from "fs";
import { exec, spawn } from "child_process";

function node_bundle(argument) {
  resolve_path(argument);
}

function resolve_path(argument, callback) {
  const path = { path: argument };
  const prefixes = ["", ".", "./", "../"];
  const correct_path = {};
  prefixes.forEach(prefix => {
    path.path = prefix + argument + "/index.js";
    console.log(path.path);
    if (fs.existsSync(path.path)) {
      correct_path.path = path.path;
      correct_path.prefix = prefix;
    }
  });
  if (correct_path.path) {
    console.log(correct_path.path);
    const module_path = resolve_node_modules();
    copy_node_modules(argument, module_path, correct_path, bundle_function);
  } else {
    console.log("directory not found");
  }
}

function bundle_function(argument, correct_path) {
  console.log("zip -r " + argument + ".zip " + correct_path.prefix + argument);
  const zip = spawn("zip", [
    "-r",
    "-q",
    argument + ".zip",
    correct_path.prefix + argument
  ]);
  zip.stdout.pipe(process.stdout);
  zip.on("error", function(err) {
    console.log(err);
  });
  zip.on("exit", function() {
    console.log("exit");
    process.exit();
  });
}

function copy_node_modules(argument, module_path, dir_path, callback) {
  exec(
    "cp -R " +
      module_path.path +
      " " +
      dir_path.prefix +
      argument +
      "/node_modules",
    function(err, stdout, stderr) {
      if (err) {
        console.log(err);
      }
      callback(argument, dir_path);
    }
  );
}

function resolve_node_modules() {
  const path = {};
  const prefixes = ["", ".", "./", "../"];
  const correct_path = {};
  prefixes.forEach(prefix => {
    path.path = prefix + "node_modules";
    if (fs.existsSync(path.path)) {
      correct_path.path = path.path;
      correct_path.prefix = prefix;
    }
  });
  return correct_path;
}

node_bundle(process.argv[2]);
