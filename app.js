const newrelic = require('newrelic');
const createError = require('http-errors');
const errorHandler = require('./errorHandler/errorHandler');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./config/winston');
const middleware = require('./middleware/middleware');
const mysql = require('./connection/mysql');
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const messageRouter = require('./routes/message');
const commentRouter = require('./routes/comment');
const debug = require('debug')('app:http');
const constants = require('./constants/constant');
const app = express();

if (!global.logger){
	debug(`global.logger is initialised now`);
  	global.logger = logger;
}

//create connection and connect to db
mysql.createConnection('localhost', 'user', 'password', 'messenger');

//required for creating pool connection
//const pool = mysql.createPool(constants.poolConfig);
//mysql.registerPoolEvents(pool);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

morgan.token('id', function getId (req) {
  return req.id
});

// middlewares
app.use(middleware.assignRequestId);
app.use(middleware.logRequest);
app.use(morgan('combined', { stream: logger.stream }));
app.use(morgan('reqId=:id, method=:method, url=:url, response-time=:response-time', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes middlewares
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/message', messageRouter);
app.use('/messages', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler.logError);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.defaultErrorHandler);

module.exports = app;