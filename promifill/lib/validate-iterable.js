const isIterable = require("./is-iterable");

const validateIterable =
  (subject) => {
    if (isIterable(subject)) {
      return;
    }

    throw new TypeError(`Cannot read property 'Symbol(Symbol.iterator)' of ${Object.prototype.toString.call(subject)}.`);
  };

module.exports = validateIterable;
