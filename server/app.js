const express = require('express');
const morgon = require('morgan');

// router import
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

// Global Error Handler
const globalHandler = require('./controller/errorController');
const AppError = require('./utils/AppError');

// initializing app
const app = express();

// logger for dev env
if (process.env.NODE_ENV == 'development') {
  app.use(morgon('dev'));
}
// parse the incoming requests with JSON payloads
app.use(express.json());

// adding time to every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/products', productRoute);
app.use('/api/v1/user', userRoute);

// error handler for unhandled route
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server.`, 404)
  );
});

// using global error handler
app.use(globalHandler);

module.exports = app;
