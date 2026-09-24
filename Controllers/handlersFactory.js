const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");

exports.getAll = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: "Success",
      data: {
        docs,
      },
    });
  });
};

exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError(`There is no ${Model.modelName} with that ID.`));
    }

    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};

exports.addOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.craete(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id);

    if (!doc) {
      return next(new AppError(`There is no ${Model.modelName} with that ID.`));
    }

    res.status(201).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`There is no ${Model.modelName} with that ID.`));
    }

    res.status(204).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
};
