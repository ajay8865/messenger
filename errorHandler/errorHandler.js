const errorHandler = {

	logError: function(err, req, res, next){
      global.logger.error(`${err.stack}, Request Id: ${req.id}`);
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
		res.status(err.error_code? 400 : 500);
  	res.send(err.error_message || 'Some error occurred while processing request');
	}
}

module.exports = errorHandler;