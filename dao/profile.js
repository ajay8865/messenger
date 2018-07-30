const mysql = require('../connection/mysql');
const Profile = require('../models/profile');
const debug = require('debug')('dao:profile');

const profileDao = {

	getAllProfiles: function(resolve, reject, req){
		mysql.getConnection().query('Select * from profile', function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug("Successfully retreive all profiles, " + "Request Id: " + req.id);
				resolve(data);
			}
		});
	},

	getAllProfiles1: function(resolve, reject, req){
		mysql.getPool().getConnection(function(err, conn){
			if(err){
				debug(`Error occurred while getting connection: Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}
			conn.query('Select * from profile', function(err, data){
				if(err){
					debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
					global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
					reject(err);
				}else{
					global.logger.debug("Successfully retreive all profiles, " + "Request Id: " + req.id);
					conn.release();
					//conn.destroy();
					//mysql.getPool().end();
					resolve(data);
				}
			});

		});
	},

	getProfileById: function(resolve, reject, id, req){
		mysql.getConnection().query('Select * from profile where `id`=?', id, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully retreive profile by id: ${id}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	getProfileByName: function(resolve, reject, name, req){
		mysql.getConnection().query('Select * from profile where `firstname`=?', name, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully retreive profile by name: ${name}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	createProfile: function(resolve, reject, profile, req){
		const user = new Profile(profile.firstname, profile.lastname, profile.email);
		mysql.getConnection().query('Insert into profile SET ?', user, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else{
				global.logger.debug(`Successfully created profile by name: ${profile.firstname}, Request Id: ${req.id}`);
				resolve(data);
			}
		});
	},

	updateProfile: function(resolve, reject, profile, req){
		const user = new Profile(profile.firstname, profile.lastname, profile.email);
		const id = req.params.id;
		mysql.getConnection().query('Update profile SET firstname = ?, lastname = ?, email = ? where id=?', 
			[user.firstname, user.lastname, user.email, id],  function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}else if(data.changedRows === 0){
				debug(`No user profile found with id: ${id}, Request Id: ${req.id}`);
				global.logger.debug(`No user profile found with id: ${id}, Request Id: ${req.id}`);
			}else{
				global.logger.debug(`Successfully updated profile with id: ${id}, Request Id: ${req.id}`);
			}
			resolve(data);
		});
	},

	deleteProfile: function(resolve, reject, req){
		mysql.getConnection().query('Delete from profile where `id`=?', req.params.id, function(err, data){
			if(err){
				debug(`Error occurred: Request Id: ${req.id}, ${err.stack}`);
				global.logger.error(`Request Id: ${req.id}, ${err.stack}`);
				reject(err);
			}
			resolve(data);
		});
	}
}

module.exports = profileDao;