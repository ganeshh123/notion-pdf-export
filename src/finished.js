/* Determines if System is Mac or Windows */
let isMac = process.platform === 'darwin'

let finished = () => {
    if(isMac){
        console.log('\nClose this Window to Exit')
        console.log('-------------------------------\n\n')
        process.exit.bind(process, 0)
    }else{
        console.log('\nPress any key to exit')
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.on('data', process.exit.bind(process, 0))
    }
}

module.exports = finished