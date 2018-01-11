const isThenable =
  (subject) => subject && typeof subject.then == "function";

module.exports = isThenable;
