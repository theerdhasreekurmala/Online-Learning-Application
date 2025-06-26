const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['student', 'educator', 'admin'],
    default: 'student'
  },
  imageUrl: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
