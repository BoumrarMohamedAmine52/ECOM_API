const express = require("express");
const bidControllers = require("../Controllers/cartItemControllers");

const Router = express.Router();

Router.get("/", bidControllers.allBids);

Router.post("/", bidControllers.addBid);

Router.route("/:id")
  .get(bidControllers.getBid)
  .patch(bidControllers.updateBid)
  .delete(bidControllers.deleteBid);

module.exports = Router;
