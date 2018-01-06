"use strict";

const [PENDING, FULFILLED, REJECTED] =
  [void 0, true, false];

class Promifill {
  constructor () {
    this.state = PENDING;
    this.value = void 0;
  }
}
