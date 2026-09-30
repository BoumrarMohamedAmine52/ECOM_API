const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "a feedback must be by user."],
  },
  // to: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: [true, "a feedback must to user."],
  // },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
    required: [true, "a feedback must be about an item."],
  },
  feddback: {
    type: String,
    required: [true, "the feedback must not be empty."],
  },
  feedbackRating: {
    type: String,
    required: [true, "a feedback must have a rating."],
    enum: {
      values: ["Positive", "Neutral", "Negative"],
      message:
        "a feedback rating must be either Positive or Neutral, Negative.",
    },
  },
});
