const dao = require('../dao/comment');
const Promise = require('promise');
const MessengerError = require('../errorHandler/messengerError');
const constants = require('../constants/constant');
const schema = require('../schema/schema');
const debug = require('debug')('service:comment');
const service = {

	getAllComments: function(req){
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive all comments, Request Id: ${req.id}`);
			debug(`Processing request to retreive all comments, Request Id: ${req.id}`);
			dao.getAllComments(resolve, reject, req);
		});
	},

	getAllCommentsForMessage: function(req){
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive all comments for message with messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			debug(`Processing request to retreive all comments for message with messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			dao.getAllCommentsForMessage(resolve, reject, req);
		});
	},

	getComment: function(req){
		let id = req.params.id;
		let messageId = req.params.messageId;
		if(!id || isNaN(id)){
			debug(`Error occurred: Invalid comment id: ${id}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		if(isNaN(messageId)){
			debug(`Error occurred: Invalid messageId: ${messageId}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive comment by id: ${id} for message with id: ${messageId}, Request Id: ${req.id}`);
			debug(`Processing request to retreive comment by id: ${id} for message with id: ${messageId}, Request Id: ${req.id}`);
			dao.getComment(resolve, reject, messageId, id, req);
		});
	},

	createComment: function(req){
		const comment = req.body;
		comment.messageId = req.params.messageId;
		schema.validateComment(comment, req);
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to create comment for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			debug(`Processing request to create comment for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			dao.createComment(resolve, reject, comment, req);
		});
	},

	updateComment: function(req){
		const comment = req.body;
		comment.messageId = req.params.messageId;
		comment.id = req.params.id;
		schema.validateComment(comment, req);
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to update comment with id: ${req.params.id} for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			debug(`Processing request to update comment with id: ${req.params.id} for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			dao.updateComment(resolve, reject, comment, req);
		});
	},

	deleteComment: function(req){
		if(isNaN(req.params.id)){
			debug(`Error occurred: Invalid comment id: ${req.params.id}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		if(isNaN(req.params.messageId)){
			debug(`Error occurred: Invalid messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to delete comment with id: ${req.params.id} for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			debug(`Processing request to delete comment with id: ${req.params.id} for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			dao.deleteComment(resolve, reject, req);
		});
	},

	deleteAllCommentsForMessage: function(req){
		if(isNaN(req.params.messageId)){
			debug(`Error occurred: Invalid request messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to delete all comments for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			debug(`Processing request to delete all comments for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
			dao.deleteAllCommentsForMessage(resolve, reject, req);
		});
	}

}

module.exports = service;