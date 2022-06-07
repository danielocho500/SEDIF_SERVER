var bcrypt = require('bcryptjs');

const encrypt = (pass) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(text, salt);
    return hash;
}

const checkPassword = (pass,hash) => {
    return bcrypt.compareSync(pass, hash); 
}

module.exports = {
    encrypt,
    checkPassword
}