const fs = require("fs");
const Handlebars = require("handlebars"); // eslint-disable-line no-unused-vars

const compiler = require("./suite.tpl.hbs");

fs.writeFileSync("tests/node.js",
  compiler(require("./suite/index.json")));
