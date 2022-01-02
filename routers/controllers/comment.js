const commentModel = require("../../db/models/comment");
const postModel = require("../../db/models/posts")

// const createComment = (req, res) => {
//   const { id } = req.params;
//   const { theComment } = req.body;
//   const comment = new commentModel({
//     theComment,
//     createdBy: req.token.userId,
//     onPost: id,
//   });

//   comment
//     .save()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };



const createComment = (req, res) => {
  const { theComment, onPost } = req.body;

  const newcomment = new commentModel({
    theComment,
    onPost,
    createdBy: req.token.userId,
  });
  newcomment.save().then((result) => {
    postModel
      .findByIdAndUpdate(onPost, { $push: { comment: result._id } })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};


const getCommentsForPost = (req, res) => {
  
  const { id } = req.params; // post id
  
  commentModel
    .find({ onPost: id, deleted: false })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateComment = (req, res) => {
  const { theComment } = req.body;
  const { id } = req.params;
  commentModel
    .findByIdAndUpdate(id, { $set: { theComment: theComment } }, { new: true })
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

const deleteComment = (req, res) => {
  const { id } = req.params;

  commentModel
    .findByIdAndUpdate(id, { $set: { deleted: true } })
    .exec()
    .then((result) => {
      res.status(200).json("Deleted");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForPost,
};
