const {Router} = require('express');
const { check } = require('express-validator');

const { tramitePost, tramiteCambios, tramiteIncripcionPost, getTramiteWithToken} = require('../controllers/tramites');

const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();


router.post('/', [
    validarJWT,
    validarCampos
],tramitePost);

router.post('/solicitudCambios', [
    validarJWT,
    validarCampos
], tramiteCambios);

router.post('/solicitudInscripcion', [
    validarJWT,
    validarCampos
], tramiteIncripcionPost)

router.get('/', [
    validarJWT,
    validarCampos
], getTramiteWithToken)

module.exports = router;