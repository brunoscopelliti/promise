class BetterThanNothingStrategy {
  constructor (handler) {
    this.scheduleAsap =
      () => setTimeout(handler, 0);
  }

  trigger () {
    this.scheduleAsap();
  }
}

module.exports = BetterThanNothingStrategy;
