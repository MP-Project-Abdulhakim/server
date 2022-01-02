const express = require("express");

const {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForPost,
} = require("./../controllers/comment");

const commentRouter = express.Router();

const authentication = require("./../middleWhere/authentication");

commentRouter.post("/createComment", authentication, createComment);
commentRouter.put("/updateComment/:id", authentication, updateComment);
commentRouter.delete("/deleteComment/:id", authentication, deleteComment);
commentRouter.get("/getComments/:id", getCommentsForPost);

module.exports = commentRouter;
