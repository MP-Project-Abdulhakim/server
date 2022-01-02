const express = require("express");
const { addLike, deleteLike, getLiked } = require("./../controllers/like");

const authentication = require("./../middleWhere/authentication");

const likeRouter = express.Router();
likeRouter.post("/getLiked", authentication, getLiked);
likeRouter.post("/addLike", authentication, addLike);
likeRouter.put("/deleteLike", authentication, deleteLike);

module.exports = likeRouter;
