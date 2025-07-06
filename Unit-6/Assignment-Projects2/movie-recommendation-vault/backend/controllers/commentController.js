const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      movieId: req.params.movieId,
      userId: req.user._id,
      text: req.body.text
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: "Failed to comment" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }).populate("userId", "name");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to load comments" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, userId: req.user._id },
      { text: req.body.text },
      { new: true }
    );
    if (!comment) return res.status(403).json({ message: "Unauthorized or not found" });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      userId: req.user._id
    });
    if (!comment) return res.status(403).json({ message: "Unauthorized or not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};
