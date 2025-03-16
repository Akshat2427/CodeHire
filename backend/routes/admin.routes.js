const router = require('express').Router();
const adminAuth = require('../middlewares/admin.middleware');
const adminController = require('../controllers/admin.controller'); 

router.post('/dashboard', adminAuth, adminController.dashboard); 

router.post('/add-course', adminAuth, adminController.addCourse);

module.exports = router;
