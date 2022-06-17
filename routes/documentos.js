const {Router} = require('express');
const { getDocumentsTramite } = require('../controllers/documentos');

const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();

router.get('/:idTramite', [
    validarJWT,
    validarCampos
], getDocumentsTramite)

module.exports = router;