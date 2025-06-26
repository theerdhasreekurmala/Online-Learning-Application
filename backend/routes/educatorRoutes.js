const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/authMiddleware');
//const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const {
  createCourse,
  getMyCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/educatorController');

router.use(auth, requireRole(['educator', 'admin']));

router.post('/create', createCourse); // Create course
router.get('/courses', getMyCourses);  // View educator's courses
router.put('/update/courses/:id', updateCourse); // Edit course
router.delete('/delete/courses/:id', deleteCourse); // Delete course

module.exports = router;
