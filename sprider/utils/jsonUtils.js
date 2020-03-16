const fs = require("fs")
const path = require('path')
let formatJson = require('format-json-pretty')

/**
 * Module writeJson.
 * Json to file
 */
exports.writeJson = function(data, fileName) {  
    const baseDir = path.resolve(__dirname, '../data/')
    const opts = {
      cwd: baseDir,
      encoding: 'utf8',
      stdio: [process.stdin, process.stdout, process.stderr]
    }
    fileName = baseDir + '/' + fileName;
    // console.log(baseDir)
    // console.log(fileName)
    fs.writeFileSync(fileName, `${formatJson(data)}`, opts);
  }