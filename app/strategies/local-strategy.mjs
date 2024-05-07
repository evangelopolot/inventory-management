import Passport from "passport";
import { Strategy } from "passport-local";
import User from "../../models/userModel.mjs";
import AppError from "../utils/appError.mjs";

// User get saved to session - store user id to session data
Passport.serializeUser((user, done) => {
  console.log("Passport-Serialize");
  //   console.log(user);
  // Use something unique to the user so it can be found in a database
  console.log("The user id is!!!!" + user._id);
  done(null, user._id);
});

// Unpackes the user - and store that use to the req object itself
Passport.deserializeUser(async (id, done) => {
  console.log("Passport-Deserilizer");
  console.log("User id: ", id);
  try {
    const user = await User.findById(id);
    console.log("Passport-Deserilizer" + user);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// This validates the user
Passport.use(
  new Strategy(async (username, password, done) => {
    console.log("The username that passport picked up: ", username);
    console.log("The password that passport picked up: ", password);
    try {
      const user = await User.findOne({ username: username }).select(
        "+password"
      );
      if (!user) throw new AppError("User not found", 404);
      const isMatch = await user.correctPassword(password, user.password);
      if (!isMatch) throw new AppError("Invalid Credentials", 404);

      // If all is correct and user is identified
      return done(null, user);
    } catch (error) {
      // No user identified, pass in the err instance for passport to handle
      return done(error, null);
    }
  })
);

export default Passport;
