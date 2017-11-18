/// `executor` executes `resolve` multiple time.
/// Only first execution should have effect.

"use strict";

const Promise = require("../../");
const TEST = "Executor multiple resolve";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const executor =
  (resolve) => {
    resolve(42);
    resolve("foo");
  };

const promise = new Promise(executor);

try {
  assert.strictEqual(promise.state, true);
  assert.strictEqual(promise.value, 42);
} catch (fail) {
  console.log(`${FAIL} ..... ${TEST}`);
  console.log(fail);
  process.exit(1);
}

console.log(`${OK} ..... ${TEST}`);
