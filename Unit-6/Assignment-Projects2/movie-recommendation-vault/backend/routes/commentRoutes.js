const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment
} = require("../controllers/commentController");

// /api/comments/:movieId
router.get("/:movieId", getComments);
router.post("/:movieId", protect, createComment);

// /api/comments/update/:commentId
router.put("/update/:commentId", protect, updateComment);
router.delete("/delete/:commentId", protect, deleteComment);

module.exports = router;
