const express = require("express");
const userSchema = express.Router();

const {
  signUp,
  logIn,
  deleteUser,
  getUsers,
  updateUser,
} = require("./../controllers/user");

 const authentication = require("./../middleWhere/authentication");
 const authorization = require("./../middleWhere/authorization");

userSchema.get("/getusers", getUsers);
userSchema.post("/signup", signUp);
userSchema.post("/login", logIn);
userSchema.delete("/deleteUser/:id", authentication, authorization, deleteUser);
userSchema.post("/updat/:id",authentication, updateUser);




module.exports = userSchema;
