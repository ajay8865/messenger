const dao = require('../dao/message');
const Promise = require('promise');
const MessengerError = require('../errorHandler/messengerError');
const constants = require('../constants/constant');
const schema = require('../schema/schema');
const debug = require('debug')('service:message');
const service = {

	getAllMessages: function(req){
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive all messages, Request Id: ${req.id}`);
			debug(`Processing request to retreive all messages, Request Id: ${req.id}`);
			dao.getAllMessages(resolve, reject, req);
		});
	},

	getMessage: function(req){
		let id = req.params.id;
		if(!id || isNaN(id)){
			debug(`Error occurred: Invalid message id: ${id}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive message by id: ${id}, Request Id: ${req.id}`);
			debug(`Processing request to retreive message by id: ${id}, Request Id: ${req.id}`);
			dao.getMessage(resolve, reject, id, req);
		});
	},

	createMessage: function(req){
		const message = req.body;
		schema.validateMessage(message, req);
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to create message, Request Id: ${req.id}`);
			debug(`Processing request to create message, Request Id: ${req.id}`);
			dao.createMessage(resolve, reject, message, req);
		});
	},

	updateMessage: function(req){
		const message = req.body;
		schema.validateMessage(message, req);
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to update message with id: ${req.params.id}, Request Id: ${req.id}`);
			debug(`Processing request to update message with id: ${req.params.id}, Request Id: ${req.id}`);
			dao.updateMessage(resolve, reject, message, req);
		});
	},

	deleteMessage: function(req){
		if(isNaN(req.params.id)){
			debug(`Error occurred: Invalid message id: ${req.params.id}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to delete message with id: ${req.params.id}, Request Id: ${req.id}`);
			debug(`Processing request to delete message with id: ${req.params.id}, Request Id: ${req.id}`);
			dao.deleteMessage(resolve, reject, req);
		});
	}

}

module.exports = service;