const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("../app");

// Connect to the database
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}...`);
});
