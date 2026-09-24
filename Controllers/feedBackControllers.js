const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Feedback = require("../Models/feedbackModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allFeedbacks = handlersFactory.getAll(Feedback);

exports.getFeedback = handlersFactory.getOne(Feedback);

exports.addFeedback = handlersFactory.addOne(Feedback);

exports.updateFeedback = handlersFactory.updateOne(Feedback);

exports.deleteFeedback = handlersFactory.deleteOne(Feedback);
