/* Local Imports */
let finished = require('./src/finished')
let readMarkdownFiles = require('./src/read_markdown_files')
let convertFromMarkdown = require('./src/convert_from_markdown')
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

let markdownFiles = readMarkdownFiles(process.cwd())
let htmlFiles = readHtmlFiles(process.cwd())

if(markdownFiles.length === 0 && htmlFiles.length === 0){
    console.log('\nPlease add some HTML or Markdown files to this folder')
    return finished()    
}

let convertMarkdown = (nextStep) => {
  if(markdownFiles.length > 0){
    convertFromMarkdown(markdownFiles, nextStep)
  }else{
    nextStep()
  }
}

let convertHtml = () => {
  if(htmlFiles.length > 0){
    convertFromHtml(htmlFiles, deleteAndFinish)
  }else{
    deleteAndFinish()
  }
}

createPdfsDirectory(process.cwd())
convertMarkdown(convertHtml)


