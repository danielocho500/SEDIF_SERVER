const { actualizarEval } = require("../Database/actualizarEval");
const { existeTramite } = require("../Database/existeTramite");
const { obtenerArchivos } = require("../Database/obtenerArchivos");
const { obtenerStatus } = require("../Database/obtenerStatusTramite");
const { getUserBasicData } = require("../Database/usuariosDB");
const { crearPathFiles } = require("../helpers/crearPathFile");
const { getUidByToken } = require("../helpers/jwt");
const fileTypes = require("../types/files");

const actualizarTramite = async (req, res) => {
    console.log('wenass')
    const {idTramite} = req.params
    const {valido, observaciones} = req.body

	const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol

	if(rolUser != 0)
		return res.status(401).json({
			ok: false,
			msg: 'No tienes permiso para realizar esta operación'
		})

	const existe = await existeTramite(uid)

	if(!existe)
		return res.status(400).json({
			ok: false,
			msg: 'No existe un tramite en el periodo actual'
		})

    const statusTramite = await obtenerStatus(idTramite);


    if(statusTramite != 2 && statusTramite != -1){
        return res.json({
            ok: false,
            msg: 'Status invalido'
        })
    }

	if(statusTramite == -1){
		return res.json({
			ok: false,
			msg: 'error en la base'
		})
	}

    if(valido){
        actualizarEval(idTramite,3,observaciones)
    }
    else{
        actualizarEval(idTramite,2,observaciones)
    }

    crearPathFiles(uid)

    const archivos = await obtenerArchivos(idTramite)
	if(archivos){
		return res.json({
			ok: true,
			archivos
		})
	}
	else{
		return res.status(500).json({
			ok: false
		})
	}
}

module.exports = {
    actualizarTramite
}