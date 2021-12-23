const express = require("express");
const userSchema = express.Router();

const { signUp, logIn
} = require("./../controllers/user");

userSchema.post("/signup", signUp);
userSchema.post("/login", logIn);






module.exports = userSchema;
