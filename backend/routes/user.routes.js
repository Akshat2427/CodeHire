const router = require('express').Router();

router.post('/register', require('../controllers/user.controller').userRegister);

router.post('/login', require('../controllers/user.controller').userLogin);

module.exports = router;