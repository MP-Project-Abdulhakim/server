const express = require("express");
const { addfollow, deletefollow } = require("./../controllers/follow");

const authentication = require("./../middleWhere/authentication");



const followRouter = express.Router();
followRouter.post("/follow", authentication, addfollow);
followRouter.delete("/deletefollow", authentication, deletefollow);

module.exports = followRouter;
