const { authUserGetUID } = require("../Database/authDB")
const { getUserBasicData } = require("../Database/usuariosDB")
const { generarJWT } = require("../helpers/jwt")

const login = async (req, res) => {
    const {email, password} = req.body
    
    const authResult = await authUserGetUID(email, password)

    if(!authResult)
    {
        return res.status(401).json({
            ok: false,
            msg: "Credenciales incorrectas"
        })
    }

    const token = await generarJWT(authResult);
    const userData = await getUserBasicData(authResult)

    res.json({
        ok: true,
        token,
        userInfo: userData.recordset[0]
    })
}

module.exports = {
    login
}