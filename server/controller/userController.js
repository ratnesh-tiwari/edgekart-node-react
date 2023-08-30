const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, deleteOne } = require('./factoryHandler');
const { promisify } = require('util');

exports.getAllUsers = getAll(User);
exports.getOneUser = getOne(User, 'address');
exports.deleteUser = deleteOne(User);
const jwt = require('jsonwebtoken');

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

exports.updateRole = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(req.params.id, {
    rote: req.body.role,
  });

  if (!doc)
    return next(new AppError('No record has been found with given id.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  let token;
  // checking for cookie
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError('Plase login to get access to this resource.', 401)
    );

  // decoding jwt token and verifing if user exists or not
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check user is still valid
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );

  // checking for password change time is not befor jwt generation
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401)
    );
  }

  res.status(200).json({
    status: 'success',
    user: {
      user: freshUser,
    },
  });
});
