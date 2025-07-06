// Passport configuration for Google OAuth

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from .env
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google secret from .env
  callbackURL: "/api/auth/google/callback" // Callback route
},
  async (accessToken, refreshToken, profile, done) => {
    // Called after Google authenticates user
    const { id, displayName, emails, photos } = profile;

    try {
      // Find or create user in DB
      let user = await User.findOne({ googleId: id });
      if (!user) {
        user = await User.create({
          googleId: id,
          name: displayName,
          email: emails[0].value,
          avatar: photos[0].value
        });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
