import { Router } from "express";
import {
  getAuthPage,
  getUserDashboard,
} from "../controllers/viewController.mjs";
const router = Router();

router.get("/", getAuthPage);
router.get("/user-homepage", getUserDashboard);
router.get("/login", (req, res) => {
  res.render("oauth-page", { message: req.flash("error") }); // Pass error message (if any) to the signin view
});

export default router;
