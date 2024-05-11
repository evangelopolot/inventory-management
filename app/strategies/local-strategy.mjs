import Passport from "passport";
import { Strategy } from "passport-local";
import User from "../../models/userModel.mjs";
import AppError from "../utils/appError.mjs";
import logger from "../utils/logger.mjs";

// User get saved to session - store user id to session data
Passport.serializeUser((user, done) => {
  // Use something unique to the user like id so it can be found in a database
  done(null, user._id);
});

// Unpackes the user - and store that use to the req object itself
Passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new AppError("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// This validates the user
Passport.use(
  new Strategy(async (username, password, done) => {
    logger.info("User trying to login", {
      username: username,
    });
    try {
      const user = await User.findOne({ username: username }).select(
        "+password"
      );
      if (!user) {
        logger.error("User not found", {
          username: username,
        });
        throw new AppError("User not found", 404);
      }
      logger.info("User found", {
        username: user.username,
      });

      const isMatch = await user.correctPassword(password, user.password);
      if (!isMatch) {
        logger.error("Invalid credentials provided from client.", {
          username: username,
        });
        throw new AppError("Invalid Credentials", 404);
      }
      return done(null, user);
    } catch (error) {
      // No user identified, pass in the err instance for passport to handle
      logger.error("Error authenticating user", {
        username: username,
        error: error,
      });
      return done(error, null);
    }
  })
);

export default Passport;
