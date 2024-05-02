const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../../models/userModel");
const AppError = require("../utils/appError");

// User get saved to session - store user id to session data
passport.serializeUser((user, done) => {
  console.log("Passport-Serialize");
  //   console.log(user);
  // Use something unique to the user so it can be found in a database
  console.log("The user id is!!!!" + user._id);
  done(null, user._id);
});

// Unpackes the user - and store that use to the req object itself
passport.deserializeUser(async (id, done) => {
  console.log("Passport-Deserilizer");
  console.log("User id: ", id);
  try {
    const user = await Users.findById(id);
    console.log("Passport-Deserilizer" + user);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// This validates the user
passport.use(
  new Strategy(async (username, password, done) => {
    console.log("The username that passport picked up: ", username);
    console.log("The password that passport picked up: ", password);
    try {
      const user = await Users.findOne({ username: username }).select(
        "+password"
      );
      if (!user) return new AppError("User not found", 404);
      const isMatch = await user.correctPassword(password, user.password);
      if (!isMatch) throw new Error("Invalid Credentials");

      // If all is correct and user is identified
      return done(null, user);
    } catch (error) {
      // No user identified, pass in the err instance for passport to handle
      return done(error, null, { message: "Emal or password is incorrect" });
    }
  })
);

module.exports = passport;
