var createError = require('http-errors');
var errorHandler = require('./errorHandler/errorHandler');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('./config/winston');
var uuid = require('uuid/v1');
var httpContext = require('express-http-context');
var mysql = require('./connection/mysql');
var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var messageRouter = require('./routes/message');
var commentRouter = require('./routes/comment');
var debug = require('debug')('route:http');
var app = express();

//global.logger = logger;

//create connection and connect to db
const conn = mysql.createConnection();
conn.connect(mysql.connectCallback);

// Express.js middleware that is responsible for initializing the context for each request.
app.use(httpContext.middleware);
// Run the context for each request. Assign a unique identifier to each request
app.use(function(req, res, next) {
    httpContext.set('reqId', uuid());
    var reqId = httpContext.get('reqId');
  	logger.debug(`[Request url: ${req.originalUrl}] [Request Method: ${req.method}] [Request IP: ${req.ip}] [Request ID: ${reqId}]`);
    debug(`Request url: ${req.originalUrl} --Request Method:  ${req.method} --Request IP: ${req.ip} --Request ID: ${reqId}`);
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
