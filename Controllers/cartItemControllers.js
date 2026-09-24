const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Cartitem = require("../Models/cartItemModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allCartItems = handlersFactory.getAll(Cartitem);

exports.getcartItem = handlersFactory.getOne(Cartitem);

exports.addCartItem = handlersFactory.addOne(Cartitem);

exports.updateCartItem = handlersFactory.updateOne(Cartitem);

exports.deleteCartItem = handlersFactory.deleteOne(Cartitem);
