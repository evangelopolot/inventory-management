exports.getAuthPage = (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.status(200).render("oauth-page");
};

exports.getUserDashboard = (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.status(200).render("user-homepage");
};
