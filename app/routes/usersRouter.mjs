import express from "express";
import passport from "passport";
import localStrategy from "../strategies/local-strategy.mjs";
import * as authController from "../controllers/authController.mjs";

const router = express.Router();
// Can this code be improved?

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
router.post("/login", passport.authenticate("local"), authController.login);
router.get("/logout", authController.logout);

export default router;
