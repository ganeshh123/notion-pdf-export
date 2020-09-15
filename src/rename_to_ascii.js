let fileSystem = require('fs')
let path = require('path')
let evilCharacterRegex = /[^\x00-\x7F]/g

let renameToAscii = (files) => {

    let newListOfFiles = files

    files.forEach((file) => {
        let evilCharacters = file.match(evilCharacterRegex)

        if(evilCharacters){
            console.log('Evil Characters Found:')
            console.log(evilCharacters)

            let newFileName = file
            evilCharacters.forEach((character) => {
                newFileName = newFileName.replace(character, '')
            })

            console.log('Renaming to ' + newFileName)

            let oldFile = path.join(process.cwd(), file)
            let newFile = path.join(process.cwd(), newFileName)

            fileSystem.renameSync(oldFile, newFile)

            newListOfFiles = []
            fileSystem.readdirSync(process.cwd()).forEach(file => {
                if(file.includes('.html') || file.includes('.htm')){
                    newListOfFiles.push(file)
                }
            })
        }
    })
    
    return newListOfFiles
}

module.exports = renameToAscii