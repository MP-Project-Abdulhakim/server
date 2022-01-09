const postModelss = require("../../db/models/posts");

const createPost = (req, res) => {
  const { title, image, recipe, deleted, ingridents } =
    req.body;
  const newPost = new postModelss({
    title,
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
  postModelss
    .find({ deleted: false })
    .populate("comment like createdBy")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const getUserPosts = (req, res) => {
  console.log(req);
  postModelss
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
  postModelss
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
  postModelss
    .findByIdAndUpdate(id, { $set: { deleted: true } })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const getPostById = (req, res) => {
  const { id } = req.params; // post id

  postModelss
    .find({ _id: id, deleted: false })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


// getPostById
module.exports = {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
};


