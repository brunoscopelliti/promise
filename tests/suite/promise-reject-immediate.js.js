/// Promise.reject immediately rejects the promise.

"use strict";

const Promise = require("../../");
const TEST = "Promise.reject immediate";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.ok(value instanceof Promise);
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const p1 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "Boom!");
});

const p2 = new Promise((resolve) => {
  setTimeout(resolve, 1000, 42);
});

const rejected = new Promise((resolve, reject) => {
  reject(p2);
});

Promise.race([p1, rejected.catch(validate)]);
