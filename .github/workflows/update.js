const path = "./articles/vendanges2020.md"
const fs = require('fs')

fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(path + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        console.log(content)
      });
    });
  });
