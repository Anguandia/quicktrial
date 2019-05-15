// // var createError = require('http-errors');
// var express = require('express');
// // var path = require('path');
// // var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var authRouter = require('./routes/auth');
// var usersRouter = require('./routes/users');
// var loansRouter = require('./routes/loans');
// // var auth = require('../utils/auth');

// var app = express();

// // view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'pug');

// app.use(logger('auth'));
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/v1/', indexRouter);
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/loans', loansRouter);

// // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //   next(createError(404));
// // });

// // error handler
// // app.use(function(err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });
// app.listen(3000);
// module.exports = app;

// var createError = require('http-errors');
const express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
import logger from 'morgan';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import loansRouter from './routes/loans';
// var auth = require('../utils/auth');

const app = express();
const port = process.env.port || 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('auth'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/loans', loansRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.listen(port, () => console.log(`server running on port ${port}`));
export default app;
