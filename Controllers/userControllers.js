const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const handlersFactory = require("../Controllers/handlersFactory");
const multer = require("multer");
const sharp = require("sharp");

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

const multerStorage = multer.memoryStorage;

const multerFilter = (req, file, cb) => {
  if (file.mimeType.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image, please upload only images."), 400);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProfilePhoto = upload.single("profilePhoto");

exports.resizeProfilePhoto = asyncHandler(async (req, res, next) => {
  if (!req.files.profilePhoto) return next();

  await Promise.all(
    req.files.profilePhoto.map(async (file, i) => {
      const fileName = `user-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(200, 200)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/users/${fileName}`);

      req.body.profilePhoto = fileName;
    }),
  );
  next();
});

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
