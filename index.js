/* Imports */
let markdownpdf = require('markdown-pdf')
let fileSystem = require('fs')

/* Create an Array of Markdown Files to be Converted */
let markdownFiles = []
fileSystem.readdirSync(process.cwd() + '/markdowns/').forEach(file => {
    if(file.includes('.md')){
        markdownFiles.push(process.cwd() + '/markdowns/' + file)
    }
})
console.log('Files to be converted :')
console.log(markdownFiles)

/* Create a book with all markdown files */
let bookPath = process.cwd() + "/pdfs/book.pdf"
console.log('Creating a book...')
markdownpdf().concat.from(markdownFiles).to(bookPath, function () {
    console.log("Created a book at", bookPath)
})



/* Only exit when user presses a key */
console.log('Press any key to exit');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));