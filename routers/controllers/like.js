
const likeModel = require("../../db/models/likes");
const postModel = require("../../db/models/posts");

const addLike = (req, res) => {
  const { postId } = req.body;
  const newlike = new likeModel({
    postId: postId,
    userId: req.token.userId,
  });
  newlike.save().then((result) => {
    postModel
      .findByIdAndUpdate(postId, { $push: { like: result._id } })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};


const deleteLike = (req, res) => {
  const { postId } = req.body;
  likeModel
    .findOneAndRemove({ postId: postId })
    .exec()
    .then((result) => {
      postModel
        .findByIdAndUpdate(postId, { $pull: { like: result._id } })
        .then((result) => {
          res.status(201).json("deleted");
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const getLiked = (req, res) => {
  const { userId } = req.body;
  likeModel
    .find({})
    .populate("postId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addLike, deleteLike, getLiked };