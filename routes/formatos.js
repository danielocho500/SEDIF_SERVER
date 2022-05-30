const {Router} = require('express')
const {formatosGet} = require('../controllers/formatos');

const router = Router();

router.get('/', formatosGet);

module.exports = router;