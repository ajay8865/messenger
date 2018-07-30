const mysql = require('mysql');
const constants = require('../constants/constant');
const MessengerError = require('../errorHandler/messengerError');
const debug = require('debug')('conn:mysql');
let conn = null;
let pool = null;

const connection = {
	createConnection: function(host, user, password, database){
		conn = mysql.createConnection({
			host     : host || constants.mysql.host,
			user     : user || constants.mysql.user,
			password : password || constants.mysql.password,
			database : database || constants.mysql.db
		});

		conn.connect(function(err){
			if(err){
				global.logger.error(`Error connecting to db, ${err.stack}`);
				debug(`Error connecting to db, ${err.stack}`);
				setTimeout(connection.createConnection, 2000, constants.mysql.host, constants.mysql.user, constants.mysql.password, constants.mysql.db);
			}else{
				debug('Connected as Id:' + conn.threadId);
				global.logger.debug('Connected as Id:' + conn.threadId);
			}
		});

		conn.on('error', function(err) {
			global.logger.error(`db error ${err.stack}`);
		    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
		      connection.createConnection(constants.mysql.host, constants.mysql.user, constants.mysql.password, constants.mysql.db);                        // lost due to either server restart, or a
		    } else {
				throw new MessengerError(constants.error.ERR_8001);
		    }
		});
	},
	
	createPool: function(config){
		pool = mysql.createPool(config);
		global.logger.debug('Created pool connection with connectionLimit: '  +config.connectionLimit);
		return pool;
	},

	registerPoolEvents: function(pool){
		pool.on('acquire', function (connection) {
		  global.logger.debug('Connection with id:%d acquired', connection.threadId);
		});

		pool.on('connection', function (connection) {
		  global.logger.debug('New Connection made available from the pool');
		});

		pool.on('release', function (connection) {
		  global.logger.debug('Connection %d released', connection.threadId);
		});
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

	getPool: function(){
		return pool;
	},

	closeConnection: function(conn){
		let con = conn || this.getConnection();
		con.end(function(err){
			if(err){
				global.logger.error('Error while closing mysql connection');
				debug('Error while closing mysql connection');
			}else{
				global.logger.debug('Mysql connection terminated successfully');
				debug('Mysql connection terminated successfully');
			}
		});
	}
}

module.exports = connection;





