const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  upvoteMovie,
  downvoteMovie
} = require("../controllers/movieController");

router.get("/", getMovies);
router.post("/", protect, createMovie);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);
router.patch("/:id/upvote", protect, upvoteMovie);
router.patch("/:id/downvote", protect, downvoteMovie);

module.exports = router;
