const { validarCampos } = require('../helpers/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../helpers/validarjwt');
const { postEvaluacion } = require('../controllers/evaluacion');
const { Router } = require('express');

const router = Router();

router.post('/:idTramite',[
    validarJWT,
    check('idTramite',"El id del trámite debe ser un número").isNumeric(),
    check('valido',"El status debe ser un booleano").isBoolean(),
    check('observaciones',"Debe contener observa").exists(),
    validarCampos
], postEvaluacion)

module.exports = router;