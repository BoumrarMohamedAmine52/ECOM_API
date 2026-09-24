const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("utils");
const sendEmail = require("../Utils/email");
const crypto = require("crypto");

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

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide ur email.", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError("The user with that email, no longer exists.", 400),
    );
  }

  const resetToken = user.createResetToken();

  const url = `${req.protocol}://${req.get("host")}:${process.env.PORT}/api/v1/users/resetPassword/${resetToken}`;

  const message = `U forgot ur password !, 
  please send a PATCH request to this url : 
  ${url}, with ur new password and confirm password, 
  this request is only available for 10 min.`;

  const emailOptions = {
    email: user.email,
    subject: "forgot password",
    text: message,
  };

  try {
    await sendEmail(emailOptions);

    res.status(200).json({
      status: "Success",
      message: "the reset was sent to ur email.",
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpAt = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(
      new AppError("there was problem sending email, try again later.", 500),
    );
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetToken: resetToken,
    resetTokenExpAt: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("The reset token has been expired.", 400));
  }

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError("please provide ur new passwords", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.resetToken = undefined;
  user.resetTokenExpAt = undefined;

  await user.save();

  res.status(201).json({
    status: "Success",
    data: {
      user,
    },
  });
});
