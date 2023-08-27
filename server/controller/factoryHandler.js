// exporting utils fun for async errors and global error handler
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

// get all document from database
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // calling api featre and implimenting api features
    const apiFeatureQuery = new ApiFeatures(Model.find(), req.query)
      .search()
      .filter()
      .limitFields()
      .pagination();

    const doc = await apiFeatureQuery.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

// find one document with id from database
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (popOptions) query = query.poputate(popOptions);
    const doc = await query;
    if (!doc)
      return next(new AppError('No record has been found with given ID.', 404));
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// create a new document in the database
exports.createNew = (Model) =>
  catchAsync(async (req, res, next) => {
    req.body.user = req.user._id;
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// update an existing document in database
exports.updateExisting = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc)
      return next(new AppError('No record has been found with given ID.', 404));
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// delete an existing document from database
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(new AppError('No record has been found with given ID.', 404));
    res.status(204).json({ status: 'success' });
  });
