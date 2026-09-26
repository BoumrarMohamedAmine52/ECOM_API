const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "an item must have a name."],
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "an item must belong to it owner or user."],
    },
    brand: {
      type: String,
      required: [true, "item must belong to a brand."],
    },
    isNew: {
      type: Boolean,
      required: [true, "the item must be either brand New or not."],
    },
    consdition: {
      type: String,
      required: [true, "item must have a condition."],
      enum: ["Excellent", "Good", "Average", "Below Average"],
    },
    categorie: {
      type: String,
      required: [true, "item must belong to a categorie"],
      enum: {
        values: [
          "Motors",
          "Electronics",
          "Clothing & Accessories",
          "Business",
          "Collectibles & Arts",
          "Home & Garden",
          "Sport",
          "Jewelry & watches",
          "Books, Movies & Music",
          "Health & Beauty",
          "Pet Supplies",
          "Tickets & Travel",
          "Gift Cards & Coupons",
        ],
        message: `the categorie must be either : Motors ,Electronics ,Clothing & Accessories 
      ,Business ,Collectibles & Arts ,Home & Garden ,Sport ,Jewelry & watches ,Books & Movies & Music ,
      Health & Beauty ,Pet Supplies ,Tickets & Travel ,Gift Cards & Coupons`,
      },
    },
    subCategorie: {
      type: String,
    },
    photos: {
      type: [String],
      required: [true, "the item must have photos."],
    },
    sellingPrice: {
      type: String,
    },
    startBiddingPrice: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
