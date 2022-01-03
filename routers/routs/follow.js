const express = require("express");
const {
  addfollow,
  deletefollow,
  getfollowed,
} = require("./../controllers/follow");

const authentication = require("./../middleWhere/authentication");

const followRouter = express.Router();

followRouter.post("/getfollowed", authentication, getfollowed);
followRouter.post("/follow", authentication, addfollow);
followRouter.delete("/deletefollow", authentication, deletefollow);

module.exports = followRouter;
