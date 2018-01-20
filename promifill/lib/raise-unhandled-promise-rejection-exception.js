const defer = require("./defer");
const thrower = require("./thrower");

const raiseUnhandledPromiseRejectionException =
  defer((error, promise) => {
    if (promise.chain.length > 0) {
      return;
    }
    thrower(error);
  });

module.exports = raiseUnhandledPromiseRejectionException;
