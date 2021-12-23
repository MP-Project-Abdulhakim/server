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
    required: true,
  },

  deleted: {
    type: Boolean,
    default: false,
  },
  likeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
