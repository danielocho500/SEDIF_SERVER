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

	let files = []

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send({
			ok: false,
			msg:'No files were uploaded.'
		});
	}

	if(!req.files.horarioClases || req.files.horarioClases.mimetype != 'application/pdf')
		return res.status(400).send({
			ok: false,
			msg: 'Falta el horario de clases o no esta en formato PDF'
		})

	files.push({
		name: `${uniqid()}.pdf`,
		type: fileTypes.horarioFirmado,
		ref: req.files.horarioClases
	})

	if(!req.files.evaluacionDocente || req.files.evaluacionDocente.mimetype != 'application/pdf')
		return res.status(400).send({
			ok: false,
			msg: 'Falta la evaluación docente o no esta en formato PDF'
		})

	files.push({
		name: `${uniqid()}.pdf`,
		type: fileTypes.docEval,
		ref: req.files.evaluacionDocente
	})

	if(!req.files.comprobantePago || req.files.comprobantePago.mimetype != 'application/pdf')
		return res.status(400).send({
			ok: false,
			msg: 'Falta el comprobante de pago o no esta en formato PDF'
		})

	files.push({
		name: `${uniqid()}.pdf`,
		type: fileTypes.voucher,
		ref: req.files.comprobantePago
	})

	const resultTramite = await registrarTramiteNormal(uid);

	if(!resultTramite)
		return res.status(500)({
			ok: false,
			msg: 'Error en el sistema'
		})


	files.forEach(async (file) => {
		const {ref} = file;
		const uploadPath = path.join(__dirname, `../../files/documents/${uid}`,file.name);
		const dbPath = `files/documents/${uid}/${file.name}`

		crearPathFiles(uid)

		const resultFile = await registrarArchivoDeTramite(resultTramite,dbPath, file.type);

		console.log(resultFile)

		ref.mv(uploadPath, function(err) {
			if(err)
			try{
				console.log(err)
				return res.status(500).json({
					ok: false,
					msg: 'Error en el servidor'
				})
			}
			catch{}	
		})
	})

	return res.json({
		ok: true,
		msg: 'Archivos subidos al sistema'
	})
}

const tramiteCambios = async (req, res) => {

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

	
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send({
			ok: false,
			msg:'No se mandaron archivos en la petición.'
		});
	}

	console.log(req.files.formatoAlta)

	if((!req.files.formatoAlta || req.files.formatoAlta.mimetype != 'application/pdf') && (!req.files.formatoBaja || req.files.formatoBaja.mimetype != 'application/pdf') && (!req.files.formatoMovilidad || req.files.formatoMovilidad.mimetype && 'application/pdf'))
		return res.status(400).send({
			ok: false,
			msg: 'se tiene que mandar por lo menos formatoAlta, formatoBaja o formatoMovilidad'
		})

	let files = []

	if(req.files.formatoAlta &&  req.files.formatoAlta.mimetype == 'application/pdf')
		files.push({
			name: `${uniqid()}.pdf`,
			type: fileTypes.formatoAlta,
			ref: req.files.formatoAlta
		})

	if(req.files.formatoBaja &&  req.files.formatoBaja.mimetype == 'application/pdf')
		files.push({
			name: `${uniqid()}.pdf`,
			type: fileTypes.formatoBaja,
			ref: req.files.formatoBaja
		})

	if(req.files.formatoMovilidad &&  req.files.formatoMovilidad.mimetype == 'application/pdf')
		files.push({
			name: `${uniqid()}.pdf`,
			type: fileTypes.formatoMovilidad,
			ref: req.files.formatoMovilidad
		})	

	const resultTramite = await registrarTramiteCambios(uid)

	if(!resultTramite)
		return res.status(500)({
			ok: false,
			msg: 'Error en el sistema'
		})


	files.forEach(async (file) => {
		const {ref} = file;
		const uploadPath = path.join(__dirname, `../../files/documents/${uid}`,file.name);
		const dbPath = `files/documents/${uid}/${file.name}`

		crearPathFiles(uid)

		await registrarArchivoDeTramite(resultTramite,dbPath, file.type);

		ref.mv(uploadPath, function(err) {
			if(err)
			try{
				console.log(err)
				return res.status(500).json({
					ok: false,
					msg: 'Error en el servidor'
				})
			}
			catch{}	
		})
	})

	return res.json({
		ok: true,
		msg: 'Archivos subidos al sistema'
	})
}

const tramiteIncripcionPost = async (req, res) => {

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

	let files = []

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send({
			ok: false,
			msg:'No se subieron archivos.'
		});
	}

	if(!req.files.horarioInscripcion || req.files.horarioInscripcion.mimetype != 'application/pdf')
		return res.status(400).send({
			ok: false,
			msg: 'Falta el horario de clases de la inscripción o no esta en formato PDF'
		})

	files.push({
		name: `${uniqid()}.pdf`,
		type: fileTypes.horarioInscripcion,
		ref: req.files.horarioInscripcion
	})

	if(!req.files.solicitudInscripcion || req.files.solicitudInscripcion.mimetype != 'application/pdf')
		return res.status(400).send({
			ok: false,
			msg: 'Falta la solicitud de inscripción o no esta en formato PDF'
		})

	files.push({
		name: `${uniqid()}.pdf`,
		type: fileTypes.solicitudIns,
		ref: req.files.solicitudInscripcion
	})

	//dasdas
	const resultTramite = await registrarTramiteInsc(uid)

	if(!resultTramite)
		return res.status(500)({
			ok: false,
			msg: 'Error en el sistema'
		})


	files.forEach(async (file) => {
		const {ref} = file;
		const uploadPath = path.join(__dirname, `../../files/documents/${uid}`,file.name);
		const dbPath = `files/documents/${uid}/${file.name}`

		crearPathFiles(uid)

		await registrarArchivoDeTramite(resultTramite,dbPath, file.type);

		ref.mv(uploadPath, function(err) {
			if(err)
			try{
				console.log(err)
				return res.status(500).json({
					ok: false,
					msg: 'Error en el servidor'
				})
			}
			catch{}	
		})
	})

	return res.json({
		ok: true,
		msg: 'Archivos subidos al sistema'
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