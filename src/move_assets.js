let fileSystem = require('fs')
let path = require('path')
let filesToKeep = require('./files_to_keep')

let moveAssets = (targetPath) => {

    let files = fileSystem.readdirSync(targetPath).filter((file) => {
        return !filesToKeep.includes(file)
    })

    if(files){
        let newPaths = []

        files.forEach((file, index) => {
            let newPath = path.join(targetPath, '/pdfs/', file)
            newPaths.push(newPath)
            files[index] = path.join(targetPath, file)
        })

        files.forEach((file, index) => {
            fileSystem.renameSync(file, newPaths[index])
        })

        console.log('\nSome Assets or Files could not be embedded into PDFs. You can find these in the pdfs folder.\n')
    }

}

module.exports = moveAssets