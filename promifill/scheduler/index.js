const MutationObserverStrategy = require("./strategies/mutation-observer");
const NextTickStrategy = require("./strategies/next-tick");
const BetterThanNothingStrategy = require("./strategies/not-standard-compliant");

const getStrategy =
  () => {
    if (typeof window != "undefined" && typeof window.MutationObserver == "function") {
      return MutationObserverStrategy;
    }
    if (typeof global != "undefined" && typeof process != "undefined" && typeof process.nextTick == "function") {
      return NextTickStrategy;
    }

    return BetterThanNothingStrategy;
  };

const schedule =
  (() => {
    let microtasks = [];

    const run =
      () => {
        let handler, value;
        while (microtasks.length > 0 && ({ handler, value } = microtasks.shift())) {
          handler(value);
        }
      };

    const Strategy = getStrategy();
    const ctrl = new Strategy(run);

    return (observers) => {
      if (observers.length == 0) {
        return;
      }

      microtasks = microtasks.concat(observers);
      observers.length = 0;

      ctrl.trigger();
    };
  })();

module.exports = schedule;
