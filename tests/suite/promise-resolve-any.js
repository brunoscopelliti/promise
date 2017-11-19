/// Promise.resolve returns a Promise object that is resolved with the given value.

"use strict";

const Promise = require("../../");
const TEST = "Promise.resolve any";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

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

const promise = Promise.resolve(42);
promise.then(validate);

assert.strictEqual(promise.constructor, Promise);
