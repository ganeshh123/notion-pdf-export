/* Determines if System is Mac or Windows */
let isMac = process.platform === 'darwin'

let finished = () => {
    if(isMac){
        console.log('\nCompleted. PDFs can be found in the pdfs folder!')
        console.log('\nClose this Window to Exit')
        process.exit.bind(process, 0)
    }else{
        console.log('\n Completed. PDFs can be found in the pdfs folder!')
        console.log('\nPress any key to exit')
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.on('data', process.exit.bind(process, 0))
    }
}

module.exports = finished