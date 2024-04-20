const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const viewRouter = require("./routes/viewRouter");
const userRouter = require("./routes/usersRouter");
const localStrategy = require("./strategies/local-strategy");
const path = require("path");
const passport = require("passport");
const { log } = require("console");
const app = express();

// Parse application/json
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Read the cookies
app.use(cookieParser("the secret"));

// Create sessions
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // Dont save unmodified sessions - e.g. when users are just visiting
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // how long the session is live for
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// register view engine
app.set("view engine", "pug");

// tell view engine where to look
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Mount the Routes
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
