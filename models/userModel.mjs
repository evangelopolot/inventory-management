import { Schema, model } from "mongoose";

import bcrypt from "bcryptjs";
import validate from "validator"; // A library for validating email address

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "A user must have a unique username"],
    unique: true,
    trim: true,
    lowercase: true,
    notEmpty: {
      message: "Username must have a username",
    },
    isString: {
      message: "Username must only contain letters",
    },
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Must provide a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // Set default role
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Hash espassword
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/**
 * Checks if the password is correct.
 * @param {string} candidatePassword - The password provided by the client
 * @param {string} userPassword - The users password provided by the database
 * @returns {boolean}
 */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Compiles the Schema into a model which represents a document
const User = model("User", userSchema);
export default User; // Export the user model for CRUD Operations
