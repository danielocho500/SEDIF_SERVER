const { obtenerDocumentos } = require("../Database/obtenerDocumentos");
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

    const tramites = await obtenerTramiteSecretariaBD(uid, 0)   

    res.json({
        ok: true,
        cantidad: tramites.length,
        tramites
    })
}

const getInfoTramite = async (req, res) => {
    const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol
    const {idTramite} = req.params;

    if(rolUser != 1)
        return res.status(401).json({
            ok: false,
            msg: 'No tienes permiso para realizar esta operación'
        })

    const docs = await obtenerDocumentos(idTramite);

    const {err, documents} = docs

    console.log(documents)

    if(err)
        return res.status(500).json({
            ok: false,
        })
    
    else{
        return res.json({
            ok: true,
            length: documents.length,
            documents
        })
    }
}

module.exports = {
    getTramitesSecretaria,
    getInfoTramite
}