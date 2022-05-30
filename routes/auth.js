const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../helpers/validar-campos');

const router = Router()

router.post('/',[
    check('email', 'Debe incluir un email válido').isEmail().notEmpty(),
    check('password', 'debe incluir un campo password').notEmpty(),
    validarCampos
],login);

module.exports = router;