const mongoose = require('mongoose');

const coursePaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  amount: Number,
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CoursePayment', coursePaymentSchema);
