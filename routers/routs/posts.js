const express = require("express");
const {
 
  createPost,
  
} = require("./../controllers/posts");


const postRouter = express.Router();
postRouter.post("/addPost", createPost);


module.exports = postRouter;
