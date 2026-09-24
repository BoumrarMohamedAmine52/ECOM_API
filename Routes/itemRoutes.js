const express = require("express");
const itemControllers = require("../Controllers/itemsControllers");

const Router = express.Router();

Router.get("/", itemControllers.allItems);

Router.post("/", itemControllers.addItem);

Router.route("/:id")
  .get(itemControllers.getItem)
  .patch(itemControllers.updateItem)
  .delete(itemControllers.deleteItem);

module.exports = Router;
