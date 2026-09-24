const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "a bid must be for an item."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "a bid must be by a buyer or user."],
    },
    bid: {
      type: Number,
      required: [true, "a bid must have a value."],
    },
  },
  {
    timestamps: true,
  },
);

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
