const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Sold = require("../Models/soldModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.setSoldFIelds = (req, res, next) => {
  req.body.buyer = req.body.buyer || req.user.id;
  req.body.item = req.body.item || req.params.item;
  req.body.seller = req.body.seller || req.params.seller;
};

exports.allSolds = handlersFactory.getAll(Sold);

exports.getSold = handlersFactory.getOne(Sold);

exports.addSold = handlersFactory.addOne(Sold);

// exports.updateSold = handlersFactory.updateOne(Sold);

// exports.deleteSold = handlersFactory.deleteOne(Sold);
