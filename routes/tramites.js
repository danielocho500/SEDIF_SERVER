const {Router} = require('express');
const { check } = require('express-validator');

const { tramitePost, tramiteCambios, tramiteIncripcionPost } = require('../controllers/tramites');

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

module.exports = router;