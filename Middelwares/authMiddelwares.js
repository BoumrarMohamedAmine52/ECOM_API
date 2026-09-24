const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const promisify = require("utils");

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

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Ur not loged in, please log in.", 401));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);

  if (!user) {
    return next(new AppError("the user belonging to that token", 401));
  }

  if (user.changedPassword(decode.iat)) {
    return next(
      new AppError("the password have been changed, please log in again.", 401),
    );
  }

  req.user = user;
  req.user.id = decode.id;
  next();
});
