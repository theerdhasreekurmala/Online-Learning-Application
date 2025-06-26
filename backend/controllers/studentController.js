const Course = require('../schemas/courseModel');
const EnrolledCourse = require('../schemas/enrolledCourseModel');

// Browse all available courses
exports.getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;

  try {
    const alreadyEnrolled = await EnrolledCourse.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    const enrollment = new EnrolledCourse({ userId, courseId });
    await enrollment.save();
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
};

// View enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const enrolled = await EnrolledCourse.find({ userId: req.user.id }).populate('courseId');
    res.json(enrolled.map(e => e.courseId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
};
