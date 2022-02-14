const path = "./articles/"
const path_two = "./routing.json"
const fs = require('fs')
const getTitle = require('get-md-title');
const getDesc = require('get-md-desc');
var desc;
var title;
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
        console.log(content);
        title = getTitle(content).text;
        desc = getDesc(content).text;
          
          fs.readFile(path_two, 'utf-8', function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        content = JSON.parse(content)
        console.log(content["articles"])
        content["articles"].push({
     "date":1624129211326,
     "description": `${desc}`,
     "title": `${title}`,
     "slug": `${title.toLowerCase().replace(" ","").replace(" ","")}`,
     "image": "https://static.wixstatic.com/media/32b942_93b5b7494fe94c7b873dfe5ea71710cc~mv2_d_2000_3008_s_2.jpg/v1/fill/w_1903,h_543,al_c,q_85,usm_0.66_1.00_0.01/32b942_93b5b7494fe94c7b873dfe5ea71710cc~mv2_d_2000_3008_s_2.webp",
     "url": `${path + filename} `,
     "tags": ["vendanges"]
   })
      });
      });
    });
  });

