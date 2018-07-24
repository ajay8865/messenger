var logger = require('../config/winston');
var httpContext = require('express-http-context');
var dao = require('../dao/message');
var service = {

	getAllMessages: function(res){
		dao.getAllMessages(res);
	},

	getMessages: function(req, res, next){
		dao.getMessages(req, res, next, function(data){
			res.status(200);
			res.json({'messages': data});
		});
	},

	getMessage: function(id, showComments, res){
		if(!id){
			throw new Error("Missing message Id");
		}
		if(isNaN(id)){
			throw new Error("Invalid message Id");		
		}
		dao.getMessage(id, showComments, res);
	},

	createMessage: function(message, res){
		if(!message){
			throw new Error("Invalid post input");
		}
		if(!message.text || !message.author){
			throw new Error("Missing required parameter in message");
		}
		return dao.createMessage(message, res);
	},

	updateMessage: function(message, id, res){
		if(!message){
			throw new Error("Invalid post input");
		}
		if(!message.text || !message.author){
			throw new Error("Missing required parameter in message");
		}

		if(isNaN(id)){
			throw new Error("Invalid id");
		}
		return dao.updateMessage(message, id, res);
	},

	deleteMessage: function(id, res){
		if(isNaN(id)){
			throw new Error("Invalid id");
		}
		dao.deleteMessage(id, res);
	}

}

module.exports = service;