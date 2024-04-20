const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.get("/", viewController.getAuthPage);
router.get("/user-homepage", viewController.getUserDashboard);

module.exports = router;
