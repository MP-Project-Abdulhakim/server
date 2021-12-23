const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
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

const commentsModel = mongoose.model("Comment", commentSchema);

module.exports = commentsModel;
