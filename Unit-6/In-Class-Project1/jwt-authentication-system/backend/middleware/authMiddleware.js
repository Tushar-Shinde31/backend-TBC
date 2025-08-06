// Import JWT for verifying tokens
const jwt = require("jsonwebtoken");

// Middleware to protect routes and verify JWT token
const protect = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with 'Bearer '
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  // Extract the token from header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for use in next middleware/route
    req.user = decoded.userId;
    next();
  } catch {
    // Handle invalid or expired token
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// Export the middleware function
module.exports = protect;
