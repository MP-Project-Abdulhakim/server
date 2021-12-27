const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  username:{type: mongoose.Schema.Types.ObjectId, ref: "User" },
  followedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Follow", followSchema);
