#!/usr/bin/env node

import fs from "fs";
import { exec } from "child_process";

function node_bundle(argument) {
  resolve_path(argument);
}

function resolve_path(argument) {
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
    correct_path.path;
    exec(
      "zip -r " + argument + ".zip " + correct_path.prefix + correct_path.path,
      function(err, stdout, stderr) {
        if (err) {
          console.log(err);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    );
  } else {
    console.log("directory not found");
  }
}

node_bundle(process.argv[2]);
