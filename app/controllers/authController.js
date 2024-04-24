const Users = require("../../models/userModel");
const passport = require("passport");

/**
 * Creates a new users
 * @param {Object} req - The request object from Express.js, expected to contain
 *                       a body with `name`, `email`, and `password` fields.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *                          Does not explicitly return a value.
 * @async
 * @function signUp
 * @throws {Error} Logs an error message to the console if the user creation fails.
 */
exports.signUp = async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Maybe write code to save user on the database if needed

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log("Error!");
  }
};

exports.logout = (req, res) => {
  console.log("logout hit");
  if (!req.user) return res.sendStatus(401);
  // send empty cookie to clear it on client side
  res.clearCookie("connect.sid");
  // clears the cookie on the server side
  req.logout(function (err) {
    if (err) return res.sendStatus(401);
    // ends the session
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
  // Authentication successful, user is already logged in at this point
  console.log("User logged in:", req.user);
  return res.render("user-homepage", { user: req.user });
};

exports.status = (req, res) => {
  console.log("Inside /auth/status/ endpoint");
  // console.log(req.user);
  // console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401);
};

exports.auth = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  // Search for the user
  const findUser = await Users.findOne({ username: req.body.username }).select(
    "+password"
  );

  const isMatch = await findUser.correctPassword(password, findUser.password);

  if (!findUser || !isMatch)
    return res.status(401).send({ msg: "Invalid Credentials" });

  // Saving the token , sending and attaching the user to the session id
  req.session.user = findUser;
  return res.status(200).send(findUser);
};

exports.auth2 = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  // Search for the user
  const findUser = await Users.findOne({ username: req.body.username }).select(
    "+password"
  );

  const isMatch = await findUser.correctPassword(password, findUser.password);

  if (!findUser || !isMatch)
    return res.status(401).send({ msg: "Invalid Credentials" });

  // Saving the token , sending and attaching the user to the session id
  req.session.user = findUser;
  return res.status(200).send(findUser);
};

// exports.status = async (req, res) => {
//   // Prints out the sessions stored
//   req.sessionStore.get(req.session, (err, session) => {
//     console.log(session);
//   });
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(400).send({ message: "User Not Authenticated" });
// };

exports.saveItems = async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return response.staus(201).send(item);
};
