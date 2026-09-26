const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Feedback = require("../Models/feedbackModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.setFeedbackFields = (req, res, next) => {
  req.body.item = req.body.item || req.query.item;
  req.body.by = req.body.by || req.user.id;
  next();
};

exports.setFeedbackUpdate = (req, res, next) => {
  if (req.body.by || req.body.item) {
    return next(
      new AppError("u can not update the item or feedbacker ids.", 400),
    );
  }
  next();
};

exports.allFeedbacks = handlersFactory.getAll(Feedback);

exports.getFeedback = handlersFactory.getOne(Feedback);

exports.addFeedback = handlersFactory.addOne(Feedback);

exports.updateFeedback = handlersFactory.updateOne(Feedback);

exports.deleteFeedback = handlersFactory.deleteOne(Feedback);
