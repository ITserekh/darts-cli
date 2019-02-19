const fs = require('fs-extra');

fs.copy('dist/darts-cli', 'c:/Users/tserakh/www/darts', function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});
