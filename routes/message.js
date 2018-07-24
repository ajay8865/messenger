var express = require('express');
var service = require('../service/message');
var debug = require('debug')('route:message');

var router = express.Router();

router.get('/all', function(req, res, next){
	debug('Getting all messages from the DB');
	service.getAllMessages(res);
	debug('Successfully sent all messages to client');
});

router.get('/:id', function(req, res, next){
	service.getMessage(req.params.id, req.query.showComments, res);
});

router.post('/new', function(req, res, next){
	service.createMessage(req.body, res);
});

router.put('/:id', function(req, res, next){
	service.updateMessage(req.body, req.params.id, res);
	
});

router.delete('/:id', function(req, res, next){
	service.deleteMessage(req.params.id, res);
});

module.exports = router;
