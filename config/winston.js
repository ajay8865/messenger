var appRoot = require('app-root-path');
const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');
const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

var options = {
  file: {
    level: 'debug',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 1024*1024*5, // 5MB
    maxFiles: 5,
    colorize: true,
    timestamp: tsFormat
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp: tsFormat
  },
  dailyRotateFile:{
    level: 'debug',
    handleExceptions: true,
    filename: `${appRoot}/logs/daily-log.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '2d',
    timestamp: tsFormat,
    json: true
  }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile(options.dailyRotateFile),
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;