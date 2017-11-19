/// `executor` executes `resolve` multiple time.
/// Only first execution should have effect, even if value is a
/// PENDING promise

"use strict";

const Promise = require("../../");
const TEST = "Executor multiple resolve delayed";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const executor =
  (resolve) => {
    resolve(new Promise((resolve) => {
      setTimeout(resolve, 100, 42);
    }));
    resolve("foo");
  };

const validate =
  (value) => {
    try {
      assert.strictEqual(value, 42);
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const promise = new Promise(executor);
promise.then(validate);
