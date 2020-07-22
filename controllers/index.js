const {Router} = require('express');
const router = Router();

router.use('/search', require('./search'));
router.use('/today', require('./today'));
router.use('/toon', require('./toon'))

module.exports = router;