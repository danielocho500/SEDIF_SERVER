const { generarJWT } = require("../helpers/jwt")

const login = async (req, res) => {
    const {email, password} = req.body

    if(email != 'correo@correo.com' || password != '123456')
    {
        return res.status(401).json({
            ok: false,
            msg: "Credenciales incorrectas"
        })
    }

    const uid = 1 
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login
}