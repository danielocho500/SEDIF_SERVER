const fs = require('fs');
const path = require('path')

const crearPathFiles = uid => {
    if(!fs.existsSync(path.join(__dirname, `../../files/`))){
        fs.mkdirSync(path.join(__dirname, `../../files/`))
}
    
    if(!fs.existsSync(path.join(__dirname, `../../files/documents`)))
        fs.mkdirSync(path.join(__dirname, `../../files/documents`))
    
    if(!fs.existsSync(path.join(__dirname, `../../files/documents/${uid}`)))
        fs.mkdirSync(path.join(__dirname, `../../files/documents/${uid}`))
    
}

module.exports = {
    crearPathFiles
}