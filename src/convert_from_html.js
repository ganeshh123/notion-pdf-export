let exec = require('child_process').execFileSync
let fileSystem = require('fs')
let path = require('path')
let createMissingFolders = require('./create_missing_folders')


let isMac = process.platform === 'darwin'


let wkhtmltopdf = path.join(process.cwd(), '/utils/wkhtmltopdf/wkhtmltopdf.exe')
if(isMac){
    wkhtmltopdf = path.join(process.cwd(), '/utils/wkhtmltopdf/wkhtmltopdf')
}

let convertFromHtml = (htmlFiles, nextStep) => {

    console.log('\n\nHTML Files to be converted :')
    console.log(htmlFiles)
    
    let pdfDocs = []
    let cwdLength = path.join(process.cwd()).length
    htmlFiles.forEach((htmlFile) => {
        let pdfFileName = htmlFile.replace('.html', '.pdf')
        pdfFileName = pdfFileName.substring(cwdLength)
        pdfFileName = path.join(process.cwd(), 'pdfs', pdfFileName)
        pdfDocs.push(pdfFileName)
    })
    console.log('PDF Docs')
    console.log(pdfDocs)
    
    console.log('\nConverting HTML Files to PDF')
    htmlFiles.forEach((htmlFile, index) => {
        let htmlFilePath = path.join(htmlFile)
        console.log('\nConverting ' + htmlFile)
        createMissingFolders(pdfDocs[index])
        let conversionOutput
        try{
            conversionOutput = exec(wkhtmltopdf, ['--enable-local-file-access', htmlFilePath, pdfDocs[index]])
        }catch (exception){
            console.log('Error with converting ' + htmlFile)
        }
    })

    nextStep()
}

module.exports = convertFromHtml