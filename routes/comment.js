const express = require('express');
const service = require('../service/comment');
const debug = require('debug')('route:comment');
const router = express.Router();
const responseUtils = require('../utils/responseUtils');

router.get('/all', function(req, res, next){
	global.logger.debug('Receive request for retreiving all comments, ' + "Request Id: " + req.id);
	debug('Receive request for retreiving all comments, ' + "Request Id: " + req.id);
	service.getAllComments(req)
	.then(function(result){
		global.logger.debug('Sending all comments, ' + 'Request Id: ' + req.id);
		responseUtils.send(res, 200, {'comments' : result }, 'object');
	}).catch(function(err){
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while fetching comments', 'string');
	});
});

router.get('/:messageId/comments/all', function(req, res, next){
	global.logger.debug(`Receive request to retreive all comments with mesageId: ${req.params.messageId}, Request Id: ${req.id}`);
	debug(`Receive request to retreive all comments with mesageId: ${req.params.messageId}, Request Id: ${req.id}`);
	service.getAllCommentsForMessage(req)
	.then(function(result){
		global.logger.debug(`Sending all comments for messageId:${req.params.messageId}, Request Id: ${req.id}`);
		responseUtils.send(res, 200, {'comments' : result}, 'object');
	}).catch(function(err){
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while fetching comments for message: ' + req.params.messageId, 'string');
	});
});

router.get('/:messageId/comments/:id', function(req, res, next){
	global.logger.debug(`Receive request to retreive comment for mesageId: ${req.params.messageId} with commentsId:${req.params.id}, Request Id: ${req.id}`);
	debug(`Receive request to retreive comment for mesageId: ${req.params.messageId} with commentId:${req.params.id}, Request Id: ${req.id}`);
	service.getComment(req)
	.then(function(result){
		global.logger.debug(`Sending comment for messageId:${req.params.messageId} with commentId:${req.params.id}, Request Id: ${req.id}`);
		responseUtils.send(res, 200, {'comment' : result}, 'object');
	}).catch(function(err){
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, `Some error occurred while fetching comment for message: ${req.params.messageId} with commentId:${req.params.id}`, 'string');
	});
});

router.post('/:messageId/comments/new', function(req, res, next){
	global.logger.debug(`Receive request to create new comment for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	debug(`Receive request to create new comment for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	service.createComment(req)
	.then(function(result){
		global.logger.debug(`Created new comment with id ${result.insertId} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
		responseUtils.send(res, 201, `Successfully created comment with id ${result.insertId} for messageId: ${req.params.messageId}`, 'string');
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while creating comment', 'string');
	});
});

router.put('/:messageId/comments/:id', function(req, res, next){
	const id = req.params.id;
	global.logger.debug(`Receive request to update comment with id: ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	debug(`Receive request to update comment with id: ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	service.updateComment(req)
	.then(function(result){
		if(result.changedRows === 0){
			global.logger.debug(`No comment found with id: ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No comment found with id: ${id} for messageId: ${req.params.messageId}`, 'string');
		}else{
			global.logger.debug(`Updated comment with id ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully updated comment with id ${id} for messageId: ${req.params.messageId}`, 'string');
		}
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, `Some error occurred while updating comment with id: ${id} for messageId: ${req.params.messageId}`, 'string');
	});
});

router.delete('/:messageId/comments/:id', function(req, res, next){
	const id = req.params.id;
	global.logger.debug(`Receive request to delete comment with id: ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	debug(`Receive request to delete comment with id: ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	service.deleteComment(req)
	.then(function(result){
		if(result.affectedRows === 0){
			global.logger.debug(`No comment found with id: ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No comment found with id: ${id} for messageId: ${req.params.messageId}`, 'string');
		}else{
			global.logger.debug(`Deleted comment with id ${id} for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully deleted comment with id ${id} for messageId: ${req.params.messageId}`, 'string');
		}
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, `Some error occurred while deleting comment with id ${id} for messageId: ${req.params.messageId}`, 'string');
	});
});

router.delete('/:messageId/comments', function(req, res, next){
	global.logger.debug(`Receive request to delete all comments for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	debug(`Receive request to delete all comments for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
	service.deleteAllCommentsForMessage(req)
	.then(function(result){
		if(result.affectedRows === 0){
			global.logger.debug(`No comment found for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No comment found for messageId: ${req.params.messageId}`, 'string');
		}else{
			global.logger.debug(`Deleted all comments for messageId: ${req.params.messageId}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully deleted all comments for messageId: ${req.params.messageId}`, 'string');
		}
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		debug(`Error occurred: Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, `Some error occurred while deleting all comments for messageId: ${req.params.messageId}`, 'string');
	});
});

module.exports = router;
