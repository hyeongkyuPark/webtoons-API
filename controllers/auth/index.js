const {Router} = require('express');
const router = Router();
const ctrl = require("./auth.ctrl");

router.get('/', ctrl.authTest);

module.exports = router;