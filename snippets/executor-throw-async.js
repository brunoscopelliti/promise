const executor =
  () => {
    setTimeout(() => {
      throw new TypeError("Cannot read property 'foo' of undefined.");
    }, 0);
  };

const promise = new Promise(executor);

console.log("Promise:", promise);
