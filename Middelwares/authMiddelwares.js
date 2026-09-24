const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREI_IN,
  });
};
exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("please provide ur email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("wrong email or password.", 400));
  }

  const token = signToken(user.id);

  res.status.json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = signToken(user.id);

  res.status.json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = asyncHandler(async (req, res, next) => {});
