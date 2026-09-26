const express = require("express");
const subscriptionControllers = require("../Controllers/subscriptionControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/", subscriptionControllers.allSubscriptions);

Router.post(
  "/",
  authMiddelwares.protect,
  subscriptionControllers.addSubscription,
);

Router.get(
  "/:id",
  authMiddelwares.protect,
  subscriptionControllers.getSubscription,
);
module.exports = Router;
