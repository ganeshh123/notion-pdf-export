/* Imports */
let markdownpdf = require('markdown-pdf')
let fileSystem = require('fs')
let path = require('path')

/*Function to remove markdown files after conversion */
let deleteFiles = (filesToDelete, callback) => {
    if (filesToDelete.length==0) callback();
    else {
       var f = filesToDelete.pop();
       fileSystem.unlink(f, function(err){
          if (err) callback(err);
          else {
             console.log(f + ' deleted.');
             deleteFiles(filesToDelete, callback);
          }
       });
    }
 }


 const removeDir = function(path) {
    if (fileSystem.existsSync(path)) {
      /*Delete Markdown Folders with assets */
        let files = fileSystem.readdirSync(path).filter((file) => {
            return file != 'node_modules'
                && file != 'pdfs'
                && file != '.git'
                
        }
        )
        console.log(files)
  
      if (files.length > 0) {
        files.forEach(function(filename) {
          if (fileSystem.statSync(path + "/" + filename).isDirectory()) {
            removeDir(path + "/" + filename)
          } else {
            fileSystem.unlinkSync(path + "/" + filename)
          }
        })
        fileSystem.rmdirSync(path)
      } else {
        fileSystem.rmdirSync(path)
      }
    }
  }

/* Create an Array of Markdown Files to be Converted */
let markdownFiles = []
fileSystem.readdirSync(__dirname).forEach(file => {
    if(file.includes('.md')){
        markdownFiles.push(file)
    }
})
console.log('Files to be converted :')
console.log(markdownFiles)

/* Create a book with all markdown files */
let bookPath = process.cwd() + "/pdfs/book.pdf"
console.log('Creating a book...')
markdownpdf().concat.from(markdownFiles).to(bookPath, function () {
    console.log("Created a book at", bookPath)

    /*Export Individual Documents as PDF */
    console.log('Exporting Pages Individually')
    let pdfDocs = []
    fileSystem.readdirSync(__dirname).forEach(fileName => {
        if(fileName.includes('.md')){
            let pdfFileName = fileName.replace('.md', '.pdf')
            pdfDocs.push(path.join(process.cwd(), 'pdfs', 'pages', pdfFileName))
        }
    })
    markdownpdf().from(markdownFiles).to(pdfDocs, function () {
        pdfDocs.forEach(function (d) { console.log("Created", d) })


        /*Delete Original Markdown Files and Folders */
        console.log('Deleting Original Markdown Files')
        let filesToDelete = markdownFiles.slice()
        deleteFiles(filesToDelete, () => {

            
            removeDir(process.cwd())
        })


        
    })

})
