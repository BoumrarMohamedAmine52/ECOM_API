const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Item = require("../Models/itemModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allItems = handlersFactory.getAll(Item);

exports.getItem = handlersFactory.getOne(Item);

exports.addItem = handlersFactory.addOne(Item);

exports.updateItem = handlersFactory.updateOne(Item);

exports.deleteItem = handlersFactory.deleteOne(Item);
