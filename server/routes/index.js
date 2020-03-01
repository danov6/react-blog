const router = require('express').Router();

router.use('/', require('./auth'));
router.use('/', require('./articles'));
router.use('/', require('./users'));

module.exports = router;