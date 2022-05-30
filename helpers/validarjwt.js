const jwt = require('jsonwebtoken')


const validarJWT = async (req, res, next) => {
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en el header"
        })
    }

    try{
        const {uid} = jwt.verify(token, 'key')

        next()
    }

    catch(err){
        res.status(401).json({
            ok: false,
            msg: "Token no válido"
        })
    }
}

module.exports = {
    validarJWT
}