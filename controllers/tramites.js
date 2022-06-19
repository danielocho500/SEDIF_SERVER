const { getUserBasicData } = require("../Database/usuariosDB")
const { getUidByToken } = require("../helpers/jwt")
const uniqid =  require('uniqid');
const fileTypes = require('../types/files');
const path = require('path')
const { crearPathFiles } = require("../helpers/crearPathFile");
const { registrarTramiteNormal } = require("../Database/registrarTramiteNormal");
const { registrarArchivoDeTramite } = require("../Database/registrarArchivo");
const { existeTramite } = require("../Database/existeTramite");
const { formatoAlta, formatoMovilidad } = require("../types/files");
const { registrarTramiteCambios } = require("../Database/registrarTramiteCambios");
const { registrarTramiteInsc } = require("../Database/registrarTramiteInscripcion");
const { getTramiteEstudiante } = require("../Database/obtenerTramiteEstudiante");

const tramitePost = async (req, res) => {

	const files = [{
		nombre:'horarioClases',
		tipo: fileTypes.horarioFirmado
	},
	{
		nombre:'evaluacionDocente',
		tipo: fileTypes.docEval
	},
	{
		nombre:'comprobantePago',
		tipo: fileTypes.voucher
	}]

	const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol

	if(rolUser != 0)
		return res.status(401).json({
			ok: false,
			msg: 'No tienes permiso para realizar esta operación'
		})

	const existe = await existeTramite(uid)

	if(existe)
		return res.status(400).json({
			ok: false,
			msg: 'Ya existe un tramite en el periodo actual'
		})

	const resultTramite = await registrarTramiteNormal(uid);

	if(!resultTramite)
		return res.status(500)({
			ok: false,
			msg: 'Error en el sistema'
		})

	crearPathFiles(uid)

	let archivosInfo = []

	for(let i = 0; i < files.length ; i++){
		const dbPath = `files/documents/${uid}/${uniqid()}.pdf`
		const idArchivo = await registrarArchivoDeTramite(resultTramite,dbPath, files[i].tipo);

		archivosInfo.push({
			idArchivo,
			tipo: files[i].tipo,
			dbPath
		})
	}

	return res.json({
		ok: true,
		msg: 'Archivos subidos al sistema',
		files: archivosInfo
	})
}


const tramiteCambios = async (req, res) => {

	const {formatoAlta = null, formatoBaja = null,formatoMovilidad = null} = req.body

	const files =  []

	if(formatoAlta)
		files.push({
			nombre:'formatoAlta',
			tipo: fileTypes.formatoAlta
		})
	
	if(formatoBaja)
		files.push({
			nombre:'formatoBaja',
			tipo: fileTypes.formatoBaja
		})
	
	if(formatoMovilidad)
	files.push({
		nombre:'formatoMovilidad',
		tipo: fileTypes.formatoMovilidad
	})
	

	const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol

	if(rolUser != 0)
		return res.status(401).json({
			ok: false,
			msg: 'No tienes permiso para realizar esta operación'
		})

	const existe = await existeTramite(uid)

	if(existe)
		return res.status(400).json({
			ok: false,
			msg: 'Ya existe un tramite en el periodo actual'
		})

	
	if (files.length == 0) {
		return res.status(400).send({
			ok: false,
			msg:'se tiene que mandar por lo menos formatoAlta, formatoBaja o formatoMovilidad'
		});
	}

	const resultTramite = await registrarTramiteCambios(uid)

	if(!resultTramite)
		return res.status(500)({
			ok: false,
			msg: 'Error en el sistema'
		})

	crearPathFiles(uid)

	let archivosInfo = []

	for(let i = 0; i < files.length ; i++){
		const dbPath = `files/documents/${uid}/${uniqid()}.pdf`
		const idArchivo = await registrarArchivoDeTramite(resultTramite,dbPath, files[i].tipo);

		archivosInfo.push({
			idArchivo,
			tipo: files[i].tipo,
			dbPath
		})
	}

	return res.json({
		ok: true,
		msg: 'Archivos subidos al sistema',
		files: archivosInfo
	})
}

const tramiteIncripcionPost = async (req, res) => {

	const files = [{
		nombre:'solicitudInscripcion',
		tipo: fileTypes.docEval
	}]

	const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol

	if(rolUser != 0)
		return res.status(401).json({
			ok: false,
			msg: 'No tienes permiso para realizar esta operación'
		})

	const existe = await existeTramite(uid)

	if(existe)
		return res.status(400).json({
			ok: false,
			msg: 'Ya existe un tramite en el periodo actual'
		})

	const resultTramite = await registrarTramiteInsc(uid)

	if(!resultTramite)
		return res.status(500)({
			ok: false,
			msg: 'Error en el sistema'
		})

	crearPathFiles(uid)

	let archivosInfo = []

	for(let i = 0; i < files.length ; i++){
		const dbPath = `files/documents/${uid}/${uniqid()}.pdf`
		const idArchivo = await registrarArchivoDeTramite(resultTramite,dbPath, files[i].tipo);

		archivosInfo.push({
			idArchivo,
			tipo: files[i].tipo,
			dbPath
		})
	}

	return res.json({
		ok: true,
		msg: 'Archivos subidos al sistema',
		files: archivosInfo
	})
}

const getTramiteWithToken = async (req, res) => {
	const uid = getUidByToken(req.header('x-token'));
	const userData = await getUserBasicData(uid);

	const rolUser = userData.recordset[0].rol

	if(rolUser != 0)
		return res.status(401).json({
			ok: false,
			msg: 'No tienes permiso para realizar esta operación'
		})

	const tramiteInfo = await getTramiteEstudiante(uid)

	res.json({
		ok: true,
		...tramiteInfo
	})

}

module.exports = {
	tramitePost,
	tramiteCambios,
	tramiteIncripcionPost,
	getTramiteWithToken
}