const express = require("express");
const wichListItemControllers = require("../Controllers/wichlistitemControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/", wichListItemControllers.allWichlistitems);

Router.post(
  "/",
  authMiddelwares.protect,
  wichListItemControllers.setwichlistFields,
  wichListItemControllers.addWichlistitem,
);

Router.route("/:id")
  .get(authMiddelwares.protect, wichListItemControllers.getWichlistitem)
  .delete(authMiddelwares.protect, wichListItemControllers.deleteWichlistitem);

module.exports = Router;
