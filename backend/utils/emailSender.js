const nodemailer = require('nodemailer');

exports.sendResetEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Link',
    html: `<p>Click here to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
  });
};
