let fileSystem = require('fs')
//Returns true if folder at path is empty, false otherwise
module.exports = (path) =>  {
    return fileSystem.readdirSync(path).length === 0;
}