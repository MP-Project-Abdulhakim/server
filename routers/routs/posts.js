const express = require("express");
const {
  createPost,
  getUserPosts,
  updatePost,
} = require("./../controllers/posts");


const postRouter = express.Router();
postRouter.post("/addPost", createPost);
postRouter.get("/getUserPosts/:id", getUserPosts);
postRouter.put("/updatePost/:id", updatePost);

module.exports = postRouter;
