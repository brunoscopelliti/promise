/// `executor` synchronously throws an exception.
/// In this case the engine should create a promise
/// already `REJECTED`, that has as `value` the error been thrown.

"use strict";

const Promise = require("../../");
const TEST = "Executor throws synchronously";

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");
const FAIL = chalk.bold.red("FAIL");

const sinon = require("sinon");
const clock = sinon.useFakeTimers();

const executor =
  (resolve) => {
    const obj = {};
    resolve(obj.foo.bar);
  };

const rejected = new Promise(executor);

try {
  assert.strictEqual(rejected.state, false);
  assert.ok(rejected.value instanceof Error);
  assert.strictEqual(rejected.value.message, "Cannot read property 'bar' of undefined");
  assert.throws(() => { clock.tick(1); },
    (error) => (error instanceof Error) && error.message === "Cannot read property 'bar' of undefined");
} catch (fail) {
  console.log(`${FAIL} ..... ${TEST}`);
  console.log(fail);
  process.exit(1);
}

console.log(`${OK} ..... ${TEST}`);

clock.restore();
