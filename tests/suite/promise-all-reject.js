/// Promise.all returns a promise,
/// that gets rejected in case at least one of the promises in the iterable gets rejected.
/// In this case the promise's value is the reason for which the promise got rejected.

"use strict";

const Promise = require("../../");
const TEST = "Promise.all reject";

const assert = require("assert");

const unexpectedFulfillment = require("./helpers/unexpected-fulfillment");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.ok(value instanceof Error);
      assert.strictEqual(value.message, "Boom all!");
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
  reject(new Error("Boom all!"));
});

const promise = Promise.all([p1, p2]);
promise.then(unexpectedFulfillment, validate);

assert.strictEqual(promise.constructor, Promise);
