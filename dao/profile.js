var mysql = require('../connection/mysql');
var logger = require('../config/winston');
var Profile = require('../models/profile');

var profileDao = {

	getProfiles: function(req, res, next, callback){
		mysql.getConnection().query('Select * from profile', function(err, data){
			if(err){
				throw err;
			}
			callback(data);
		});
	},

	getAllProfiles: function(res){
		mysql.getConnection().query('Select * from profile', function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
   			res.json({'profiles' : data});
		});
	},

	getProfileById: function(id, res){
		mysql.getConnection().query('Select * from profile where `id`=?', id, function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
			res.json({'profile': data});
		});
	},

	getProfileByName: function(name, res){
		mysql.getConnection().query('Select * from profile where `firstname`=?', name, function(err, data){
			if(err){
				throw err;
			}
			res.status(200);
			res.json({'profile': data});
		});
	},

	createProfile: function(profile, res){
		var user = new Profile(profile.firstname, profile.lastname, profile.email);
		mysql.getConnection().query('Insert into profile SET ?', user, function(err, data){
			if(err){
				throw err
			}
			res.status(201);
			res.send("Successfully created profile for user " + profile.firstname + ` with id ${data.insertId}`);
		});
	},

	updateProfile: function(profile, id, res){
		var user = new Profile(profile.firstname, profile.lastname, profile.email);
		mysql.getConnection().query('Update profile SET firstname = ?, lastname = ?, email = ? where id=?', 
			[user.firstname, user.lastname, user.email, id],  function(err, data){
			if(err){
				throw err
			}
			if(data.changedRows === 0){
				res.status(404);
				res.send('No User profile found with id: ' + id);
			}
			res.status(201);
			res.send("Successfully updated profile for user " + profile.firstname + ` with id ${id}`);
		});
	},

	deleteProfile: function(id, res){
		mysql.getConnection().query('Delete from profile where `id`=?', id, function(err, data){
			if(err){
				throw err
			}
			if(data.affectedRows === 0){
				res.status(404);
				res.send('No User profile found with id: ' + id);
			}
			res.status(200);
			res.send("Successfully deleted profile for user with id: " + id);
		});
	}
}

module.exports = profileDao;