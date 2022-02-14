const path = "./articles/"
const path_two = "./routing.json"
const fs = require('fs')
const extract = require('article-data');
var desc;
var title;
var date;
var img_path;
var tags;
const new_articles = [];
const opts = {
  level: 1,
  excerpt: 5
}

const md = require('markdown-it')()
  .use(require('markdown-it-title'), opts)
var env = {}


let dat;
 fs.readFile(path_two, (err, data) => {
        if (err) {
          throw err;
        }

        dat = JSON.parse(data)
            console.log("DATA:" ,dat)
   
fs.readdir(path, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(path + filename, 'utf-8', function(err, content) {
        console.log(filename)
        if (err) {
          console.log(err);
          return;
        }
        env = {};
        md.render(content, env)
        const article = extract(content, 'DD MMMM YYYY', 'fr');
        title = env.title;
        desc = env.excerpt[0];
        date = article.date.unix;
        tags = env.excerpt[3];
        tags = tags.split(":")
        tags.shift()
        console.log(tags)
        console.log(tags[0].split(","))
        img_path = article.image.src;
        new_articles.push({
            "date":`${date}`,
            "description": `${desc}`,
            "title": `${title}`,
            "slug": `${title.toLowerCase().replace(" ","-").replace(" ","-").replace(" ","-").replace(" ","-")}`,
            "image": `${img_path}`,
            "url": `${path + filename} `,
            "tags": tags[0].split(",")
               });
        dat["articles"] = new_articles;
        console.log("DATA FINAL : ", dat)
        wri(dat)
    });
  });
});
});

function wri(dat) {
  const dataa = JSON.stringify(dat, null, 2);
  fs.writeFile(path_two, dataa, 'utf-8', (err) => {
   if (err) { 
     throw err;
   }
   console.log('README update complete.');
 });
}
