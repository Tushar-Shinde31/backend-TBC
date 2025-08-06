// Controller functions for handling student and feedback operations

const Student = require("../models/Student");

// Add a new student to the database
exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all students from the database
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add feedback to a specific student by ID
exports.addFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.feedback.push(req.body); // Add new feedback
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete feedback from a student by feedback index
exports.deleteFeedback = async (req, res) => {
  const { id, index } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student || !student.feedback[index])
      return res.status(404).json({ message: "Feedback not found" });

    student.feedback.splice(index, 1); // Remove feedback at given index
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
