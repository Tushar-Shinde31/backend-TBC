const Movie = require("../models/Movie");

// Create
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Failed to create movie" });
  }
};

// Read all
exports.getMovies = async (req, res) => {
  const { genre, sort } = req.query;

  let filter = {};
  if (genre) filter.genre = genre;

  try {
    let query = Movie.find(filter).populate("createdBy", "name email");

    if (sort === "popular") {
      query = query.sort({ upvotes: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const movies = await query.exec();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies" });
  }
};

// Update
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!movie) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!movie) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// Upvote
exports.upvoteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.downvotes.pull(req.user._id); // remove if exists
    if (movie.upvotes.includes(req.user._id)) {
      movie.upvotes.pull(req.user._id);
    } else {
      movie.upvotes.push(req.user._id);
    }

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Upvote failed" });
  }
};

// Downvote
exports.downvoteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.upvotes.pull(req.user._id);
    if (movie.downvotes.includes(req.user._id)) {
      movie.downvotes.pull(req.user._id);
    } else {
      movie.downvotes.push(req.user._id);
    }

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Downvote failed" });
  }
};
