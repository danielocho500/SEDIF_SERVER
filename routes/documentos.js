const {Router} = require('express');
const { check } = require('express-validator');
const { getDocumentsTramite } = require('../controllers/documentos');

const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();

router.get('/:idTramite', [
    validarJWT,
    check('idTramite',"El id del trámite debe ser un número").isNumeric(),
    validarCampos
], getDocumentsTramite)

module.exports = router;