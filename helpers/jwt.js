var jwt = require('jsonwebtoken');
require('dotenv').config()

const generarJWT = (uid) => {
    return new Promise((resolve, reject) =>{
        const payload = {uid}
        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn: '2h'
        },(error, token) => {
            if(error){
                console.log(error)
                reject("No se pudo generar el token")
            }
            else{
                resolve(token)
            }
        })
    })
}

const getUidByToken = (token) => {
    return jwt.decode(token).uid
}


module.exports = {
    generarJWT,
    getUidByToken
}