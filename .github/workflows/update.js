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
        md.render(content, env)
        console.log(env)
        console.log(content);
        const article = extract(content, 'DD MMMM YYYY', 'fr');
        title = env.title;
        desc = env.excerpt[0];
        date = article.date.unix;
        tags = env.excerpt[3];
        tags = tags.split(":")
        console.log(tags.shift())
        tags = tags.shift()
        console.log(tags)
        console.log(tags.split(","))
        img_path = article.image.src;
        console.log(date)
        fs.readFile(path_two, 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }
        const dat = JSON.parse(data)
        dat["articles"].push({
     "date":`${date}`,
     "description": `${desc}`,
     "title": `${title}`,
     "slug": `${title.toLowerCase().replace(" ","-").replace(" ","-").replace(" ","-").replace(" ","-")}`,
     "image": `${img_path}`,
     "url": `${path + filename} `,
     "tags": tags.split(",")
        });
         let dataa = JSON.stringify(dat, null, 2);
         console.log(dat["articles"])
         fs.writeFile(path_two, dataa, 'utf-8', (err) => {
          if (err) { 
            throw err;
          }
          console.log('README update complete.');
        });
      });
    });
  });

