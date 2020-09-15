/* Local Imports */
let finished = require('./src/finished')
let readHtmlFiles = require('./src/read_html_files')
let convertFromHtml = require('./src/convert_from_html')
let deleteOriginalFiles = require('./src/delete_original_files')
let filesToKeep = require('./src/files_to_keep')
let createPdfsDirectory = require('./src/create_pdfs_directory')
let moveAssets = require('./src/move_assets')

let deleteAndFinish = () => {
  console.log('\nDeleting Files')
  deleteOriginalFiles(process.cwd(), filesToKeep)
  moveAssets(process.cwd())
  console.log('\nCompleted. PDFs can be found in the pdfs folder!')
  finished()
}

let htmlFiles = readHtmlFiles(process.cwd())

if(htmlFiles.length === 0){
    console.log('\nPlease add some HTML files to this folder')
    return finished()    
}

let convertHtml = () => {
  if(htmlFiles.length > 0){
    convertFromHtml(htmlFiles, deleteAndFinish)
  }else{
    deleteAndFinish()
  }
}

createPdfsDirectory(process.cwd())
convertHtml()


