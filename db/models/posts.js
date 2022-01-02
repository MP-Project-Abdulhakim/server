const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  video: {
    type: String,
  },
  image: {
    type: String,
  },
  recipe: [
    {
      type: String,
      required: true,
    },
  ],
  ingridents: [{ type: String, required: true }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
