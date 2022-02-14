const path = "./articles/"
const path_two = "./routing.json"
const fs = require('fs')
const extract = require('article-data');
var desc;
var title;
var date;
var img_path;
var tags;

const opts = {
  level: 1,
  excerpt: 5
}

const md = require('markdown-it')()
  .use(require('markdown-it-title'), opts)
const env = {}


function readWrite (callback) {
    let dat;
    fs.readFile(path_two, 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }
        dat = JSON.parse(data)
        dat["articles"] = [];
      console.log(dat)
    });
fs.readdir(path, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function(filename) {
      console.log(filename)
      fs.readFile(path + filename, 'utf-8', function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        md.render(content, env)
        const article = extract(content, 'DD MMMM YYYY', 'fr');
        title = env.title;
        desc = env.excerpt[0];
        date = article.date.unix;
        tags = env.excerpt[3];
        tags = tags.split(":")
        tags = tags.shift()
        img_path = article.image.src;
        dat["articles"].push({
            "date":`${date}`,
            "description": `${desc}`,
            "title": `${title}`,
            "slug": `${title.toLowerCase().replace(" ","-").replace(" ","-").replace(" ","-").replace(" ","-")}`,
            "image": `${img_path}`,
            "url": `${path + filename} `,
            "tags": tags.split(",")
               });
    });
  });
});
  console.log(dat)
callback(dat);
}
readWrite(function (dat) {
  console.log(dat)
  wri(dat)
});

function wri(dat) {
console.log(dat);
  const dataa = JSON.stringify(dat, null, 2);
  fs.writeFile(path_two, dataa, 'utf-8', (err) => {
   if (err) { 
     throw err;
   }
   console.log('README update complete.');
 });
}
