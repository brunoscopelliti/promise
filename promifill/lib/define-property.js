const defineProperty =
  (obj, propName, propValue) => {
    Object.defineProperty(obj, propName, { value: propValue });
  };

module.exports = defineProperty;
