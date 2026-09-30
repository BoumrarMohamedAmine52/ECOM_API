const express = require("express");
const itemControllers = require("../Controllers/itemsControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");
const Item = require("../Models/itemModel");

const Router = express.Router();

Router.get("/", itemControllers.allItems);

Router.post(
  "/",
  authMiddelwares.protect,
  itemControllers.setUserId,
  itemControllers.addItem,
);

Router.route("/:id")
  .get(itemControllers.getItem)
  .patch(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Item, "user"),
    itemControllers.setUpdateFields,
    itemControllers.uploadItemPhotos,
    itemControllers.resizeItemPhotos,
    itemControllers.updateItem,
  )
  .delete(
    authMiddelwares.protect,
    authMiddelwares.restrictToOwnerOnly(Item, "user"),
    itemControllers.deleteItem,
  );

module.exports = Router;
