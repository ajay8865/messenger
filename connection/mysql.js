var mysql = require('mysql');
var constants = require('../constants/constant');
var logger = require('../config/winston');
var conn = null;

var connection = {
	createConnection: function(host, user, password, database){
		conn = mysql.createConnection({
			host     : host || constants.mysql.host,
			user     : user || constants.mysql.user,
			password : password || constants.mysql.password,
			database : database || constants.mysql.db
		});
		return conn;
	},
	useDB: function(db){
		conn.query(db || constants.db);
		return conn;
	},

	getConnection: function(){
		return conn;
	},

	connectCallback: function(err){
		if(err){
			logger.error('Error connecting to db');
			throw new Error('Error connecting to db');
		}
		logger.info('connected as id ' + conn.threadId);
	}
}

module.exports = connection;





