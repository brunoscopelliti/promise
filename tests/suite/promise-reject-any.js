/// Promise.reject returns a Promise object that is rejected with the given reason.

"use strict";

const Promise = require("../../");
const TEST = "Promise.reject any";

const assert = require("assert");

const unexpectedFulfillment = require("./helpers/unexpected-fulfillment");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.strictEqual(value, "Boom!");
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const promise = Promise.reject("Boom!"); // eslint-disable-line prefer-promise-reject-errors
promise.then(unexpectedFulfillment, validate);

assert.strictEqual(promise.constructor, Promise);
