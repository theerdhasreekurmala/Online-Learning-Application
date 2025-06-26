const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/authMiddleware');
//const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const {
  getAllUsers,
  getAllCourses,
  deleteUser,
  deleteCourse,
} = require('../controllers/adminController');

//  router.use(auth, requireRole(['admin']));
//  router.get('/users',getAllUsers);
router.get('/users', auth, requireRole(['admin']), getAllUsers);
//router.get('/users', authenticateToken, isAdmin, getAllUsers);

router.get('/courses', getAllCourses);
router.delete('/delete/users/:id', deleteUser);
router.delete('/delete/courses/:id', deleteCourse);

module.exports = router;
