const express = require("express");
const cartItemControllers = require("../Controllers/cartItemControllers");

const Router = express.Router();

Router.get("/", cartItemControllers.allCartItems);

Router.post("/", cartItemControllers.addCartItem);

Router.route("/:id")
  .get(cartItemControllers.getcartItem)
  .patch(cartItemControllers.updateCartItem)
  .delete(cartItemControllers.deleteCartItem);

module.exports = Router;
