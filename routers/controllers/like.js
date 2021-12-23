const likeModel = require("../../db/models/likes");
const postModel = require("../../db/models/posts");

// not completed
const addLike = (req, res) => {
  const { userId,postId } = req.body;
  const newlike = new likeModel({
    postId: postId,
    userId: req.id,
  });
  newlike
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(postId, { $push: { likeId: result._id } })
        .then((result) => {});
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


module.exports = {  addLike };