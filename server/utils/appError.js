// setting up global error clas with error class for error handing

class AppError extends Error {
  constructor(message, statusCode) {
    // Error constructur call
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
