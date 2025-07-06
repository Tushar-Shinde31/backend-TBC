// Main entry point for the backend server

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
// const commentRoutes = require("./routes/commentRoutes"); // Example of how to import routes

dotenv.config(); // Load environment variables from .env file
require('./config/db')(); // Connect to MongoDB
require('./config/passport'); // Configure passport strategies

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Enable CORS for frontend URL and allow credentials (cookies, etc.)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Configure session middleware (required for passport)
app.use(session({
  secret: 'movievaultsecret', // Session secret
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Enable persistent login sessions

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
