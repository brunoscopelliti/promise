const isIterable =
  (subject) => subject != null && typeof subject[Symbol.iterator] == "function";

module.exports = isIterable;
