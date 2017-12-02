/// Promise.reject returns a Promise object that is rejected with the given reason.

"use strict";

const Promise = require("../../");
const TEST = "Promise.reject fulfilled promise";

const assert = require("assert");

const unexpectedFulfillment = require("./helpers/unexpected-fulfillment");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.ok(value instanceof Promise);
      value.then((innerValue) => {
        assert.strictEqual(innerValue, 42);
      });
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const p1 = new Promise((resolve) => {
  setTimeout(resolve, 100, 42);
});

const promise = Promise.reject(p1);
promise.then(unexpectedFulfillment, validate);

assert.strictEqual(promise.constructor, Promise);
