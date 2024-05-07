export function getAuthPage(req, res) {
  console.log(req.session);
  console.log(req.session.id);
  res.status(200).render("oauth-page");
}

export function getUserDashboard(req, res) {
  console.log(req.session);
  console.log(req.session.id);
  res.status(200).render("user-homepage");
}
