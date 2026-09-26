const express = require("express");
const wichListItemControllers = require("../Controllers/wichlistitemControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");
const Wichlistitem = require("../Models/wichListModel");

const Router = express.Router();

Router.get("/", wichListItemControllers.allWichlistitems);

Router.post(
  "/",
  authMiddelwares.protect,
  wichListItemControllers.setwichlistFields,
  wichListItemControllers.addWichlistitem,
);

Router.route("/:id")
  .get(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Wichlistitem, "user"),
    wichListItemControllers.getWichlistitem,
  )
  .delete(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Wichlistitem, "user"),
    wichListItemControllers.deleteWichlistitem,
  );

module.exports = Router;
