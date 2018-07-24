var express = require('express');
var service = require('../service/profile');
var debug = require('debug')('route:profile');

var router = express.Router();

router.get('/all', function(req, res, next){
	console.log(req.id);
	console.log(res.id);
	debug('Getting all profiles in the DB');
	service.getAllProfiles(res);
	debug('Successfully send all profiles to client');
});

//alternate way to render response using callback
router.get('/every', service.getProfiles);

router.get('/:id', function(req, res, next){
	service.getProfile(req.params.id, res);
});

router.post('/new', function(req, res, next){
	service.createProfile(req.body, res);
});

router.put('/:id', function(req, res, next){
	service.updateProfile(req.body, req.params.id, res);
	
});

router.delete('/:id', function(req, res, next){
	service.deleteProfile(req.params.id, res);
});

module.exports = router;