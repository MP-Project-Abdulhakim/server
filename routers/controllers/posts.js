const postModel = require("../../db/models/posts");

const createPost = (req, res) => {
  const { title, video, image, recipe, createdBy, deleted, ingridents } =
    req.body;
  const newPost = new postModel({
    title,
    video,
    image,
    recipe,
    createdBy,
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
    .find({ deleted: false, user: req.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



//not completed
const getUserPosts = (req, res) => {
  postModel
    .find({ deleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const updatePost = (req, res) => {
  const { title, recipe } = req.body;
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(id, { $set: { title, recipe } },{new: true})
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
      res.status(200).json("Deleted");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


// getPosts, getPostById
module.exports = { createPost, getUserPosts, updatePost, deletePost, getPosts };


