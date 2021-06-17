let fileSystem = require('fs')
let path = require('path')

/* Creates Folders to allow the file at the specified file path to be created */
let createMissingFolders = (filePath) => {
    let destination = path.dirname(filePath)
    fileSystem.mkdirSync(destination, {recursive: true})
}

module.exports = createMissingFolders