// This script is meant to be executed in an environment
// in which both native builtin and Promifill are defiened.

const estimatedTestDuration = 5000;
const push =
  (stack, el) => void stack.push(el);

const nativeBuiltinStack = [];
const promifillStack = [];

const testcase = [{
  PromiseConstructor: Promifill,
  stack: promifillStack
}, {
  PromiseConstructor: Promise,
  stack: nativeBuiltinStack
}];

const test =
  ({ PromiseConstructor: BuiltIn, stack }) => {
    const pushStack =
      (el) => push(stack, el);

    const fail =
      () => pushStack(Math.random());

    setTimeout(() => {
      synchronouslyResolvedPromise_3
        .then((value_p) => {
          pushStack(value_p);
          return new BuiltIn((resolve, reject) => {
            reject(
              new BuiltIn((resolve, reject) => {
                resolve("Q")
              })
            );
          })
          .then(fail)
          .then(fail)
          .catch((value_q) => {
            value_q.then(pushStack);
            return "R";
          })
          .then((value_r) => {
            pushStack(value_r);
            return "S";
          })
        })
        .then((value_s) => {
          pushStack(value_s);
          return new BuiltIn((resolve, reject) => {
            resolve("T");
          })
          .then((value_t) => {
            pushStack(value_t);
            return "U"
          })
        })
        .then(pushStack);
    }, 2500);

    const asynchronouslyResolvedDelayedPromise = new BuiltIn((resolve, reject) => {
      setTimeout(resolve, 1000, "I");
    });

    setTimeout(pushStack, 0, "G");

    asynchronouslyResolvedDelayedPromise
      .then((value_i) => {
        pushStack(value_i);
        return new BuiltIn((resolve, reject) => {
          setTimeout(resolve, 250, "L");
        })
      })
      .then((value_l) => {
        pushStack(value_l);
        throw new Error("Fail");
      })
      .then(pushStack, () => {
        return new BuiltIn((resolve, reject) => {
          setTimeout(resolve, 250, "M");
        });
      })
      .then((value_m) => {
        pushStack(value_m);
        throw new Error("Fail");
      })
      .then(() => {
        // Here I'm testing that rejected promise
        // passes untouched through this chain.
        fail();
      })
      .then(fail)
      .then(fail)
      .then(fail)
      .then(fail)
      .catch((err) => {
        pushStack("N");
        return new BuiltIn((resolve, reject) => {
          setTimeout(resolve, 250, "O");
        });
      })
      .then(pushStack);

    asynchronouslyResolvedDelayedPromise
      .then((value_i) => {
        return "J";
      })
      .then((value_j) => {
        pushStack(value_j);
        return "K";
      })
      .then(pushStack);

    const asynchronouslyResolvedPromise = new BuiltIn((resolve, reject) => {
      setTimeout(resolve, 0, "H");
    });

    asynchronouslyResolvedPromise.then(pushStack);

    const synchronouslyResolvedPromise_1 =
      new BuiltIn((resolve, reject) => {
        resolve("B");
      });

    synchronouslyResolvedPromise_1.then(pushStack);
    synchronouslyResolvedPromise_1.then(() => pushStack("C"));

    const synchronouslyResolvedPromise_2 =
      new BuiltIn((resolve, reject) => {
        resolve("D");
      });

    synchronouslyResolvedPromise_2.then(pushStack);

    synchronouslyResolvedPromise_1
      .then((x) => {
        if (x !== "B") {
          throw new Error("Unexpected value", x, "instead of \"B\"");
        }
        pushStack("E");
        return "F";
      })
      .then(pushStack);

    const synchronouslyResolvedPromise_3 =
      new BuiltIn((resolve, reject) => {
        resolve("P");
      });

    const synchronouslyRejectedPromise = new BuiltIn((resolve, reject) => {
      reject("V");
    });

    // Only to prevent unhandled promise rejection exception,
    // that would exit the test (node).
    synchronouslyRejectedPromise.catch(() => {});

    setTimeout(() => {
      const recoveredPromise = synchronouslyRejectedPromise
        .then(pushStack)
        .catch((value_v) => {
          pushStack(value_v);
          return new BuiltIn((resolve, reject) => {
            setTimeout(resolve, 0, "W");
          });
        })
        .then((value_w) => {
          pushStack(value_w);
          return "X";
        })
        .catch(fail)
        .then((value_x) => {
          pushStack(value_x);
          return "Y";
        });
      recoveredPromise
        .then((value_y) => {
          pushStack(value_y);
          return "Z";
        })
        .then(pushStack);
    }, 3000);


    pushStack("A");
  };

testcase.forEach(test);

const compare = () => {
  const expected = nativeBuiltinStack.toString();
  const actual = promifillStack.toString();
  console.info(`
    Results:
    ---
     * Native BuiltIn ..... ${expected}
     * Promifill .......... ${actual}

    ${ (expected == actual)
      ? " > OK ... %cTest succeded"
      : " > Fail ... %cActual result differs from expected" }`, `color: ${ (expected == actual) ? "green" : "red" }; font-weight: bold;`);
};

void setTimeout(compare, estimatedTestDuration);
