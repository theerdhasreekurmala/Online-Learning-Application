const Course = require('../schemas/courseModel');

// Educator creates a course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instructor: req.user.id
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

// Get educator's own courses
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user.id },
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found or unauthorized' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user.id
    });
    if (!course) return res.status(404).json({ message: 'Course not found or unauthorized' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
