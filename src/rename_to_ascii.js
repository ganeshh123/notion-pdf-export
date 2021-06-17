let fileSystem = require('fs')
let path = require('path')
let evilCharacterRegex = /[^\x00-\x7F]/g
let getAllFilePaths = require('./get_all_filepaths')

let rescanNeeded = false

let renameToAscii = (files) => {

    let newListOfFiles = files

    /* Rename Files to ASCII */
    newListOfFiles.forEach((file, index) => {
        let evilCharacters = file.match(evilCharacterRegex)

        if(evilCharacters){

            console.log('Evil Characters Found:')
            console.log(evilCharacters)

            let newFileName = file
            evilCharacters.forEach((character) => {
                newFileName = newFileName.replace(character, '')
            })

            console.log('Renaming to ' + newFileName)

            let oldFile = file
            let newFile = newFileName

            try{
                fileSystem.renameSync(oldFile, newFile)
                newListOfFiles[index] = newFile
            }catch(err) {
                console.log('Error renaming ' + oldFile)
            }
        }
    })

    /*
    if(rescanNeeded){
        newListOfFiles = []
        let allFiles = getAllFilePaths(process.cwd())
        allFiles.forEach(file => {
            if(file.includes('.html') || file.includes('.htm')){
                newListOfFiles.push(file)
            }
        })
        console.log('Rescanned')
        console.log(newListOfFiles)
    }
    */
    
    return newListOfFiles
}

module.exports = renameToAscii