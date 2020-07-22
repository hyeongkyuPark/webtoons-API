const {Router} = require('express');
const router = Router();
const ctrl = require("./today.ctrl");

router.get('/', (request, response) => {
    response.send('todayAPI');
});

router.get('/toon', ctrl.getTodayToon);

module.exports = router;