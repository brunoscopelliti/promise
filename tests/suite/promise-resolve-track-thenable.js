/// Promise.resolve returns a Promise object that is resolved with the given value.
/// If the value is a thenable (i.e. has a "then" method), the returned promise will track that thenable.

"use strict";

const BuiltinPromise = (() => {
  if (typeof window !== "undefined") {
    return window.Promise;
  } else if (typeof global !== "undefined") {
    return global.Promise;
  }
})();

const Promise = require("../../");
const TEST = "Promise.resolve track thenable";

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

const builtIn = new BuiltinPromise((resolve) => setTimeout(resolve, 100, 21))
  .then((value) => value * 2);

const promise = Promise.resolve(builtIn);
promise.then(validate);

assert.strictEqual(promise.constructor, Promise);
