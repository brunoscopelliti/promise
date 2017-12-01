const unexpectedFulfillment =
  (value) => {
    throw new Error(`Unexpected onfulfillment handler with value ${value}`);
  };

module.exports = unexpectedFulfillment;
