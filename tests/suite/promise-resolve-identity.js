/// Promise.resolve returns a Promise object that is resolved with the given value.
/// If the value was a promise, that promise becomes the result of the call to Promise.resolve.

"use strict";

const Promise = require("../../");
const TEST = "Promise.resolve identity";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const promise = new Promise((resolve) => {
  resolve(42);
});

try {
  assert.strictEqual(Promise.resolve(promise), promise);
} catch (fail) {
  console.log(`${FAIL} ..... ${TEST}`);
  console.log(fail);
  process.exit(1);
}

console.log(`${OK} ..... ${TEST}`);
