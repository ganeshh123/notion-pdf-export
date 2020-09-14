let exec = require('child_process').execFileSync
let fileSystem = require('fs')
let path = require('path')


let isMac = process.platform === 'darwin'


let wkhtmltopdf = path.join(process.cwd(), '/utils/wkhtmltopdf/wkhtmltopdf.exe')

let convertFromHtml = (htmlFiles, nextStep) => {

    console.log('\n\nHTML Files to be converted :')
    console.log(htmlFiles)
    
    let pdfDocs = []
    fileSystem.readdirSync(process.cwd()).forEach(fileName => {
        if(fileName.includes('.html')){
            let pdfFileName = fileName.replace('.html', '.pdf')
            pdfDocs.push(path.join(process.cwd(), 'pdfs', pdfFileName))
        }
    })
    
    console.log('\nConverting HTML Files to PDF')
    htmlFiles.forEach((htmlFile, index) => {
        let htmlFilePath = path.join(process.cwd(), htmlFile)
        console.log('\nConverting ' + htmlFile)
        exec(wkhtmltopdf, ['--enable-local-file-access', htmlFilePath, pdfDocs[index]])
    })

    nextStep()
}

module.exports = convertFromHtml