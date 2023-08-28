const express = require('express');
const morgon = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// router import
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRouter');
const orderRoute = require('./routes/orderRoute');

// Global Error Handler
const globalHandler = require('./controller/errorController');
const AppError = require('./utils/AppError');

// initializing app
const app = express();

// Global Middlewares

// setting upsecurity http headers
app.use(helmet());
// implementing rate limiting so one id cannot make more requests
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// cookie parser
app.use(cookieParser());

// parse the incoming requests with JSON payloads
app.use(express.json());

// Data sanitization against nosql query injection
app.use(mongoSanitize());
// Data sanitization against cross site scripying attack
app.use(xss());

// Data sanitization against against parameter pollution
app.use(
  hpp({
    whitelist: ['price', 'rating', 'category'],
  })
);

// logger for dev env
if (process.env.NODE_ENV == 'development') {
  app.use(morgon('dev'));
}

// adding time to every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routing incoming request to dedicated controllers
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/orders', orderRoute);

// error handler for unhandled route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// using global error handler
app.use(globalHandler);

module.exports = app;
