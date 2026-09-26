const express = require("express");
const soldControllers = require("../Controllers/soldControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/", soldControllers.allSolds);

Router.post(
  "/:seller-:item",
  authMiddelwares.protect,
  soldControllers.setSoldFIelds,
  soldControllers.addSold,
);

Router.get("/:id", authMiddelwares.protect, soldControllers.getSold);

module.exports = Router;
