import User from "../../models/userModel.mjs";
import AppError from "../utils/appError.mjs";
import catchAsyncError from "../utils/catchAsync.mjs";
import logger from "../utils/logger.mjs";

export async function signUp(req, res) {
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
}

export function logout(req, res) {
  // Checks if user is authenticated
  if (!req.user) return res.sendStatus(401);

  // Clear the session cookie
  res.clearCookie("connect.sid");

  req.logout(function (err) {
    if (err) return res.sendStatus(401);
    req.session.destroy(function (err) {
      if (err) return res.sendStatus(401);
      logger.info("User logged out successfully");
      return res.status(200).json({ status: "success" });
    });
  });
}

export function login(req, res) {
  // Logging a message with additional metadata
  logger.info("User authenticated successfully", {
    userId: req.user._id,
    username: req.user.username,
  });
  // res.redirect("/user-homepage");
  res.status(200).json({ status: "success" });
}

export function status(req, res) {
  console.log("Inside /auth/status/ endpoint");
  return req.user ? res.send(req.user) : res.sendStatus(401);
}

export function getUsers(req, res) {
  const id = req.body.id;
  return User.findById(id);
}

export const getUserById = catchAsyncError(async (req, res, next) => {
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
export function authorise(...roles) {
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
}

export function profile(req, res) {
  res.json({ user: req.user });
}

export function admin(req, res) {
  res.json({ user: req.user });
}
