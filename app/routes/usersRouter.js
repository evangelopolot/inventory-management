const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const router = express.Router();
const localStrategy = require("../strategies/local-strategy");
// Can this code be improved?

// Validation middleware for sign up route
const validateSignUp = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  authController.validateSignUp,
];

// Validation middleware for login route
const validateLogin = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password").notEmpty().withMessage("Password is required"),
  authController.validateLogin,
];

const roles = {
  admin: ["read", "write", "delete"],
  user: ["read"],
};

// Middleware function to check authorisation
const authorise = (role) => {
  return (req, res, next) => {
    if (
      !req.user ||
      !roles[req.user.role] ||
      !roles[req.user.role].includes(role)
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

router.post("/signUp", authController.signUp);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user-homepage",
    failureRedirect: "/login", // see text
    failureFlash: true, // optional, see text as well
  }),
  authController.login
);
router.get("/status", authController.status);
router.get("/admin", authorise("admin"), authController.admin);
router.get("/profile", authorise("user"), authController.profile);
router.post("/logout", authorise("user"), authController.logout);
router.get("/:id", authController.getUserById);

module.exports = router;
