const express = require("express");
const feedbackControllers = require("../Controllers/wichlistitemControllers");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/", feedbackControllers.allFeedbacks);

Router.post(
  "/",
  authMiddelwares.protect,
  feedbackControllers.setFeedbackFields,
  feedbackControllers.addFeedback,
);

Router.route("/:id")
  .get(feedbackControllers.getFeedback)
  .patch(
    authMiddelwares.protect,
    feedbackControllers.setFeedbackUpdate,
    feedbackControllers.updateFeedback,
  )
  .delete(authMiddelwares.protect, feedbackControllers.deleteFeedback);

module.exports = Router;
