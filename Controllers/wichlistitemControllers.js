const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Wichlistitem = require("../Models/wichListModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allWichlistitems = handlersFactory.getAll(Wichlistitem);

exports.getWichlistitem = handlersFactory.getOne(Wichlistitem);

exports.addWichlistitem = handlersFactory.addOne(Wichlistitem);

// exports.updateWichlistitem = handlersFactory.updateOne(Wichlistitem);

exports.deleteWichlistitem = handlersFactory.deleteOne(Wichlistitem);
