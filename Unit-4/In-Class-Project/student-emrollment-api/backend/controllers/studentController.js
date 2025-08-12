const Student = require("../models/Student.js");

// Controller to add a new student to the database
exports.addStudent = async (req, res) => {
  try {
    // Create a new student document using request body
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    // Handle validation or creation errors
    res.status(400).json({ message: err.message });
  }
};

// Controller to get all students with optional filtering, sorting, and pagination
exports.getStudents = async (req, res) => {
  // Extract query parameters for filtering, sorting, and pagination
  const { course, year, sort = 'name', page = 1, limit = 5 } = req.query;

  // Build query object based on filters
  const query = {};
  if (course) query.course = course;
  if (year) query.year = year;

  try {
    // Find students matching the query, apply sorting and pagination
    const students = await Student.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(students);
  } catch (err) {
    // Handle errors during fetch
    res.status(500).json({ message: err.message });
  }
};

// Controller to get a single student by ID
exports.getStudent = async (req, res) => {
  try {
    // Find student by MongoDB document ID
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch (err) {
    // Handle errors during fetch
    res.status(500).json({ message: err.message });
  }
};

// Controller to update a student's information by ID
exports.updateStudent = async (req, res) => {
  try {
    // Find student by ID and update with new data
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch (err) {
    // Handle validation or update errors
    res.status(400).json({ message: err.message });
  }
};

// Controller to delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    // Find student by ID and delete
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    // Handle errors during deletion
    res.status(500).json({ message: err.message });
  }
};
