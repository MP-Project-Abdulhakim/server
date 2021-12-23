const postModel = require("../../db/models/posts");

const createPost = (req, res) => {
  const { video, image, recipe,createdBy ,deleted } = req.body;
  const newPost = new postModel({ video, image, recipe, createdBy, deleted });
  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });

}
module.exports = { createPost }; 
