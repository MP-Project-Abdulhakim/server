const express = require("express");
const {
  addfollow,
  deletefollow,
  getfollowed,
} = require("./../controllers/follow");

const authentication = require("./../middleWhere/authentication");

const followRouter = express.Router();

followRouter.get("/getfollowed", getfollowed);
followRouter.post("/follow", authentication, addfollow);
followRouter.put("/deletefollow", authentication, deletefollow);

module.exports = followRouter;
