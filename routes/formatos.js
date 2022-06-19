const {Router} = require('express')
const { check } = require('express-validator');
const {formatosGet, formatoGet} = require('../controllers/formatos');
const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],formatosGet);

router.get('/:idFormato',[
    validarJWT,
    check('idFormato', 'debes incluir la id del Formato').isNumeric(),
    validarCampos
],formatoGet)

module.exports = router;