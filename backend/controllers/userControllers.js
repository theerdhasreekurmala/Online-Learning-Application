const User = require('../schemas/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/emailSender');
const { generateAccessToken } = require('../utils/jwt');

// // Access Token Generator
// const generateAccessToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '15m' }
//   );
// };

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const validRoles = ['student', 'educator', 'admin'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  const token = generateAccessToken(user);
  res.status(201).json({ token, user: { name: user.name, email: user.email, role: user.role } });
};

// // Login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const accessToken = generateAccessToken(user);
//   res.json({
//     token: accessToken,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     }
//   });
// };


// Login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateAccessToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


// Logout
exports.logoutUser = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  const updatedUser = await user.save();
  res.json({
    message: 'Profile updated',
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    }
  });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpire = Date.now() + 10 * 60 * 1000;

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = resetExpire;
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
  await sendResetEmail(email, resetLink);

  res.json({ message: 'Reset link sent to email' });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.json({ message: 'Password has been reset successfully' });
};

// Upload Profile Image
exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    user.imageUrl = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: user.imageUrl
    });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
