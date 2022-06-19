const { documentosTramite } = require("../Database/obtenerDocumentosTramite");
const { getUserBasicData } = require("../Database/usuariosDB");
const { getUidByToken } = require("../helpers/jwt");


const getDocumentsTramite = async (req, res) => {
    const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

    const idTramite = parseInt(req.params.idTramite)

	const rolUser = userData.recordset[0].rol

    if(rolUser != 1)
		return res.status(401).json({
			ok: false,
			msg: 'No tienes permiso para realizar esta operación'
		})
    
    if(typeof idTramite !== 'number' || !idTramite)
        return res.status(401).json({
            ok: false,
            msg: 'el id debe ser un entero'
        })

    const documentos = await documentosTramite(idTramite)

    res.json({
        ...documentos
    })
}

module.exports = {
    getDocumentsTramite
}