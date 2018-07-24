var mysql = require('../connection/mysql');
var logger = require('../config/winston');
var Comment = require('../models/comment');

var commentDao = {

	getComments: function(req, res, next, callback){
		mysql.getConnection().query('Select * from comment', function(err, data){
			if(err){
				throw err;
			}
			callback(data);
		});
	},

	getAllComments: function(res){
		mysql.getConnection().query('Select * from comment', function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
   			res.json({'comments' : data});
		});
	},

	getAllCommentsForMessage: function(messageId, res){
		mysql.getConnection().query('Select * from comment where messageId =?', messageId, function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
			res.json({'comments': data});
		});
	},

	getComment: function(messageId, id, res){
		mysql.getConnection().query('Select * from comment where `id`=? and messageId =?', [id, messageId], function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
			res.json({'comment': data});
		});
	},

	createComment: function(messageId, comment, res){
		var comm = new Comment(messageId, comment.text, comment.author);
		mysql.getConnection().query('Insert into comment SET ?', comm, function(err, data){
			if(err){
				throw err
			}
			res.status(201);
			res.send(`Successfully created comment for messageId: ${messageId} with id: ${data.insertId}`);
		});
	},

	updateComment: function(messageId, comment, id, res){
		var comm = new Comment(messageId, comment.text, comment.author);
		mysql.getConnection().query("Update comment SET text = ?, author = ? where id=? and messageId=?", 
			[comm.text, comm.author, id, messageId],  function(err, data){
			if(err){
				throw err
			}
			if(data.changedRows === 0){
				res.status(404);
				res.send(`No comment found for messageId: ${messageId} with commentId: ${id}`);
			}
			res.status(201);
			res.send(`Successfully updated comment for messageId: ${messageId} with commentId ${id}`);
		});
	},

	//to do delete comments too
	deleteComment: function(messageId, id, res){
		mysql.getConnection().query('Delete from comment where `id`=? and messageId=?', [id, messageId], function(err, data){
			if(err){
				throw err
			}
			if(data.affectedRows === 0){
				res.status(404);
				res.send(`No comment found for messageId: ${messageId} with commentId: ${id}`);
			}
			res.status(200);
			res.send(`Successfully deleted comment for messageId: ${messageId} with commentId ${id}`);
		});
	},

	deleteAllCommentsForMessage: function(messageId, res){
		mysql.getConnection().query('Delete from comment where messageId =?', messageId, function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
			res.send(`Successfully deleted all comments for messageId: ${messageId}`);
		});
	}
}

module.exports = commentDao;