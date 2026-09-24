const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Sold = require("../Models/soldModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allSolds = handlersFactory.getAll(Sold);

exports.getSold = handlersFactory.getOne(Sold);

exports.addSold = handlersFactory.addOne(Sold);

// exports.updateSold = handlersFactory.updateOne(Sold);

// exports.deleteSold = handlersFactory.deleteOne(Sold);
