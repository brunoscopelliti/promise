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

    const observer = new MutationObserver(run);
    const node = document.createTextNode("");

    observer.observe(node, { characterData: true });

    return (observers) => {
      if (observers.length == 0) {
        return;
      }

      microtasks = microtasks.concat(observers);
      observers.length = 0;

      node.data = node.data === 1
        ? 0
        : 1;
    };
  })();

module.exports = schedule;
