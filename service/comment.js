var logger = require('../config/winston');
var httpContext = require('express-http-context');
var dao = require('../dao/comment');
var service = {

	getAllComments: function(res){
		dao.getAllComments(res);
	},

	getComments: function(req, res, next){
		dao.getComments(req, res, next, function(data){
			res.status(200);
			res.json({'Comments': data});
		});
	},

	getAllCommentsForMessage: function(messageId, res){
		if(isNaN(messageId)){
			throw new Error('Invalid message Id : ' + id);
		}
		dao.getAllCommentsForMessage(messageId, res);
	},

	getComment: function(messageId, id, res){
		if(!id){
			throw new Error("Missing Comment Id");
		}
		if(isNaN(id)){
			throw new Error("Invalid Comment Id");		
		}
		if(isNaN(messageId)){
			throw new Error('Invalid message Id : ' + id);
		}
		dao.getComment(messageId, id, res);
	},

	createComment: function(messageId, comment, res){
		if(!comment){
			throw new Error("Invalid post input");
		}
		if(!comment.text || !comment.author){
			throw new Error("Missing required parameter in Comment");
		}
		if(isNaN(messageId)){
			throw new Error('Invalid message Id : ' + id);
		}
		return dao.createComment(messageId, comment, res);
	},

	updateComment: function(messageId, comment, id, res){
		if(!comment){
			throw new Error("Invalid post input");
		}
		if(!comment.text || !comment.author){
			throw new Error("Missing required parameter in Comment");
		}
		if(isNaN(id)){
			throw new Error("Invalid id");
		}
		if(isNaN(messageId)){
			throw new Error('Invalid message Id : ' + id);
		}
		return dao.updateComment(messageId, comment, id, res);
	},

	deleteComment: function(messageId, id, res){
		if(isNaN(id)){
			throw new Error("Invalid id");
		}
		if(isNaN(messageId)){
			throw new Error('Invalid message Id : ' + id);
		}
		dao.deleteComment(messageId, id, res);
	},

	deleteAllCommentsForMessage: function(messageId, res){
		if(isNaN(messageId)){
			throw new Error('Invalid message Id : ' + messageId);
		}
		dao.deleteAllCommentsForMessage(messageId, res);
	}

}

module.exports = service;