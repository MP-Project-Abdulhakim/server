const express = require("express");
const userSchema = express.Router();

const { signUp, logIn, deleteUser
} = require("./../controllers/user");

userSchema.post("/signup", signUp);
userSchema.post("/login", logIn);
userSchema.delete("/delete/:id", deleteUser);





module.exports = userSchema;
