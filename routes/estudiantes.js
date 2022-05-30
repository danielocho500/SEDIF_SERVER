const {Router} = require('express')
const {estudiantesGet} = require('../controllers/estudiantes');
const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router()

router.get('/', [
    validarJWT,
    validarCampos
], 
estudiantesGet);

module.exports = router;