let fileSystem = require('fs')
let path = require('path')

/* Returns an array consisting of the paths of all the files (recursive) in a folder */

let filePaths = []

// targetPath = folder to get all filepaths from
let getAllFilePaths = (targetPath) => {

  let files = fileSystem.readdirSync(targetPath)

  files.forEach((fileName) => {
    if (fileSystem.statSync(path.join(targetPath, fileName)).isDirectory()) {
      getAllFilePaths(path.join(targetPath, fileName))
    } else {
      filePaths.push(path.join(targetPath, fileName))
    }
  })

  return filePaths
}

module.exports = getAllFilePaths