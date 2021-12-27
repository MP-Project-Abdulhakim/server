const postModel = require("../../db/models/posts");

const createPost = (req, res) => {
  const { title, video, image, recipe, deleted, ingridents } =
    req.body;
  const newPost = new postModel({
    title,
    video,
    image,
    recipe,
    createdBy: req.token.userId,
    deleted,
    ingridents,
  });
  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const getPosts = (req, res) => {
  postModel
    .find({ deleted: false})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};




const getUserPosts = (req, res) => {
  console.log(req);
  postModel
    .find({ deleted: false, createdBy: req.token.userId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const updatePost = (req, res) => {
  const { title, video, image, recipe, ingridents } = req.body;
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(
      id,
      { $set: { title, video, image, recipe, ingridents } },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(err);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const deletePost = (req, res) => {
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(id, { $set: { deleted: true } })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


// getPostById
module.exports = { createPost, getUserPosts, updatePost, deletePost, getPosts };


