const express = require("express");
const subscriptionControllers = require("../Controllers/subscriptionControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");
const Subscription = require("../Models/SubscriptionModel");

const Router = express.Router();

Router.get("/", subscriptionControllers.allSubscriptions);

Router.post(
  "/",
  authMiddelwares.protect,
  subscriptionControllers.setSubscription,
  subscriptionControllers.addSubscription,
);

Router.get(
  "/:id",
  authMiddelwares.protect,
  authMiddelwares.restrictToOwnerOnly(Subscription, "user"),
  subscriptionControllers.getSubscription,
);
module.exports = Router;
