const fs = require("fs")
const file = "./db/data.json"

const saveFile = data => {
   fs.writeFileSync(file, data)
}

const readFile = () => {
   if (fs.existsSync(file)) {
      const info = fs.readFileSync(file, { encoding: "utf-8" })
      const parsedInfo = JSON.parse(info)
      return parsedInfo
   } else return null
}

module.exports = {
   saveFile,
   readFile
}
