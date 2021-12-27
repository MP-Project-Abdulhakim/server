const followModel = require("../../db/models/follow");
const userModel = require("../../db/models/user");

const addfollow = (req, res) => {
  const { following } = req.body;
  const newfollow = new followModel({
    following: following,
    followedBy: req.token.userId,
  });
  newfollow.save().then((result) => {
    userModel
      .findByIdAndUpdate(following, { $push: { follow: result._id } })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};

const deletefollow = (req, res) => {
  const { id } = req.body;
  followModel
    .findByIdAndRemove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json("unfollow");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addfollow, deletefollow };
