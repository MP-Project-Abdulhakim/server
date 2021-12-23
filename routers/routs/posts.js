const express = require("express");
const { createPost, getUserPosts } = require("./../controllers/posts");


const postRouter = express.Router();
postRouter.post("/addPost", createPost);
postRouter.get("/getUserPosts/:id", getUserPosts);

module.exports = postRouter;
