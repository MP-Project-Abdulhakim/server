const express = require("express");



const {
  createComment,
  updateComment,
  deleteComment,
} = require("./../controllers/comment");

const commentRouter = express.Router();

commentRouter.post("/create", createComment);
commentRouter.put("/updateComment/:id", updateComment);
commentRouter.delete("/deleteComment/:id", deleteComment);



module.exports = commentRouter;
