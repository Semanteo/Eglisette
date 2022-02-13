const path = "./articles/"
const fs = require('fs')
import getTitle from 'get-md-title';

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
        console.log(getTitle(content).text)
      });
    });
  });

