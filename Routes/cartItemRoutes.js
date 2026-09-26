const express = require("express");
const cartItemControllers = require("../Controllers/cartItemControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/", cartItemControllers.allCartItems);

Router.post(
  "/",
  authMiddelwares.protect,
  cartItemControllers.setCartItemFields,
  cartItemControllers.addCartItem,
);

Router.route("/:id")
  .get(cartItemControllers.getCartItem)
  .patch(
    authMiddelwares.protect,
    cartItemControllers.setUpdateFields,
    cartItemControllers.updateCartItem,
  )
  .delete(authMiddelwares.protect, cartItemControllers.deleteCartItem);

module.exports = Router;
