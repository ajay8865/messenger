const express = require('express');
const service = require('../service/message');
const debug = require('debug')('route:message');
const router = express.Router();
const responseUtils = require('../utils/responseUtils');

router.get('/all', function(req, res, next){
	global.logger.debug('Receive request for retreiving all messages, ' + "Request Id: " + req.id);
	debug('Receive request for retreiving all messages, ' + "Request Id: " + req.id);
	service.getAllMessages(req)
	.then(function(result){
		global.logger.debug('Sending all messages, ' + 'Request Id: ' + req.id);
		responseUtils.send(res, 200, {'messages' : result }, 'object');
	}).catch(function(err){
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while fetching results', 'string');
	});
});

router.get('/:id', function(req, res, next){
	global.logger.debug(`Receive request to retreve message with id: ${req.params.id}, Request Id: ${req.id}`);
	debug(`Receive request to retreive message with id: ${req.params.id}, Request Id: ${req.id}`);
	service.getMessage(req)
	.then(function(result){
		global.logger.debug(`Sending message for id:${req.params.id}, Request Id: ${req.id}`);
		responseUtils.send(res, 200, {'message' : result}, 'object');
	}).catch(function(err){
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while fetching results', 'string');
	});
});

router.post('/new', function(req, res, next){
	global.logger.debug(`Receive request to create new message, Request Id: ${req.id}`);
	debug(`Receive request to create new message, Request Id: ${req.id}`);
	service.createMessage(req)
	.then(function(result){
		global.logger.debug(`Created new message with id ${result.insertId}, Request Id: ${req.id}`);
		responseUtils.send(res, 201, `Successfully created message with id ${result.insertId}`, 'string');
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while creating message', 'string');
	});
});

router.put('/:id', function(req, res, next){
	const id = req.params.id;
	global.logger.debug(`Receive request to update message with id: ${id}, Request Id: ${req.id}`);
	debug(`Receive request to update message with id: ${id}, Request Id: ${req.id}`);
	service.updateMessage(req)
	.then(function(result){
		if(result.changedRows === 0){
			global.logger.debug(`No message found with id: ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No message found with id: ${id}`, 'string');
		}else{
			global.logger.debug(`Updated message with id ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully updated message with id ${id}`, 'string');
		}
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while updating message', 'string');
	});
});

router.delete('/:id', function(req, res, next){
	const id = req.params.id;
	global.logger.debug(`Receive request to delete message with id: ${id}, Request Id: ${req.id}`);
	debug(`Receive request to delete message with id: ${id}, Request Id: ${req.id}`);
	service.deleteMessage(req)
	.then(function(result){
		if(result.affectedRows === 0){
			global.logger.debug(`No message found with id: ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No message found with id: ${id}`, 'string');
		}else{
			global.logger.debug(`Deleted message with id ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully deleted message with id ${id}`, 'string');
		}
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while deleting message', 'string');
	});
});

module.exports = router;