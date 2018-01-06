"use strict";

const [PENDING, FULFILLED, REJECTED] =
  [void 0, true, false];

class Promifill {
  constructor (executor) {
    if (typeof executor != "function") {
      throw new TypeError(`Promise resolver ${Object.prototype.toString.call(executor)} is not a function`);
    }

    this.state = PENDING;
    this.value = void 0;
  }
}
