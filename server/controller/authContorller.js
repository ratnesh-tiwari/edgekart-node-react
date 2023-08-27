const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// token generator
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// generating token and sending response
const createAndSendTokenResponse = (user, statusCode, res) => {
  // expiring the token if any if present
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  // generating token
  const token = generateToken(user._id);

  // generating cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // setting up few more cookie option for production
  if (process.env.NODE_ENV.trim() === 'production') cookieOptions.secure = true;

  // setting up cookie to response object
  res.cookie('token', token, cookieOptions);

  // setting up passsword to undefined
  user.password = undefined;

  // sending response
  res.status(statusCode).json({
    status: 'success',
    token,
    user: {
      user,
    },
  });
};

// creating a new user
exports.createNewUser = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  // create and send token
  createAndSendTokenResponse(user, 201, res);
});

// loggin user
exports.loginUser = catchAsync(async (req, res, next) => {
  // extract email and password and if check they are present
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password.', 400));

  // finding user
  const user = await User.findOne({ email }).select('+password');

  // checking if user is present and entered correct password
  if (!user || !(await user.checkCorrectPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // create and send token
  createAndSendTokenResponse(user, 200, res);
});

// logout function
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Successfully logged out',
  });
});

// implementing protect route function
exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
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

  // attaching user to reqest obj
  req.user = freshUser;
  next();
});

// implementing restrict function to provide access to only few users
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to access this resource.', 403)
      );
    }
    next();
  };
};

// implementing update password function
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  // check if provided passwod is correct or not
  if (
    !(await user.checkCorrectPassword(req.body.currentPassword, user.password))
  );

  // if password is correct
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // send token
  createAndSendTokenResponse(user, 200, res);
});
