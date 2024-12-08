import mongoose from "mongoose";

let userSchema=new mongoose.Schema({
    username: {
      type: String,
      required: true,  // Name is required
    },
    email: {
      type: String,
      required: true,  // Email is required
      unique: true,    // Email should be unique
      lowercase: true, // Convert email to lowercase before saving
    },
    password: {
      type: String,
      required: true,  // Password is required
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Default to current date
    },
    verifycode: {
      type: String
    },
   codeExpiration: {
      type: Date,
    },
    ischecked: {
      type: Boolean,
      default: false
    }
})
export const User=mongoose.model('User', userSchema);

