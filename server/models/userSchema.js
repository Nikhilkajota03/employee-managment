import mongoose from "mongoose";

// Define schema for admin users
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: "string",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define Admin model
const User = mongoose.model("User", adminSchema);

export default User;
