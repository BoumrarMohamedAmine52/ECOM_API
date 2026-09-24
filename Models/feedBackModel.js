const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "a feedback must be by user."],
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "a feedback must to user."],
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
    required: [true, "a feedback must be about an item."],
  },
  feddback: {
    type: String,
    required: [true, "the feedback must not be empty."],
  },
});
