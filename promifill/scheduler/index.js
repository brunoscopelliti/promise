const MutationObserverStrategy = require("./strategies/mutation-observer");

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

    const ctrl = new MutationObserverStrategy(run);

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
