const express = require("express");
const { addLike } = require("./../controllers/like");

const likeRouter = express.Router();

likeRouter.post("/addLike", addLike);

module.exports = likeRouter;
