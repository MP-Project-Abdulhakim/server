const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  video: {
    type: String,
  },
  image: {
    type: String,
  },
  recipe: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  deleted: {
    type: Boolean,
    default: false,
  },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
