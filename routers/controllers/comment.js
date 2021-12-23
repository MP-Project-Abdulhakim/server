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


//  deleteComment,
//    updateComment,
//    getPostComment,
   module.exports = {
     createComment,
   };