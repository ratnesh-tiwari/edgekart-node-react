const AppError = require('../utils/AppError');

// Handling Invalid Database  ID (Cast error type)
const castDBErrorHandler = (err) => {
  const message = `Invaid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Duplicate key errors with mongodb
const duplicateKeyDBErrorHandler = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate feild value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

// Validation errors by mongodb
const validationDBErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input Data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// send error while dev mode
const sendErrorDevMode = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// send error while prod mode
const sendErrorProdMode = (err, res) => {
  // Operational error, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // unknown or programming error: don't leak error details
    // 1) log the error
    console.log('ERROR 💥', err);

    // 2) send error
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

// Global error handler for the app
module.exports = (err, req, res, next) => {
  // setting up status code
  err.statusCode = err.statusCode || 500;

  // setting up error status
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // error controller for dev mode
    sendErrorDevMode(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    // error controller for prod mode
    let error = { ...err };
    error.message = err.message;

    // handling cast error
    if (err.name === 'CastError') error = castDBErrorHandler(err);

    // handling duplicate key error
    if (err.code === 11000) error = duplicateKeyDBErrorHandler(error);

    // handling validation error
    if (err.name === 'ValidationError') error = validationDBErrorHandler(error);

    sendErrorProdMode(error, res);
  }
};
