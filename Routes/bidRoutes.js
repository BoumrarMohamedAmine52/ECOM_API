const express = require("express");
const bidControllers = require("../Controllers/bidControllers");

const Router = express.Router();

Router.get("/", bidControllers.allBids);

Router.post("/", bidControllers.addBid);

Router.route("/:id")
  .get(bidControllers.getBid)
  .delete(bidControllers.deleteBid);

module.exports = Router;
