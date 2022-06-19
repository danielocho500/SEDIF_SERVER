const {Router} = require('express');
const { check } = require('express-validator');
const { getArchivo } = require('../controllers/archivos');
const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validarjwt');

const router = Router();

router.get('/:idArchivo', [
    validarJWT,
    check('idArchivo',"El id del archivo debe ser un número").isNumeric(),
    validarCampos
], getArchivo)

module.exports = router