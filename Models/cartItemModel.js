const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "cartItem must belong to an item."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "cartItem must belong to a user."],
    },
    totalPrice: {
      type: Number,
      required: [true, "cart Item must have a total price."],
    },
    quantity: {
      type: Number,
      required: [true, "cart item must have a quantity."],
    },
  },
  {
    timestamps: true,
  },
);

const Cartitem = mongoose.model("Cartitem", cartItemSchema);

module.exports = Cartitem;
