const mysql = require('../connection/mysql');
const Message = require('../models/message');
const debug = require('debug')('dao:message');

const messageDao = {

	getAllMessages: function(resolve, reject, req){
		mysql.getConnection().query('Select * from message', function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug("Successfully retreive all messages, " + "Request Id: " + req.id);
				resolve(data);
			}
		});
	},

	getMessage: function(resolve, reject, id, req){
		mysql.getConnection().query('Select * from message where `id`=?', id, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully retreive message by id: ${id}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	createMessage: function(resolve, reject, message, req){
		const mess = new Message(message.text, message.author);
		mysql.getConnection().query('Insert into message SET ?', mess, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully created message by id: ${data.insertId}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	updateMessage: function(resolve, reject, message, req){
		const mess = new Message(message.text, message.author);
		const id = req.params.id;
		mysql.getConnection().query('Update message SET text = ?, author = ? where id=?', 
			[mess.text, mess.author, id],  function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else if(data.changedRows === 0){
				debug(`No message found with id: ${id}, Request Id: ${req.id}`);
				global.logger.debug(`No message found with id: ${id}, Request Id: ${req.id}`);
			}else{
				global.logger.debug(`Successfully updated message with id: ${id}, Request Id: ${req.id}`);
			}
			resolve(data);
		});
	},

	deleteMessage: function(resolve, reject, req){
		mysql.getConnection().query('Delete from message where `id`=?', req.params.id, function(err, result){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}
			mysql.getConnection().query('Delete from comment where `messageId`=?', req.params.id, function(err, data){
				if(err){
					debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
					global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
					reject(err);
				}else{
					global.logger.debug(`Successfully deleted ${data.affectedRows} comments for messageId: ${req.params.id}, Request Id: ${req.id}`);
					debug(`Successfully deleted ${data.affectedRows} comments for messageId: ${req.params.id}, Request Id: ${req.id}`);
					resolve(result);
				}
			});
		});
	}
}

module.exports = messageDao;