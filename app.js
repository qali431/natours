/* eslint-disable */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1. GLOBAL Middlewares
//serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

//Set Security HTTP headerds
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //mogran logging middleware
}

//set limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});

app.use('/api', limiter);

//body parser, reading from body into req.body
app.use(express.json({ limit: '10kb' })); //express middleware
app.use(cookieParser());

//data sanitization, nosql query injection and XSS
app.use(mongoSanitize());
app.use(xss());

//prevent parameter polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //own middleware
  console.log(req.cookies);
  next();
});

//3. Routes
app.use('/', viewRouter); //this is defined as middleware
app.use('/api/v1/tours', tourRouter); //this is defined as middleware
app.use('/api/v1/users', userRouter); //this is defined as middleware
app.use('/api/v1/reviews', reviewRouter); //this is defined as middleware

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
