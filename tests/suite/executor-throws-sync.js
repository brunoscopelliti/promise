/// `executor` synchronously throws an exception.
/// In this case the engine should create a promise
/// already `REJECTED`, that has as `value` the error been thrown.

"use strict";

const Promise = require("../../");

const assert = require("assert");

const chalk = require("chalk");
const OK = chalk.bold.green("OK");

const sinon = require("sinon");

test();

function test () {
  const clock = sinon.useFakeTimers();

  const executor =
    (resolve) => {
      const obj = {};
      resolve(obj.foo.bar);
    };

  const rejected = new Promise(executor);

  assert.strictEqual(rejected.state, false);
  assert.ok(rejected.value instanceof Error);
  assert.strictEqual(rejected.value.message, "Cannot read property 'bar' of undefined");
  assert.throws(() => { clock.tick(1); },
    (error) => (error instanceof Error) && error.message === "Cannot read property 'bar' of undefined");

  console.log(`${OK} ..... Executor throws synchronously`);

  clock.restore();
}
