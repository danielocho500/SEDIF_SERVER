const { obtenerTramiteSecretariaBD } = require("../Database/obtenerTramitesSecretaria");
const { getUserBasicData } = require("../Database/usuariosDB");
const { getUidByToken } = require("../helpers/jwt");

const getTramitesSecretaria = async (req, res) => {
    const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol

    if(rolUser != 1)
        return res.status(401).json({
            ok: false,
            msg: 'No tienes permiso para realizar esta operación'
        })

    const tramites = await obtenerTramiteSecretariaBD(uid, 1)   

    res.json({
        ok: true,
        cantidad: tramites.length,
        tramites
    })
}

module.exports = {
    getTramitesSecretaria
}