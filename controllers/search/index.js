const {
    Router,
    response
} = require('express');
const {
    request
} = require('../../app');
const router = Router();
const ctrl = require("./search.ctrl");

router.get('/', (request, response) => {
    response.send('searchAPI');
});

router.get('/all', ctrl.search_all);

router.get('/title', ctrl.search_title);

router.get('/weekDay', ctrl.search_weekDay);

router.post('/one', ctrl.search_one);

module.exports = router;