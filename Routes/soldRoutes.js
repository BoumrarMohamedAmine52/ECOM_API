const express = require("express");
const soldControllers = require("../Controllers/soldsControllers");

const Router = express.Router();

Router.get("/", soldControllers.allsolds);

Router.post("/", soldControllers.addsold);

Router.get("/:id", soldControllers.getSold);

module.exports = Router;
