const express = require("express");
const itemControllers = require("../Controllers/itemsControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

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
    itemControllers.setUpdateFields,
    itemControllers.updateItem,
  )
  .delete(authMiddelwares.protect, itemControllers.deleteItem);

module.exports = Router;
