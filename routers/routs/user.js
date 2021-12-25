const express = require("express");
const userSchema = express.Router();

const {
  signUp,
  logIn,
  deleteUser,
  getUsers,
  updateUser,
} = require("./../controllers/user");


userSchema.get("/getusers", getUsers);
userSchema.post("/signup", signUp);
userSchema.post("/login", logIn);
userSchema.delete("/delete/:id", deleteUser);
userSchema.post("/updat/:id", updateUser);




module.exports = userSchema;
