let markdownpdf = require(process.cwd() + '/utils/markdown-pdf/index' )
// Markdown PDF is bundled separately because there are issues running phantom with render.js when
// bundled as an executable with nexe
let fileSystem = require('fs')
let path = require('path')

/* Determines if System is Mac or Windows */
let isMac = process.platform === 'darwin'

let convertFromMarkdown = (markdownFiles, nextStep) => {

    /* Set name of phantom executable depending on OS */
    let phantomExecutable = '/utils/markdown-pdf/phantomjs.exe'
    if(isMac){
    phantomExecutable = '/utils/markdown-pdf/phantomjs'
    }

    console.log('Markdown Files to be converted :')
    console.log(markdownFiles)

    let pdfDocs = []
    fileSystem.readdirSync(process.cwd()).forEach(fileName => {
        if(fileName.includes('.md')){
            let pdfFileName = fileName.replace('.md', '.pdf')
            pdfDocs.push(path.join(process.cwd(), 'pdfs', pdfFileName))
        }
    })

    console.log('Converting Markdown Files to PDF')

    markdownpdf({phantomPath: path.join(process.cwd(), phantomExecutable)}).from(markdownFiles).to(pdfDocs, () => {
        pdfDocs.forEach((pdfDoc) => { console.log("Created", pdfDoc) })
        
        nextStep()
    })

}

module.exports = convertFromMarkdown