const express = require("express");
const feedbackControllers = require("../Controllers/wichlistitemControllers");

const Router = express.Router();

Router.get("/", feedbackControllers.allFeedbacks);

Router.post("/", feedbackControllers.addFeedback);

Router.route("/:id")
  .get(feedbackControllers.getFeedback)
  .patch(feedbackControllers.updateFeedback)
  .delete(feedbackControllers.deleteFeedback);

module.exports = Router;
