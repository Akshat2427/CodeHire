const router = require('express').Router();
const adminAuth = require('../middlewares/admin.middleware');
const adminController = require('../controllers/admin.controller'); 

router.get('/dashboard', adminAuth, adminController.dashboard); 

router.post('/add-course',adminAuth, adminController.addCourse);

router.get('/courses', adminController.userCourses);

module.exports = router;
