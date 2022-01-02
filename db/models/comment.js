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
    
  },

  deleted: {
    type: Boolean,
    default: false,
  },

}, {timestamps: true});

const commentsModel = mongoose.model("Comment", commentSchema);

module.exports = commentsModel;
