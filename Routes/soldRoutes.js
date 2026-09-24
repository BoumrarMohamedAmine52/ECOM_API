const express = require("express");
const soldControllers = require("../Controllers/soldControllers");

const Router = express.Router();

Router.get("/", soldControllers.allSolds);

Router.post("/", soldControllers.addSold);

Router.get("/:id", soldControllers.getSold);

module.exports = Router;
