/// Promise.race returns a promise that resolves or rejects as soon
/// as one of the promises in the iterable resolves or rejects,
/// with the value or reason from that promise.

"use strict";

const Promise = require("../../");
const TEST = "Promise.race resolve promise";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.strictEqual(value, 1);
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const p1 = new Promise((resolve) => {
  resolve(1);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("Boom!"));
});

const promise = Promise.race([p1, 2, p2]);
promise.then(validate);

assert.strictEqual(promise.constructor, Promise);
