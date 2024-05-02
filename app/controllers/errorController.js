const { model } = require("mongoose");

// Error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err.stack);
  res.status(500).json({
    status: err.status,
    message: err.message,
  });
};
