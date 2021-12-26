const express = require("express");
const { addLike, deleteLike } = require("./../controllers/like");

const authentication = require("./../middleWhere/authentication");
const authorization = require("./../middleWhere/authorization");

const likeRouter = express.Router();
likeRouter.post("/addLike", authentication, addLike);
likeRouter.delete("/deleteLike", authentication, deleteLike);

module.exports = likeRouter;
