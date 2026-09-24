const mongoose = require("mongoose");

const wichlistItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "item in wichlist must belong to a user."],
    },
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "wichlist item must belong to an item."],
    },
  },
  {
    timestamps: true,
  },
);

const Wichlistitem = mongoose.model("Wichlistitem", wichlistItemSchema);

module.exports = Wichlistitem;
