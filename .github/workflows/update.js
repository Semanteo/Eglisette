const path = "./articles/"
const path_two = "./routing.json"
const fs = require('fs')
const getTitle = require('get-md-title');
const getDesc = require('get-md-desc');

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
        console.log(getDesc(content).text)
      });
    });
  });


 fs.readFile(path_two, 'utf-8', function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(content)
      });
