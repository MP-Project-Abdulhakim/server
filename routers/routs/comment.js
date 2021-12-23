const express = require("express");



const { createComment, updateComment } = require("./../controllers/comment");

const commentRouter = express.Router();

commentRouter.post("/create", createComment);
commentRouter.put("/updateComment/:id", updateComment);



module.exports = commentRouter;
