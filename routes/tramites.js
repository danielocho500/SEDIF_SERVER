const {Router} = require('express');
const { check } = require('express-validator');

const { tramitePost, tramiteCambios, tramiteIncripcionPost, getTramiteWithToken} = require('../controllers/tramites');
const { actualizarTramite } = require('../controllers/tramitesActualizar');
const { getTramitesSecretaria, getInfoTramite } = require('../controllers/tramitesSecretaria');

const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();

router.post('/', [
    validarJWT,
    validarCampos
],tramitePost);

router.put('/:idTramite', [
    validarJWT,
    check('idTramite','el Trámite debe ser un numero').isNumeric(),
    validarCampos
], actualizarTramite)

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

router.get('/secretaria', [
    validarJWT,
    validarCampos
], getTramitesSecretaria)

router.get('/documentos/:idTramite', [
    validarJWT,
    check('idTramite','el Trámite debe ser un numero').isNumeric(),
    validarCampos
], getInfoTramite)


module.exports = router;