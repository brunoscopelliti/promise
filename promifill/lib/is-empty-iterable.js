const isEmptyIterable =
  (subject) => {
    for (let _ of subject) { // eslint-disable-line no-unused-vars
      return false;
    }

    return true;
  };

module.exports = isEmptyIterable;
