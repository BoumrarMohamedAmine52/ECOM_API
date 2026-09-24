const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Subscription = require("../Models/SubscriptionModel");
const handlersFactory = require("../Controllers/handlersFactory");

exports.allSubscriptions = handlersFactory.getAll(Subscription);

exports.getSubscription = handlersFactory.getOne(Subscription);

exports.addSubscription = handlersFactory.addOne(Subscription);

// exports.updateSubscription = handlersFactory.updateOne(Subscription);

// exports.deleteSubscription = handlersFactory.deleteOne(Subscription);
