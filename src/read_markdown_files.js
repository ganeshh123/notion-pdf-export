let fileSystem = require('fs')

let readMarkdownFiles = (targetPath) => {
    /* Create an Array of Markdown Files to be Converted */
    let markdownFiles = []
    fileSystem.readdirSync(targetPath).forEach(file => {
        if(file.includes('.md')){
            markdownFiles.push(file)
        }
    })
    return markdownFiles
}

module.exports = readMarkdownFiles