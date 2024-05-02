const User = require("../../models/userModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsync");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  console.log("logout hit");
  if (!req.user) return res.sendStatus(401);
  res.clearCookie("connect.sid");
  req.logout(function (err) {
    if (err) return res.sendStatus(401);
    req.session.destroy(function (err) {
      res.send();
    });
  });
  req.logout((err) => {
    if (err) return res.sendStatus(401);
    res.send(200);
  });
};

exports.login = (req, res) => {
  // Assuming the user is authenticated successfully
  res.redirect("/user-homepage");
};

exports.status = (req, res) => {
  console.log("Inside /auth/status/ endpoint");
  return req.user ? res.send(req.user) : res.sendStatus(401);
};

exports.getUsers = (req, res) => {
  const id = req.body.id;
  return User.findById(id);
};

exports.getUserById = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a route parameter

    // Find the user by their ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("User not found with that ID", 404));
    }

    // Return the user details
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a middleware function to check authorisation
exports.authorise = (...roles) => {
  return (req, res, next) => {
    // roles is restricted to only admin roles
    // req.user.role gives us the role of the user from the protected middleware
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("You do not have permission to perform this action!", 403)
      );
    }
    next();
  };
};

exports.profile = (req, res) => {
  res.json({ user: req.user });
};

exports.admin = (req, res) => {
  res.json({ user: req.user });
};
