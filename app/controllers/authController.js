const Users = require("../../models/userModel");
const passport = require("passport");

exports.signUp = async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  console.log("logout hit");
  if (!req.user) return res.sendStatus(401);
  res.clearCookie("connect.sid");
  req.logout(function (err) {
    if (err) return res.sendStatus(401);
    req.session.destroy(function (err) {
      res.send();
    });
  });
  req.logout((err) => {
    if (err) return res.sendStatus(401);
    res.send(200);
  });
};

exports.login = (req, res) => {
  console.log("User logged in:", req.user);
  return res.render("user-homepage", { user: req.user });
};

exports.status = (req, res) => {
  console.log("Inside /auth/status/ endpoint");
  return req.user ? res.send(req.user) : res.sendStatus(401);
};
