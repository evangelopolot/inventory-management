import logger from "../utils/logger.mjs";

export function getAuthPage(req, res) {
  logger.debug("User visiting the OAuth page."),
    {
      requestedBy: req,
    };
  res.status(200).render("oauth-page");
}

export function getUserDashboard(req, res) {
  logger.debug("Redirecting to user homepage.", {
    userId: req.user._id,
    username: req.user.username,
  });
  res.status(200).render("user-homepage");
}
