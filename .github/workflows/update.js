const path = "./articles/vendanges2020.md"
const fs = require('fs')

fs.readdir(path, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(path + filename, 'utf-8', function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(content)
      });
    });
  });
