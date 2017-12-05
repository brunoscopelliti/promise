/// `executor` rejects the promise.

"use strict";

const Promise = require("../../");
const TEST = "Executor reject immediate";

const assert = require("assert");

const unexpectedFulfillment = require("./helpers/unexpected-fulfillment");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (value) => {
    try {
      assert.ok(value instanceof Promise);
      assert.strictEqual(value.state, void 0);
    } catch (fail) {
      console.log(`${FAIL} ..... ${TEST}`);
      console.log(fail);
      process.exit(1);
    }

    console.log(`${OK} ..... ${TEST}`);
  };

const executor =
  (resolve, reject) => {
    reject(new Promise((resolve) => setTimeout(resolve, 1000, 42)));
  };

const rejected = new Promise(executor);
rejected.then(unexpectedFulfillment, validate);
