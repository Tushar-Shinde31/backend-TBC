const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Initialize Google OAuth2 client with client ID from environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controller for handling Google login
exports.googleLogin = async (req, res) => {
  const { credential } = req.body; // Google ID token received from frontend

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract user info from the token payload
    const { name, email, picture } = ticket.getPayload();

    // Check if user already exists in the database
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user
    if (!user) {
      user = await User.create({ name, email, picture });
    }

    // Generate JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token and user info to the client
    res.json({ token, user });
  } catch (err) {
    console.error("OAuth error:", err.message);
    res.status(401).json({ message: "Google login failed" });
  }
};
