const router = require('express').Router();
const {body} = require('express-validator');
const auth = require('../middlewares/user.middleware');

router.post('/register',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], require('../controllers/user.controller').userRegister);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], require('../controllers/user.controller').userLogin);

router.get('/profile',auth.authUser,require('../controllers/user.controller').userProfile);


router.get('/logout',auth.authUser,require('../controllers/user.controller').userLogout);
module.exports = router;