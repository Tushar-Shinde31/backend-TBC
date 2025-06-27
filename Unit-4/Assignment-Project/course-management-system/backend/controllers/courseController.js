// Import the Course model
const Course = require("../models/Course");

// Controller to create a new course
exports.addCourse = async (req, res) => {
  try {
    // Create a new course document from request body
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to get all courses (supports filter, search, sort, pagination)
exports.getCourses = async (req, res) => {
  // Extract query parameters for filtering, searching, sorting, and pagination
  const { instructor, category, search, sort = "-createdAt", page = 1, limit = 5 } = req.query;

  // Build the MongoDB query object
  const query = {};
  if (instructor) query.instructor = instructor;
  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  try {
    // Find courses matching the query, apply sorting and pagination
    const courses = await Course.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get a single course by its ID
exports.getCourseById = async (req, res) => {
  try {
    // Find course by MongoDB _id
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to update a course by its ID
exports.updateCourse = async (req, res) => {
  try {
    // Find course by ID and update with new data
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to delete a course by its ID
exports.deleteCourse = async (req, res) => {
  try {
    // Find course by ID and delete
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to aggregate and count courses by category
exports.countByCategory = async (req, res) => {
  try {
    // Use MongoDB aggregation to group by category and count
    const result = await Course.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
