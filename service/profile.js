var logger = require('../config/winston');
var httpContext = require('express-http-context');
var dao = require('../dao/profile');
var service = {

	getAllProfiles: function(res){
		dao.getAllProfiles(res);
	},

	getProfiles: function(req, res, next){
		dao.getProfiles(req, res, next, function(data){
			res.status(200);
			res.json({'profiles': data});
		});
	},

	getProfile: function(param, res){
		if(!param){
			throw new Error("Missing profile ID or name");
		}
		if(isNaN(param)){
			this.getProfileByName(param, res);
		}else{
			this.getProfileById(param, res);
		}
	},

	getProfileById: function(id, res){
		dao.getProfileById(id, res);
	},

	getProfileByName: function(name, res){
		dao.getProfileByName(name, res);
	},

	createProfile: function(profile, res){
		if(!profile){
			throw new Error("Invalid post input");
		}
		if(!profile.firstname || !profile.lastname || !profile.email){
			throw new Error("Missing required parameter in profile");
		}
		return dao.createProfile(profile, res);
	},

	updateProfile: function(profile, id, res){
		if(!profile){
			throw new Error("Invalid post input");
		}
		if(!profile.firstname || !profile.lastname || !profile.email){
			throw new Error("Missing required parameter in profile");
		}

		if(isNaN(id)){
			throw new Error("Invalid id");
		}
		return dao.updateProfile(profile, id, res);
	},

	deleteProfile: function(id, res){
		if(isNaN(id)){
			throw new Error("Invalid id");
		}
		dao.deleteProfile(id, res);
	}

}

module.exports = service;