var logger = require('../config/winston');
var httpContext = require('express-http-context');
var errorHandler = {

	logError: function(err, req, res, next){
		res.locals.message = err.message;
  		res.locals.error = req.app.get('env') === 'development' ? err : {};
  		var reqId = httpContext.get('reqId');
  		logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - reqid: ${reqId}`);
  		next(err);
	},

	clientErrorHandler: function (err, req, res, next) {
  		if (req.xhr) {
    		res.status(500).send({ error: 'Invalid input' })
  		} else {
    		next(err)
  		}
	},

	defaultErrorHandler: function(err, req, res, next){
		res.status(err.status || 500);
  		res.send('error');
	}
}

module.exports = errorHandler;