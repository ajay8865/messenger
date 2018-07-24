var express = require('express');
var service = require('../service/comment');

var router = express.Router();

router.get('/all', function(req, res, next){
	service.getAllComments(res);
});

router.get('/:messageId/comments/all', function(req, res, next){
	service.getAllCommentsForMessage(req.params.messageId, res);
});

router.get('/:messageId/comments/:id', function(req, res, next){
	service.getComment(req.params.messageId, req.params.id, res);
});

router.post('/:messageId/comments/new', function(req, res, next){
	service.createComment(req.params.messageId, req.body, res);
});

router.put('/:messageId/comments/:id', function(req, res, next){
	service.updateComment(req.params.messageId, req.body, req.params.id, res);
	
});

router.delete('/:messageId/comments/:id', function(req, res, next){
	service.deleteComment(req.params.messageId, req.params.id, res);
});

router.delete('/:messageId/comments', function(req, res, next){
	service.deleteAllCommentsForMessage(req.params.messageId, res);
});


module.exports = router;
