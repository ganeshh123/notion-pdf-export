let fileSystem = require('fs')
let path = require('path')
let folder_empty = require('./folder_empty')
let canDelete = require('./can_delete')

/* Recursively Deletes a folder and it's contents */
// targetPath = absolute path of folder to be deleted
// exclusions = array of string file names to not delete
let removeDir = (targetPath, exclusions) => {

    if (fileSystem.existsSync(targetPath)) {

        /* Ensure that files from exclusions array are not deleted */
        let filesToDelete = fileSystem.readdirSync(targetPath).filter((file) => {
                if(exclusions){
                    return !exclusions.includes(file) 
                    && (canDelete(file) || fileSystem.statSync(path.join(targetPath, file)).isDirectory())
                }else{
                    return file
                }
            }
        )

        /* Recursive Deletion of Folders and Containing Files */

        /* If there are still files in the target folder to delete */
        if (filesToDelete.length > 0) {

            /* If filename is a folder, then recursively run function on that folder, otherwise delete the file */
            filesToDelete.forEach( (filename) => {
                if (fileSystem.statSync(targetPath + "/" + filename).isDirectory()) {
                    removeDir(path.join(targetPath, filename), exclusions)
                } else {
                    fileSystem.unlinkSync(path.join(targetPath, filename))
                }
            })

            /* Delete the folder now that it contains no files */
            if(targetPath != process.cwd()){
                try{
                    if(folder_empty(targetPath)){
                        fileSystem.rmdirSync(targetPath)
                    }
                }
                catch(err){
                    console.log(err)
                }
            }

        } else {
            /* Delete the folder now that it contains no files */
            if(targetPath != process.cwd()){
                try{
                    if(folder_empty(targetPath)){
                        fileSystem.rmdirSync(targetPath)
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
        }
    }
}

module.exports = removeDir