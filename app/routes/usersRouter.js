const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", passport.authenticate("local"), authController.login);
router.post("/auth", authController.auth2);
router.get("/status", authController.status);
router.post("/logout", authController.logout);

module.exports = router;
