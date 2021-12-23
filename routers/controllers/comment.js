const commentModel = require("../../db/models/comment");


const createComment = (req, res) => {

  const { theComment, onPost, createdBy } = req.body;
  const comment = new commentModel({
    theComment,
    createdBy,
    onPost,
  });

  comment
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};



const updateComment = (req, res) => {
  const { theComment } = req.body;
  const { id } = req.params;
  commentModel
    .findByIdAndUpdate(id, { $set: { theComment: theComment } },{new: true})
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


   
//    getPostComment,
   module.exports = {
     createComment,
     updateComment,
     deleteComment,
   };