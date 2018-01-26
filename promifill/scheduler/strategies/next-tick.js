class NextTickStrategy {
  constructor (handler) {
    this.scheduleNextTick =
      () => process.nextTick(handler);
  }

  trigger () {
    this.scheduleNextTick();
  }
}

module.exports = NextTickStrategy;
