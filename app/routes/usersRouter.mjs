import express from "express";
import passport from "passport";
import * as authController from "../controllers/authController.mjs";
import { check } from "express-validator";
import localStrategy from "../strategies/local-strategy.mjs";

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
router.post(
  "/login",
  passport.authenticate("local"),
  authController.login
);
router.get("/status", authController.status);
router.get("/admin", authorise("admin"), authController.admin);
router.get("/profile", authorise("user"), authController.profile);
router.post("/logout", authorise("user"), authController.logout);
router.get("/:id", authController.getUserById);

export default router;
