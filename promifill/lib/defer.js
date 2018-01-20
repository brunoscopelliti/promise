const defer =
  (handler) =>
    (...args) => {
      setTimeout(handler, 0, ...args);
    };

module.exports = defer;
