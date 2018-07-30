const Joi = require('joi');
const constants = require('../constants/constant');
const MessengerError = require('../errorHandler/messengerError');

let profileSchema = Joi.object({
	'firstname' : Joi.string().required(),
	'lastname': Joi.string().required(),
	'email': Joi.string().email().required()
});

let messageSchema = Joi.object({
	'text' : Joi.string().required(),
	'author': Joi.string().required()
});

let commentSchema = Joi.object({
	'text' : Joi.string().required(),
	'author': Joi.string().required(),
	'messageId':Joi.number().required(),
	'id':Joi.number()
});


const schema = {

	  validateProfile: function(profile, req){
	  	Joi.validate(profile, profileSchema, function(err, value){
	  		if(err){
	  			global.logger.error(`${err.stack}, Request Id: ${req.id}`);
	  			throw new MessengerError(constants.error.ERR_9002);
	  		}
	  	});
	  },

	  validateMessage: function(message, req){
	  	Joi.validate(message, messageSchema, function(err, value){
	  		if(err){
	  			global.logger.error(`${err.stack}, Request Id: ${req.id}`);
	  			throw new MessengerError(constants.error.ERR_9002);
	  		}
	  	});
	  },

	  validateComment: function(comment, req){
	  	Joi.validate(comment, commentSchema, function(err, value){
	  		if(err){
	  			global.logger.error(`${err.stack}, Request Id: ${req.id}`);
	  			throw new MessengerError(constants.error.ERR_9002);
	  		}
	  	});
	  }
}


module.exports = schema;
