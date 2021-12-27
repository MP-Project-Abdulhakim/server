const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  username:{type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //متابع بواسطه
  followedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //يتابع
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Follow", followSchema);
