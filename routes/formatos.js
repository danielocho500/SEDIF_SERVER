const {Router} = require('express')
const {formatosGet} = require('../controllers/formatos');
const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],formatosGet);

module.exports = router;