const express = require('express');
const {
  registerUser,
  loginUser,
  updateProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
} = require('../controllers/userControllers');

const { auth } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/profile', auth, updateProfile);

// Password Recovery
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Image Upload Route
router.put('/profile/image', auth, upload.single('image'), uploadProfileImage);

// Token Refresh
// router.get('/refresh', refreshToken);

module.exports = router;
