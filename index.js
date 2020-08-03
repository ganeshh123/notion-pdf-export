/* Imports */
let markdownpdf = require(process.cwd() + '/markdown-pdf/index' )
let fileSystem = require('fs')
let path = require('path')


 /* Removes Original Markdown Files and Folders from directory */
 let removeDir = (path) => {
    if (fileSystem.existsSync(path)) {
      /*Delete Markdown Folders with assets */
        let files = fileSystem.readdirSync(path).filter((file) => {
            return file != 'node_modules'
                && file != 'markdown-pdf'
                && file != 'pdfs'
                && file != '.git'
                && file != 'package.json'
                && file != 'package-lock.json'
                && file != '.gitignore'
                && file != 'index.js'
                && file != 'LICENSE'
                && file != 'README.md'
                && !file.includes('.exe')

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
        if(path != process.cwd()){
            try{
                fileSystem.rmdirSync(path)
            }
            catch(err){
                console.log('Folders Deleted')
            }
        }
      } else {
        if(path != process.cwd()){
            try{
                fileSystem.rmdirSync(path)
            }
            catch(err){
                console.log('Folders Deleted')
            }
        }
      }
    }
  }



/* Create an Array of Markdown Files to be Converted */
let markdownFiles = []
console.log('Directory being checked is ')
console.log(__dirname)
fileSystem.readdirSync(process.cwd()).forEach(file => {
    console.log(file)
    if(file.includes('.md')){
        markdownFiles.push(file)
    }
})
console.log('Files to be converted :')
console.log(markdownFiles)

/* Create a book with all markdown files */
let bookPath = process.cwd() + "/pdfs/book.pdf"
console.log('Creating a book...')
markdownpdf({phantomPath: path.join(process.cwd(), 'phantomjs.exe')}).concat.from(markdownFiles).to(bookPath, function () {
    console.log("Created a book at", bookPath)

    /*Export Individual Documents as PDF */
    console.log('\nExporting Pages Individually')
    let pdfDocs = []
    fileSystem.readdirSync(process.cwd()).forEach(fileName => {
        if(fileName.includes('.md')){
            let pdfFileName = fileName.replace('.md', '.pdf')
            pdfDocs.push(path.join(process.cwd(), 'pdfs', 'pages', pdfFileName))
        }
    })
    markdownpdf({phantomPath: path.join(process.cwd(), 'phantomjs.exe')}).from(markdownFiles).to(pdfDocs, function () {
        pdfDocs.forEach(function (d) { console.log("Created", d) })

        /*Delete Original Markdown Files and Folders */
        console.log('Deleting Original Markdown Files...')
        removeDir(process.cwd())
        
        /* Only exit when user presses a key */
        console.log('Press any key to exit');

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
    })

})
