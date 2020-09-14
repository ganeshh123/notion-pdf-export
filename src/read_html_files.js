let fileSystem = require('fs')

let readHtmlFiles = (targetPath) => {
    /* Create an Array of HTML Files to be Converted */
    let htmlFiles = []
    fileSystem.readdirSync(targetPath).forEach(file => {
        if(file.includes('.html') || file.includes('.htm')){
            htmlFiles.push(file)
        }
    })
    return htmlFiles
}

module.exports = readHtmlFiles