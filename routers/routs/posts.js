const express = require("express");
const {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
} = require("./../controllers/posts");

 const authentication = require("./../middleWhere/authentication");
const postRouter = express.Router();

postRouter.post("/addPost",authentication, createPost);
postRouter.get("/getUserPosts", authentication,getUserPosts);
postRouter.put("/updatePost/:id", authentication, updatePost);
postRouter.delete("/deletePost/:id",authentication, deletePost);
postRouter.get("/getPosts", getPosts);
postRouter.get("/getPostById/:id", getPosts);



module.exports = postRouter;
