const express = require("express");
const bidControllers = require("../Controllers/bidControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/", bidControllers.allBids);

Router.post(
  "/",
  authMiddelwares.protect,
  bidControllers.setBidFields,
  bidControllers.addBid,
);

Router.route("/:id")
  .get(authMiddelwares.protect, bidControllers.getBid)
  .delete(authMiddelwares.protect, bidControllers.deleteBid);

module.exports = Router;
