const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Item = require("../Models/itemModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.setUserId = (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  next();
};
exports.setUpdateFields = (req, res, next) => {
  if (req.body.user) {
    return next(new AppError("U can't update the user id.", 400));
  }
  next();
};

exports.allItems = handlersFactory.getAll(Item);

exports.getItem = handlersFactory.getOne(Item);

exports.addItem = handlersFactory.addOne(Item);

exports.updateItem = handlersFactory.updateOne(Item);

exports.deleteItem = handlersFactory.deleteOne(Item);
