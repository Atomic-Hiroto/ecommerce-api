const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;