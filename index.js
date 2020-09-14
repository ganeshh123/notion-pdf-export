/* Determines if System is Mac or Windows */
let isMac = process.platform === 'darwin'
/* Local Imports */
let finished = require('./src/finished')
let readMarkdownFiles = require('./src/read_markdown_files')
let convertFromMarkdown = require('./src/convert_from_markdown')
let deleteOriginalFiles = require('./src/delete_original_files')
let filesToKeep = require('./src/files_to_keep')

let deleteAndFinish = () => {
  console.log('\nDeleting Files')
  deleteOriginalFiles(process.cwd(), filesToKeep)
  finished()
}

let markdownFiles = readMarkdownFiles(process.cwd())
if(markdownFiles.length === 0){
    /* Only exit when user presses a key */
    console.log('\nPlease add some markdown files to this folder')
    
    finished()    
}

if(markdownFiles.length > 0){
  convertFromMarkdown(markdownFiles, deleteAndFinish)
}
