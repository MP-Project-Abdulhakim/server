const express = require("express");
const {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getPosts,
} = require("./../controllers/posts");

 const authentication = require("./../middleWhere/authentication");
 const authorization = require("./../middleWhere/authorization");
const postRouter = express.Router();
postRouter.post("/addPost",authentication, createPost);
postRouter.get("/getUserPosts/:id", getUserPosts);
postRouter.put("/updatePost/:id", updatePost);
postRouter.delete("/deletePost/:id", deletePost);
postRouter.get("/getPosts", getPosts);




module.exports = postRouter;
