const executor =
  () => {
    throw new TypeError("Cannot read property 'foo' of undefined.");
  };

const promise = new Promise(executor);

console.log("Promise:", promise);
