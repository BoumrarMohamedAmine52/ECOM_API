const express = require("express");
const cartItemControllers = require("../Controllers/cartItemControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");
const Cartitem = require("../Models/cartItemModel");

const Router = express.Router();

Router.get("/", cartItemControllers.allCartItems);

Router.post(
  "/",
  authMiddelwares.protect,
  cartItemControllers.setCartItemFields,
  cartItemControllers.addCartItem,
);

Router.route("/:id")
  .get(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Cartitem, "user"),
    cartItemControllers.getCartItem,
  )
  .patch(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Cartitem, "user"),
    cartItemControllers.setUpdateFields,
    cartItemControllers.updateCartItem,
  )
  .delete(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Cartitem, "user"),
    cartItemControllers.deleteCartItem,
  );

module.exports = Router;
