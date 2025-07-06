const jwt = require("jsonwebtoken");

// Middleware to protect routes and verify JWT token
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
