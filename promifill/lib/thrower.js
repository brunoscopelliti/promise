const thrower =
  (error) => {
    throw error instanceof Error
      ? error
      : new Error(error);
  };

module.exports = thrower;
