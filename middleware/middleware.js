const uuid = require('uuid/v1');
const debug = require('debug')('middleware:http');

let middleware = {
	assignRequestId : function(req, res, next){
		req.id = uuid();
		res.set('id', req.id);
		next();
	},

	logRequest: function(req, res, next){
	  	global.logger.debug(`[Request url: ${req.originalUrl}] [Request Method: ${req.method}] [Request IP: ${req.ip}] [Request ID: ${req.id}]`);
	    debug(`[Request url: ${req.originalUrl}] [Request Method:  ${req.method}] [Request IP: ${req.ip}] [Request ID: ${req.id}]`);
	    next();
	}
}

module.exports = middleware;