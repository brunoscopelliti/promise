/// Promise.all returns a single promise that becomes fulfilled when
/// all of the promises in the iterable argument have been resolved.
/// It rejects with the reason of the first promise that rejects.

"use strict";

const Promise = require("../../");
const TEST = "Promise.all resolve";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const validate =
  (values) => {
    try {
      assert.ok(Array.isArray(values));
      const [p0, p1, p2, p3] = values;
      assert.strictEqual(p0, 0);
      assert.strictEqual(p1, 1);
      assert.strictEqual(p2, 2);
      assert.deepEqual(p3, ["a", "b", "c"]);
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
  resolve(new Promise((resolve) => {
    setTimeout(resolve, 500, 2);
  }));
});

const p3 = new Promise((resolve, reject) => {
  resolve(["a", "b", "c"]);
});

const promise = Promise.all([0, p1, p2, p3]);
promise.then(validate);

assert.strictEqual(promise.constructor, Promise);
