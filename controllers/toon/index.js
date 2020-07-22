const {Router} = require('express');
const router = Router();
const ctrl = require("./toon.ctrl");

router.get('/', (request, response) => {
    response.send('daumAPI');
});

router.get('/daum', ctrl.getDaumToon);
router.get('/naver', ctrl.getNaverToon);

module.exports = router;