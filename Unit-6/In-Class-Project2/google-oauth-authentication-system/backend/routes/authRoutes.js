const express = require("express");
const router = express.Router();
const { googleLogin } = require("../controllers/authController");

// Route for handling Google login POST requests
router.post("/google-login", googleLogin);

module.exports = router;
