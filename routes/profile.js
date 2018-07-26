const express = require('express');
const service = require('../service/profile');
const debug = require('debug')('route:profile');
const router = express.Router();
const responseUtils = require('../utils/responseUtils');

router.get('/all', function(req, res, next){
	global.logger.debug('Receive request for retreiving all profiles, ' + "Request Id: " + req.id);
	service.getAllProfiles(req)
	.then(function(result){
		global.logger.debug('Sending all profiles, ' + 'Request Id: ' + req.id);
		responseUtils.send(res, 200, {'profiles' : result }, 'object');
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while fetching results', 'string');
	});
});


//alternate way to render response using callback
router.get('/every', service.getProfiles);

router.get('/:id', function(req, res, next){
	global.logger.debug(`Receive request to retreve profile with id: ${req.params.id}, Request Id: ${req.id}`);
	service.getProfile(req)
	.then(function(result){
		global.logger.debug(`Sending profile for id:${req.params.id}, Request Id: ${req.id}`);
		responseUtils.send(res, 200, {'profile' : result}, 'object');
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while fetching results', 'string');
	});		
});

router.post('/new', function(req, res, next){
	global.logger.debug(`Receive request to create new profile, Request Id: ${req.id}`);
	service.createProfile(req)
	.then(function(result){
		global.logger.debug(`Created new profile for user ${req.body.firstname} with id ${result.insertId}, Request Id: ${req.id}`);
		responseUtils.send(res, 201, `Successfully created profile for user ${req.body.firstname} with id ${result.insertId}`, 'string');
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while creating profile', 'string');
	});
});

router.put('/:id', function(req, res, next){
	const id = req.params.id;
	global.logger.debug(`Receive request to update profile with id: ${id}, Request Id: ${req.id}`);
	service.updateProfile(req)
	.then(function(result){
		if(result.changedRows === 0){
			global.logger.debug(`No user profile found with id: ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No User profile found with id: ${id}`, 'string');
		}else{
			global.logger.debug(`Updated profile for user with id ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully updated profile for user with id ${id}`, 'string');
		}		
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while updating profile', 'string');
	});
});

router.delete('/:id', function(req, res, next){
	const id = req.params.id;
	global.logger.debug(`Receive request to delete profile with id: ${id}, Request Id: ${req.id}`);
	service.deleteProfile(req)
	.then(function(result){
		if(result.affectedRows === 0){
			global.logger.debug(`No user profile found with id: ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 404, `No User profile found with id: ${id}`, 'string');
		}else{
			global.logger.debug(`Deleted profile for user with id ${id}, Request Id: ${req.id}`);
			responseUtils.send(res, 200, `Successfully deleted profile for user with id ${id}`, 'string');
		}		
	}).catch(function(err){
		global.logger.error(`Request id: ${req.id},  ${err.stack}`);
		responseUtils.send(res, 500, 'Some error occurred while deleting profile', 'string');
	});
});

module.exports = router;