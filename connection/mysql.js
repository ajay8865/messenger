const mysql = require('mysql');
const constants = require('../constants/constant');
var MessengerError = require('../errorHandler/messengerError');
let conn = null;
const debug = require('debug')('conn:mysql');

const connection = {
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
		global.logger.debug(`Mysql db changed to ${db}`);
		debug(`Mysql db changed to ${db}`);
		return conn;
	},

	getConnection: function(){
		return conn;
	},

	connectCallback: function(err){
		if(err){
			logger.error('Error connecting to db');
			throw new MessengerError(constants.error.ERR_8001);
		}
		debug(`Connected as id ${conn.threadId}`);
		logger.info('connected as id ' + conn.threadId);
	}
}

module.exports = connection;





