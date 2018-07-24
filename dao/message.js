var mysql = require('../connection/mysql');
var logger = require('../config/winston');
var Message = require('../models/message');

var messageDao = {

	getMessages: function(req, res, next, callback){
		mysql.getConnection().query('Select * from message', function(err, data){
			if(err){
				throw err;
			}
			callback(data);
		});
	},

	getAllMessages: function(res){
		mysql.getConnection().query('Select * from message', function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
   			res.json({'messages' : data});
		});
	},

	

	getMessage: function(id, showComments, res){
		mysql.getConnection().query('Select * from message where `id`=?', id, function(err, data){
			if(err){
				throw err;
			}
			if(data.length == 0){
				res.status(200);
				res.json({'message': data});
			}else if(showComments){
				mysql.getConnection().query('Select * from comment where messageId =?', id, function(err, comments){
					if(err){
						throw err;
					}
					data[0].comments = comments;
					res.status(200);
					res.json({'message': data});
				});
			}else{
				res.status(200);
				res.json({'message': data});
			}
		});
	},

	createMessage: function(message, res){
		var mess = new Message(message.text, message.author);
		mysql.getConnection().query('Insert into message SET ?', mess, function(err, data){
			if(err){
				throw err
			}
			res.status(201);
			res.send("Successfully created message for author " + message.author + ` with id ${data.insertId}`);
		});
	},

	updateMessage: function(message, id, res){
		var mess = new Message(message.text, message.author);
		mysql.getConnection().query("Update message SET text = ?, author = ? where id=?", 
			[mess.text, mess.author, id],  function(err, data){
			if(err){
				throw err
			}
			if(data.changedRows === 0){
				res.status(404);
				res.send('No message found with id: ' + id);
			}
			res.status(201);
			res.send(`Successfully updated message with id ${id}`);
		});
	},

	deleteMessage: function(id, res){
		var conn = mysql.getConnection();
		conn.query('Delete from comment where `messageId`=?', id, function(err, data){
			if(err){
					throw err
			}
			conn.query('Delete from message where `id`=?', id, function(err, data){
				if(err){
					throw err
				}
				if(data.affectedRows === 0){
					res.status(404);
					res.send('No message found with id: ' + id);
				}
				res.status(200);
				res.send("Successfully deleted message with id: " + id);
			});
		});
	}
}

module.exports = messageDao;