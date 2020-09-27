let fileSystem = require('fs')
let path = require('path')
let filesToKeep = require('./files_to_keep')
let exec = require('child_process').execSync

let isMac = process.platform === 'darwin'

let moveAssets = (targetPath) => {

    let files = fileSystem.readdirSync(targetPath).filter((file) => {
        return !filesToKeep.includes(file)
    })


    if(files.length > 0){
        let newPaths = []

        if(!fileSystem.existsSync(path.join(targetPath, 'assets'))){
            fileSystem.mkdirSync(path.join(targetPath, 'assets'))
        }

        files.forEach((file, index) => {
            let newPath = path.join(targetPath, 'assets', file)
            newPaths.push(newPath)
            files[index] = path.join(targetPath, file)
        })

        files.forEach((file, index) => {
            fileSystem.renameSync(file, newPaths[index])
        })


        if(!isMac){
            /* Windows has permission issues with merging folders, so using Robocopy instead */
            try{
                roboOutput = exec('robocopy assets pdfs /E')
            }catch (err){
                console.log(err.status);             // get the return code
                console.log(err.output.toString());  // get robocopy's full output
            }
            try{
                deleteOutput = exec('rmdir /Q /S assets')
            }catch (err){
                console.log(err.status);             // get the return code
                console.log(err.output.toString());  // get full output
            }            
        }else{
            
        }

        
        console.log('\nSome Assets or Files could not be embedded into PDFs. You can find these in the pdfs folder.\n')
    }

}

module.exports = moveAssets