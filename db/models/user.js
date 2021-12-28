const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imgProfile: { type: String },
  isDeleted: { type: Boolean, default: false },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c817269c72cd8cbad62eff",
  },
  isActive: { type: Boolean, default: false },
  activeCode: { type: String },
  passwordCode: { type: String },
});

module.exports = mongoose.model("User", userSchema);
