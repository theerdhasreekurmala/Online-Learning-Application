const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/authMiddleware');
const {
  getAvailableCourses,
  enrollInCourse,
  getEnrolledCourses,
} = require('../controllers/studentController');

router.use(auth, requireRole(['student']));

router.get('/courses', getAvailableCourses); // Browse all courses
router.post('/enroll/:courseId', enrollInCourse); // Enroll
router.get('/enrolled', getEnrolledCourses); // View enrolled

module.exports = router;
