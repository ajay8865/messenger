const dao = require('../dao/profile');
const Promise = require('promise');
const MessengerError = require('../errorHandler/messengerError');
const constants = require('../constants/constant');
const schema = require('../schema/schema');
const debug = require('debug')('service:message');

const service = {

	getAllProfiles: function(req){
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive all profiles, Request Id: ${req.id}`);
			debug(`Processing request to retreive all profiles, Request Id: ${req.id}`);
			dao.getAllProfiles(resolve, reject, req);
		});
	},

	getProfiles: function(req, res, next){
		return new Promise(resolve)
		dao.getProfiles(req, res, next, function(data){
			res.status(200);
			res.json({'profiles': data});
		});
	},

	getProfile: function(req){
		let param = req.params.id;
		if(!param){
			debug(`Error occurred: Invalid request id: ${id}, Request Id: ${req.id}`);
			throw new MessengerError(constants.error.ERR_9001);
		}
		if(isNaN(param)){
			return this.getProfileByName(param, req);
		}else{
			return this.getProfileById(param, req);
		}
	},

	getProfileById: function(id, req){
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive profile by id: ${id}, Request Id: ${req.id}`);
			debug(`Processing request to retreive profile by id: ${id}, Request Id: ${req.id}`);
			dao.getProfileById(resolve, reject, id, req);
		});
	},

	getProfileByName: function(name, req){
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to retreive profile by name: ${name}, Request Id: ${req.id}`);
			debug(`Processing request to retreive profile by name: ${name}, Request Id: ${req.id}`);
			dao.getProfileByName(resolve, reject, name, req);
		});
	},

	createProfile: function(req){
		const profile = req.body;
		schema.validateProfile(profile, req);
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to create profile by name: ${profile.firstname}, Request Id: ${req.id}`);
			debug(`Processing request to create profile by name: ${profile.firstname}, Request Id: ${req.id}`);
			dao.createProfile(resolve, reject, profile, req);
		});
	},

	updateProfile: function(req){
		const profile = req.body;
		schema.validateProfile(profile, req);
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to update profile with id: ${req.params.id}, Request Id: ${req.id}`);
			debug(`Processing request to update profile with id: ${req.params.id}, Request Id: ${req.id}`);
			dao.updateProfile(resolve, reject, profile, req);
		});
	},

	deleteProfile: function(req){
		if(isNaN(req.params.id)){
			throw new MessengerError(constants.error.ERR_9001);
		}
		return new Promise(function(resolve, reject){
			global.logger.debug(`Processing request to delete profile with id: ${req.params.id}, Request Id: ${req.id}`);
			debug(`Processing request to delete profile with id: ${req.params.id}, Request Id: ${req.id}`);
			dao.deleteProfile(resolve, reject, req);
		});
	}

}

module.exports = service;