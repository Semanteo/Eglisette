const path = "./articles/"
const path_two = "./routing.json"
const fs = require('fs')
const extract = require('article-data');
var desc;
var title;
var date;
var img_path;

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
        title = article.title.text;
        desc = article.desc.text;
        date = article.date.unix;
        img_path = article.image.src;
          fs.readFile(path_two, 'utf-8', function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        content = JSON.parse(content)
        content["articles"].push({
     "date":`${new Date(date).getTime()}`,
     "description": `${desc}`,
     "title": `${title}`,
     "slug": `${title.toLowerCase().replace(" ","-").replace(" ","-").replace(" ","-").replace(" ","-")}`,
     "image": `${img_path}`,
     "url": `${path + filename} `,
     "tags": ["vendanges"]
        });
         let data = JSON.stringify(content, null, 2);
          console.log(content["articles"])
              fs.writeFileSync(path_two, data, (err) => {
                    if (err)
                    console.log(err);
                });
      });
      });
    });
  });

