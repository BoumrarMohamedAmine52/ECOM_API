const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const handlersFactory = require("../Controllers/handlersFactory");

exports.setUpdateFields = (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("u can not update the password on this route.", 400),
    );
  }
  next();
};

exports.setIsActiveUser = (req, res, next) => {
  req.body = {
    isActive: false,
  };
  next;
};

exports.allUsers = handlersFactory.getAll(User);

exports.getUser = handlersFactory.getOne(User);

exports.updateUser = handlersFactory.updateOne(User);

exports.deActivateUser = handlersFactory.updateOne(User);

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    return next(
      new AppError("please provide ur current and new passwords.", 400),
    );
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.isCorrectPassword(currentPassword, user.password))) {
    return next(new AppError("incorrect password", 401));
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  res.status(204).json({
    status: "Success",
    data: {
      user,
    },
  });
});
