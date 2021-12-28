const express = require("express");
const userSchema = express.Router();

const {
  signUp,
  logIn,
  deleteUser,
  getUsers,
  updateUser,
  verifyAccount,
  checkEmail,
  resetPassword,
} = require("./../controllers/user");

 const authentication = require("./../middleWhere/authentication");
 const authorization = require("./../middleWhere/authorization");

userSchema.get("/getusers", getUsers);
userSchema.post("/signup", signUp);
userSchema.post("/login", logIn);
userSchema.delete("/deleteUser/:id", authentication, authorization, deleteUser);
userSchema.post("/updat/:id",authentication, updateUser);
userSchema.post("/active", verifyAccount);
userSchema.post("/check", checkEmail);
userSchema.post("/reset", resetPassword);


module.exports = userSchema;
