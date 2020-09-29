let extensionsToDelete = [
    'png',
    'html',
    'jpg',
    'jpeg',
]

let canDelete = (file) => {

    let fileExtension = file.split('.')[file.split('.').length - 1]

    if(extensionsToDelete.includes(fileExtension)){
        return true
    }else{
        return false
    }
}

module.exports = canDelete