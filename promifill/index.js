"use strict";

const defineProperty = require("./lib/define-property");

const [PENDING, FULFILLED, REJECTED] =
  [void 0, true, false];

class Promifill {
  get state () {
    return PENDING;
  }

  get value () {
    return void 0;
  }

  get settled () {
    return false;
  }

  constructor (executor) {
    if (typeof executor != "function") {
      throw new TypeError(`Promise resolver ${Object.prototype.toString.call(executor)} is not a function`);
    }

    const resolve =
      (value) => {
        if (this.settled) {
          return;
        }

        defineProperty(this, "settled", true);

        defineProperty(this, "value", value);
        defineProperty(this, "state", FULFILLED); // #FIXME
      };

    const reject =
      (reason) => {
        if (this.settled) {
          return;
        }

        defineProperty(this, "settled", true);

        defineProperty(this, "value", reason);
        defineProperty(this, "state", REJECTED);
      };

    executor(resolve, reject);
  }
}
