const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Cartitem = require("../Models/cartItemModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.setCartItemFields = (req, res, next) => {
  req.body.item = req.body.item || req.query.item;
  req.body.user = req.body.user || req.user.id;
  next();
};

exports.setUpdateFields = (req, res, next) => {
  if (req.body.item || req.body.user) {
    return next(
      new AppError(
        "u can not update the item or user Ids of a cart item.",
        400,
      ),
    );
  }
  next();
};

exports.allCartItems = handlersFactory.getAll(Cartitem);

exports.getcartItem = handlersFactory.getOne(Cartitem);

exports.addCartItem = handlersFactory.addOne(Cartitem);

exports.updateCartItem = handlersFactory.updateOne(Cartitem);

exports.deleteCartItem = handlersFactory.deleteOne(Cartitem);
