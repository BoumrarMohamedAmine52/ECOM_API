const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");
const Item = require("../Models/itemModel");
const handlersFactory = require("../Controllers/handlersFactory");
const multer = require("multer");
const sharp = require("sharp");

exports.setUserId = (req, res, next) => {
  req.body.user = req.body.user || req.user.id;
  next();
};

exports.setUpdateFields = (req, file, next) => {
  if (req.body.user) {
    return next(new AppError("U can't update the user id.", 400));
  }
  next();
};

const multerStorage = multer.memoryStorage;

const multerFilter = (req, res, cb) => {
  if (file.mimeType.startWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image, please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

/// this middelware puts the photos in array req.files.photos .
exports.uploadItemPhotos = upload.array("photos", 5);

exports.resizeItemPhotos = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();

  req.body.photos = [];

  await Promise.all(
    req.files.photos.map(async (photo, i) => {
      const fileName = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(525, 700)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/items/${fileName}`);

      req.body.photos.push(fileName);
    }),
  );
  next();
});

exports.allItems = handlersFactory.getAll(Item);

exports.getItem = handlersFactory.getOne(Item);

exports.addItem = handlersFactory.addOne(Item);

exports.updateItem = handlersFactory.updateOne(Item);

exports.deleteItem = handlersFactory.deleteOne(Item);
