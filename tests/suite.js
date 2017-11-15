const fs = require("fs");
const glob = require("glob");

glob("tests/suite/*.js", (err, files) => {
  if (err) {
    return console.error(err);
  }
  fs.writeFileSync("tests/suite/index.json", JSON.stringify(files));
});
