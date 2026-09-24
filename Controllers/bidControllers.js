const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Bid = require("../Models/bidModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allBids = handlersFactory.getAll(Bid);

exports.getBid = handlersFactory.getOne(Bid);

exports.addBid = handlersFactory.addOne(Bid);

exports.updateBid = handlersFactory.updateOne(Bid);

exports.deleteBid = handlersFactory.deleteOne(Bid);
