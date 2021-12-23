const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  theComment: {
    type: String,
    required: true,
  },
  onPost: {
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
