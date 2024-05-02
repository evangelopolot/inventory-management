const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const viewRouter = require("./routes/viewRouter");
const userRouter = require("./routes/usersRouter");
const path = require("path");
const passport = require("passport");
const { log } = require("console");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const flash = require("connect-flash");
const { status } = require("./controllers/authController");

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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// This middleware will be called when authentication fails
app.use((req, res, next) => {
  if (req.session && req.session.flash && req.session.flash.error) {
    // Display the error message in the OAuth UI
    res.locals.error = req.session.flash.error[0];
    delete req.session.flash;
  }
  next();
});

// register view engine
app.set("view engine", "pug");

// tell view engine where to look
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Mount the Routes
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

// Error handling middleware for invalid routes
app.all("*", (req, res, next) => {
  // Pass the error to the error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
