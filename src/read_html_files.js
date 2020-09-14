let fileSystem = require('fs')
let renameToAscii = require('./rename_to_ascii')

let readHtmlFiles = (targetPath) => {
    /* Create an Array of HTML Files to be Converted */
    let htmlFiles = []
    fileSystem.readdirSync(targetPath).forEach(file => {
        if(file.includes('.html') || file.includes('.htm')){
            htmlFiles.push(file)
        }
    })
    return renameToAscii(htmlFiles)
}

module.exports = readHtmlFiles