const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  followBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  follow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const postModel = mongoose.model("Follow", followSchema);

module.exports = postModel;
