const express = require("express");
const userSchema = express.Router();

const {
  signUp,
} = require("./../controllers/user");

userSchema.post("/signup", signUp);






module.exports = userSchema;
