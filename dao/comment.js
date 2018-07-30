const mysql = require('../connection/mysql');
const Comment = require('../models/comment');
const debug = require('debug')('dao:comment');

const commentDao = {

	getAllComments: function(resolve, reject, req){
		mysql.getConnection().query('Select * from comment', function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug("Successfully retreive all comment, " + "Request Id: " + req.id);
				resolve(data);
			}
		});
	},

	getAllCommentsForMessage: function(resolve, reject, req){
		mysql.getConnection().query('Select * from comment where messageId =?', req.params.messageId, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully retreive all comments for message with id: ${req.params.messageId}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	getComment: function(resolve, reject, messageId, id, req){
		mysql.getConnection().query('Select * from comment where `id`=? and messageId =?', [req.params.id, req.params.messageId], function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully retreive comment with id: ${req.params.id} for message with id: ${id}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	createComment: function(resolve, reject, comment, req){
		const comm = new Comment(comment.messageId, comment.text, comment.author);
		mysql.getConnection().query('Insert into comment SET ?', comm, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully created comment with id: ${data.insertId} for message with id: ${comment.messageId}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	updateComment: function(resolve, reject, comment, req){
		const comm = new Comment(comment.messageId, comment.text, comment.author);
		const id = req.params.id;
		mysql.getConnection().query('Update comment SET text = ?, author = ? where id=? and messageId=?', 
			[comm.text, comm.author, id, comment.messageId],  function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else if(data.changedRows === 0){
				debug(`No comment found with id: ${id} with message id: ${comment.messageId}, Request Id: ${req.id}`);
				global.logger.debug(`No comment found with id: ${id} with message id: ${comment.messageId}, Request Id: ${req.id}`);
			}else{
				global.logger.debug(`Successfully updated comment with id: ${id} for message with id: ${comment.messageId}, Request Id: ${req.id}`);
			}
			resolve(data);
		});
	},

	deleteComment: function(resolve, reject, req){
		mysql.getConnection().query('Delete from comment where `id`=? and messageId=?', [req.params.id, req.params.messageId], function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}
			resolve(data);
		});
	},

	deleteAllCommentsForMessage: function(resolve, reject, req){
		mysql.getConnection().query('Delete from comment where messageId=?', req.params.messageId, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}
			resolve(data);
		});
	}

}

module.exports = commentDao;