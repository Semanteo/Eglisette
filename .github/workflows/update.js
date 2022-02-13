const path = "./articles/vendanges2020.md"
const fs = require('fs')

fs.readFile(path, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
