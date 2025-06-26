// ✅ utils/jwt.js (Optional: Token utility for cleaner code)
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

module.exports = { generateAccessToken };
