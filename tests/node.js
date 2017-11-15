const path = require("path");
const suite = require("./suite/index.json");
suite.forEach((file) => require(path.resolve(process.cwd(), file)));
