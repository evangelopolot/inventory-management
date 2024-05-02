const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.get("/", viewController.getAuthPage);
router.get("/user-homepage", viewController.getUserDashboard);
router.get("/login", (req, res) => {
  res.render("oauth-page", { message: req.flash("error") }); // Pass error message (if any) to the signin view
});

module.exports = router;
