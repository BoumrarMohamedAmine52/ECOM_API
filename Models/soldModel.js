const mongoose = require("mongoose");

const soldSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "item must be sold."],
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "item must be sold by seller."],
    },
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "sold item must have a buyer."],
    },
    quantity: {
      type: Number,
      required: [true, "sold item must have quantity."],
    },
    totalPrice: {
      type: Number,
      required: [true, "sold item must have a total sold price"],
    },
  },
  {
    timestamps: true,
  },
);

const Sold = mongoose.model("Sold", soldSchema);

module.exports = Sold;
