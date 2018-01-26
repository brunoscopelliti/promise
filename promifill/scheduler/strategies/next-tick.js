class NextTickStrategy {
  constructor (handler) {
    this.scheduleNextTick =
      () => process.nextTick(handler);
  }

  trigger () {
    this.scheduleNextTick();
  }
}

export default NextTickStrategy;
