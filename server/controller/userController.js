const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, deleteOne } = require('./factoryHandler');

exports.getAllUsers = getAll(User);
exports.getOneUser = getOne(User, 'address');
exports.deleteUser = deleteOne(User);

// updating user
exports.updateUser = catchAsync(async (req, res, next) => {
  req.body.password = undefined;
  req.body.confirmPassword = undefined;
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
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
