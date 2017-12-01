/// Promise.race returns a promise,
/// that gets rejected in case the promise in the iterable,
/// that has firstly its fate defined, is rejected

"use strict";

const Promise = require("../../");
const TEST = "Promise.race reject";

const assert = require("assert");

const unexpectedFulfillment = require("./helpers/unexpected-fulfillment");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.ok(value instanceof Error);
      assert.strictEqual(value.message, "Boom race!");
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const p1 = new Promise((resolve) => {
  setTimeout(resolve, 100, 1);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("Boom race!"));
});

const promise = Promise.race([p1, p2]);
promise.then(unexpectedFulfillment, validate);

assert.strictEqual(promise.constructor, Promise);
