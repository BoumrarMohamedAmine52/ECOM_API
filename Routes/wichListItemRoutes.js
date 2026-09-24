const express = require("express");
const wichListItemControllers = require("../Controllers/wichlistitemControllers");

const Router = express.Router();

Router.get("/", wichListItemControllers.allWichlistitems);

Router.post("/", wichListItemControllers.addWichlistitem);

Router.route("/:id")
  .get(wichListItemControllers.getWichlistitem)
  .delete(wichListItemControllers.deleteWichlistitem);

module.exports = Router;
