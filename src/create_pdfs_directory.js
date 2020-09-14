let fileSystem = require('fs')
let path = require('path')

let createPdfsDirectory = (targetPath) => {
    let pdfsFolder = path.join(targetPath, 'pdfs')

    if(!fileSystem.existsSync(pdfsFolder)){
        fileSystem.mkdirSync(pdfsFolder)
    }
}

module.exports = createPdfsDirectory