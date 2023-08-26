// setting up global error clas with error class for error handing

class AppError extends Error {
  constructor(message, statusCode) {
    // Error constructur(parent) call
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // setting up so that we can send custom error to the user not programming or package related error
    this.isOperational = true;
    // this shows where it happened we can use it in dev mode to remove bug and error
    Error.captureStackTrace(this, this.constructor);
  }
}

// exporting error handler so it can be used in app
module.exports = AppError;
